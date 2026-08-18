import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const pageSeoSource = readFileSync(join(root, "src", "seo", "pageSeo.ts"), "utf8");
const redirectsSource = readFileSync(join(root, "src", "routes", "legacyRedirects.ts"), "utf8");
const manifestPath = join(distDir, "seo-manifest.json");
const SITE_URL = "https://www.eqourse.com";

const entries = [];
const entryPattern = /"(\/[^\"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)",(?:\s*canonical:\s*"((?:[^"\\]|\\.)*)",)?/gs;
let match;
while ((match = entryPattern.exec(pageSeoSource)) !== null) {
  entries.push({
    path: match[1],
    title: match[2].replace(/\\"/g, '"'),
    description: match[3].replace(/\\"/g, '"'),
    canonical: match[4]?.replace(/\\"/g, '"'),
  });
}

if (existsSync(manifestPath)) {
  entries.splice(0, entries.length, ...JSON.parse(readFileSync(manifestPath, "utf8")));
}

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const failures = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
for (const entry of entries) {
  const htmlPath = entry.path === "/"
    ? join(distDir, "index.html")
    : join(distDir, entry.path, "index.html");

  if (!existsSync(htmlPath)) {
    failures.push(`${entry.path}: missing ${htmlPath}`);
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const titles = html.match(/<title[^>]*>[\s\S]*?<\/title>/g) ?? [];
  const descriptions = html.match(/<meta[^>]*\bname="description"[^>]*>/g) ?? [];
  const canonicals = html.match(/<link[^>]*\brel="canonical"[^>]*>/g) ?? [];
  const robots = html.match(/<meta[^>]*\bname="robots"[^>]*>/g) ?? [];
  const crawlFallbacks = html.match(/<main[^>]*\bdata-seo-prerender="true"[^>]*>/g) ?? [];
  const fallbackHeadings = html.match(/<main[^>]*\bdata-seo-prerender="true"[^>]*>[\s\S]*?<h1>[^<]+<\/h1>/g) ?? [];
  const expectedCanonical = entry.canonical || `${SITE_URL}${entry.path === "/" ? "/" : entry.path}`;

  if (titles.length !== 1 || !titles[0]?.includes(`>${escapeHtml(entry.title)}</title>`)) {
    failures.push(`${entry.path}: expected exactly one matching title, found ${titles.length}`);
  }
  if (descriptions.length !== 1 || !descriptions[0]?.includes(`content="${escapeHtml(entry.description)}"`)) {
    failures.push(`${entry.path}: expected exactly one matching meta description, found ${descriptions.length}`);
  }
  if (canonicals.length !== 1 || !canonicals[0]?.includes(`href="${expectedCanonical}"`)) {
    failures.push(`${entry.path}: expected exactly one canonical ${expectedCanonical}, found ${canonicals.length}`);
  }
  if (!expectedCanonical.startsWith(`${SITE_URL}/`) || (entry.path !== "/" && expectedCanonical.endsWith("/"))) {
    failures.push(`${entry.path}: canonical must use HTTPS + www and no trailing slash: ${expectedCanonical}`);
  }
  if (robots.length !== 1 || !robots[0]?.includes('content="index,follow')) {
    failures.push(`${entry.path}: expected one explicit index,follow robots directive, found ${robots.length}`);
  }
  if (/\bnoindex\b/i.test(html)) {
    failures.push(`${entry.path}: prerendered HTML contains noindex`);
  }
  if (crawlFallbacks.length !== 1 || fallbackHeadings.length !== 1) {
    failures.push(`${entry.path}: missing one semantic prerender fallback with an H1`);
  }

  const internalTrailingSlashLinks = [...html.matchAll(/\bhref="(\/[^"?#]+\/)"/g)]
    .map((item) => item[1])
    .filter((href) => href !== "/");
  if (internalTrailingSlashLinks.length > 0) {
    failures.push(`${entry.path}: internal links use non-canonical trailing slashes: ${internalTrailingSlashLinks.join(", ")}`);
  }

  const titleKey = entry.title.trim().toLowerCase();
  const descriptionKey = entry.description.trim().toLowerCase();
  if (seenTitles.has(titleKey)) failures.push(`${entry.path}: duplicate title also used by ${seenTitles.get(titleKey)}`);
  else seenTitles.set(titleKey, entry.path);
  if (seenDescriptions.has(descriptionKey)) failures.push(`${entry.path}: duplicate description also used by ${seenDescriptions.get(descriptionKey)}`);
  else seenDescriptions.set(descriptionKey, entry.path);
}

const sitemapPath = join(distDir, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  failures.push("missing dist/sitemap.xml");
} else {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((item) => item[1]);
  const expectedUrls = entries.map((entry) => entry.canonical || `${SITE_URL}${entry.path === "/" ? "/" : entry.path}`);
  const redirectSources = new Set(
    [...redirectsSource.matchAll(/"(\/[^"]*)"\s*:\s*"\/[^"]*"/g)].map((item) => `${SITE_URL}${item[1]}`),
  );
  if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("sitemap.xml contains duplicate URLs");
  for (const url of expectedUrls) if (!sitemapUrls.includes(url)) failures.push(`sitemap.xml missing ${url}`);
  for (const url of sitemapUrls) {
    if (!expectedUrls.includes(url)) failures.push(`sitemap.xml contains non-canonical or unknown URL ${url}`);
    if (redirectSources.has(url)) failures.push(`sitemap.xml contains redirect source ${url}`);
  }
}

const robotsPath = join(distDir, "robots.txt");
if (!existsSync(robotsPath)) {
  failures.push("missing dist/robots.txt");
} else {
  const robotsText = readFileSync(robotsPath, "utf8");
  if (/Disallow:\s*\/$/im.test(robotsText)) failures.push("robots.txt blocks the entire site");
  if (!robotsText.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) failures.push("robots.txt does not reference the canonical sitemap");
}

for (const configName of ["_redirects", "_headers", ".htaccess"]) {
  if (!existsSync(join(distDir, configName))) failures.push(`missing generated hosting config dist/${configName}`);
}

const cmsShellPath = join(distDir, "cms-shell.html");
if (!existsSync(cmsShellPath)) {
  failures.push("missing dist/cms-shell.html");
} else {
  const cmsShell = readFileSync(cmsShellPath, "utf8");
  const routeTags = [
    /<title[^>]*>/i,
    /<meta[^>]*\bname="description"[^>]*>/i,
    /<link[^>]*\brel="canonical"[^>]*>/i,
    /<meta[^>]*\bproperty="og:[^"]*"[^>]*>/i,
    /<meta[^>]*\bname="twitter:[^"]*"[^>]*>/i,
  ];
  if (routeTags.some((pattern) => pattern.test(cmsShell))) {
    failures.push("cms-shell.html contains stale homepage route metadata");
  }
}


const notFoundPath = join(distDir, "404.html");
if (!existsSync(notFoundPath)) {
  failures.push("missing dist/404.html");
} else {
  const notFound = readFileSync(notFoundPath, "utf8");
  const noindexTags = notFound.match(/<meta[^>]*\bname="robots"[^>]*\bcontent="noindex,nofollow"[^>]*>/g) ?? [];
  if (noindexTags.length !== 1) failures.push("404.html must contain exactly one noindex,nofollow directive");
  if (/<link[^>]*\brel="canonical"[^>]*>/i.test(notFound)) failures.push("404.html must not declare a canonical URL");
}

const redirectsConfig = existsSync(join(distDir, "_redirects"))
  ? readFileSync(join(distDir, "_redirects"), "utf8")
  : "";
const apacheConfig = existsSync(join(distDir, ".htaccess"))
  ? readFileSync(join(distDir, ".htaccess"), "utf8")
  : "";
const headersConfig = existsSync(join(distDir, "_headers"))
  ? readFileSync(join(distDir, "_headers"), "utf8")
  : "";
if (!redirectsConfig.includes("/blogs/* /blog/:splat 301!")) failures.push("_redirects is missing the legacy /blogs/ migration");
if (!redirectsConfig.includes("/admin/* /index.html 200")) failures.push("_redirects is missing the admin SPA fallback");
if (/^\/\* \/index\.html 200!?$/m.test(redirectsConfig)) failures.push("_redirects still soft-200s unknown public routes");
for (const entry of entries) {
  if (entry.path !== "/" && !redirectsConfig.includes(`${entry.path}/ ${entry.path} 301!`)) {
    failures.push(`_redirects is missing trailing-slash normalization for ${entry.path}`);
  }
}
if (!apacheConfig.includes("RewriteRule ^blogs/(.+?)/?$ https://www.eqourse.com/blog/$1 [R=301,L,NE]")) {
  failures.push(".htaccess is missing the legacy /blogs/ migration");
}
if (!apacheConfig.includes("RewriteRule ^(.+?)/+$ https://www.eqourse.com/$1 [R=301,L,NE]")) {
  failures.push(".htaccess is missing trailing-slash normalization");
}
if (!apacheConfig.includes("ErrorDocument 404 /404.html")) failures.push(".htaccess is missing the real public 404 handler");
if (apacheConfig.includes("RewriteRule ^ index.html [L]")) failures.push(".htaccess still soft-200s unknown public routes");
if (!apacheConfig.includes('Header always set X-Robots-Tag "noindex, nofollow" env=EQOURSE_NOINDEX')) {
  failures.push(".htaccess is missing the admin X-Robots-Tag protection");
}
if (!headersConfig.includes("/admin/*") || !headersConfig.includes("X-Robots-Tag: noindex, nofollow")) {
  failures.push("_headers is missing the admin X-Robots-Tag protection");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`[verify-seo] Verified ${entries.length} routes: unique metadata, indexability, semantic HTML, canonicals, sitemap, robots and hosting redirects.`);
