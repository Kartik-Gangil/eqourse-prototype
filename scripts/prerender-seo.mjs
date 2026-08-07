// Post-build step: bakes the correct per-route <title>/meta tags directly into
// a static index.html for every route in src/seo/pageSeo.ts.
//
// Why this exists: this app is a pure client-rendered SPA (no SSR). The single
// dist/index.html Vite emits carries generic fallback tags, and react-helmet-async
// only swaps them to the correct per-page values AFTER JavaScript executes. Any
// tool or crawler that reads the raw HTML response (curl, most SEO auditors,
// Google's initial HTML pass) sees that generic "primary" title, then a
// different "secondary" title once JS runs — even though pageSeo.ts and
// SEOHead.tsx only ever produce ONE title per page.
//
// This script removes that gap at the HTML level: it writes dist/<route>/index.html
// per mapped route, each with its own correct title/description/canonical/OG/
// Twitter tags already present in the raw markup, so there's nothing left for
// react-helmet-async to "swap" — it renders the identical values on hydration.
//
// The host must serve dist/<route>/index.html for that exact path (standard
// static-file resolution on Netlify/Vercel/Apache/Nginx/IIS all do this before
// falling back to the SPA rewrite for unmapped routes) — confirm with whoever
// owns the deploy.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const distIndexPath = join(distDir, "index.html");
const pageSeoPath = join(root, "src", "seo", "pageSeo.ts");
const SITE_URL = "https://www.eqourse.com";
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;
const configuredApiBase = process.env.CMS_SEO_SOURCE_URL || process.env.VITE_API_BASE_URL || SITE_URL;
const CMS_API_BASE = configuredApiBase.startsWith("http")
  ? configuredApiBase.replace(/\/+$/, "")
  : SITE_URL;

function parsePageSeo(source) {
  const pattern = /"(\/[^"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)",(?:\s*canonical:\s*"((?:[^"\\]|\\.)*)",)?/gs;
  const entries = [];
  let match;
  while ((match = pattern.exec(source)) !== null) {
    entries.push({
      path: match[1],
      title: match[2].replace(/\\"/g, '"'),
      description: match[3].replace(/\\"/g, '"'),
      canonical: match[4]?.replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(str) {
  return escapeHtml(str).replace(/'/g, "&apos;");
}

function buildCrawlFallback({ path, title, description }) {
  const heading = title.replace(/\s*(?:\||\u2013|\u2014)\s*eQOURSE.*$/i, "").trim();
  const sharedLinks = path.startsWith("/ai-data") || path.startsWith("/robotics")
    ? [
        ["/ai-data-services", "AI Data Services"],
        ["/ai-data-services/data-collection", "AI Data Collection"],
        ["/ai-data-services/annotation-labeling", "Data Annotation and Labeling"],
        ["/robotics-training-data-services", "Robotics Training Data Services"],
      ]
    : path.includes("samples")
      ? [["/samples", "Samples"], ["/content-services", "Content Services"], ["/contact-us", "Contact eQOURSE"]]
      : [["/content-services", "Content Services"], ["/learning-solutions", "Learning Solutions"], ["/contact-us", "Contact eQOURSE"]];

  const links = [["/", "Home"], ...sharedLinks]
    .filter(([href]) => href !== path)
    .map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`)
    .join("\n        ");

  return `<main data-seo-prerender="true">
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(description)}</p>
      <nav aria-label="Related pages">
        ${links}
      </nav>
    </main>`;
}

function toAbsoluteUrl(value) {
  if (!value) return OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function buildHead(template, { path, title, description, canonical: canonicalOverride, ogType = "website", image = OG_IMAGE }) {
  const canonical = canonicalOverride || `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  let html = template;

  // Strip any previously injected (or stale template) tags so re-runs stay
  // idempotent and no route ever ships more than one of these.
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="description"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="(?:robots|googlebot)"[^>]*>\s*/g, "");
  html = html.replace(/<link[^>]*\brel="canonical"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/g, "");
  html = html.replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/g, "");

  // data-rh="true" on every tag here is load-bearing, not decorative:
  // react-helmet-async only ever reconciles (replaces/removes) tags that
  // already carry its own data-rh marker — anything without it is invisible
  // to Helmet, so on hydration Helmet would add its own correct tag ALONGSIDE
  // this raw one instead of recognizing it, producing a real duplicate for
  // every tag below (title is the one exception: Helmet sets document.title
  // as a property, not via tag reconciliation, so it's marked purely for
  // documentation parity with the old index.html convention this replaces).
  const block = [
    `<title data-rh="true">${t}</title>`,
    `<meta data-rh="true" name="description" content="${d}" />`,
    `<meta data-rh="true" name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`,
    `<link data-rh="true" rel="canonical" href="${canonical}" />`,
    `<meta data-rh="true" property="og:type" content="${escapeHtml(ogType)}" />`,
    `<meta data-rh="true" property="og:site_name" content="eQOURSE" />`,
    `<meta data-rh="true" property="og:title" content="${t}" />`,
    `<meta data-rh="true" property="og:description" content="${d}" />`,
    `<meta data-rh="true" property="og:url" content="${canonical}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(toAbsoluteUrl(image))}" />`,
    `<meta data-rh="true" property="og:image:width" content="1200" />`,
    `<meta data-rh="true" property="og:image:height" content="630" />`,
    `<meta data-rh="true" property="og:locale" content="en_US" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:site" content="@EQourse" />`,
    `<meta data-rh="true" name="twitter:title" content="${t}" />`,
    `<meta data-rh="true" name="twitter:description" content="${d}" />`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(toAbsoluteUrl(image))}" />`,
  ].join("\n    ");

  html = html.replace(/<meta charset="UTF-8" \/>/, (m) => `${m}\n    ${block}`);
  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${buildCrawlFallback({ path, title, description })}</div>`,
  );
}

async function fetchCmsItems(resource) {
  const url = `${CMS_API_BASE}/api/${resource}?limit=1000`;
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  const body = await response.json();
  const items = body?.success ? body?.data?.items : body?.items;
  if (!Array.isArray(items)) {
    throw new Error(`${url} did not return an items array`);
  }
  return items;
}

async function loadCmsSeoEntries() {
  const [blogs, caseStudies] = await Promise.all([
    fetchCmsItems("blogs"),
    fetchCmsItems("case-studies"),
  ]);

  const blogEntries = blogs
    .filter((blog) => blog?.slug)
    .map((blog) => ({
      path: `/blog/${blog.slug}`,
      title: blog.seo?.title?.trim() || blog.title,
      description: blog.seo?.description?.trim() || blog.excerpt,
      ogType: "article",
      image: blog.seo?.ogImageUrl || blog.coverImageUrl || OG_IMAGE,
      lastmod: blog.updatedAt || blog.publishedAt,
      source: "blog",
    }));

  const caseStudyEntries = caseStudies
    .filter((study) => study?.slug)
    .map((study) => ({
      path: `/casestudy/${study.slug}`,
      title: study.seo?.title?.trim() || study.title,
      description: study.seo?.description?.trim() || study.summary || study.challenge?.slice(0, 160),
      ogType: "article",
      image: study.seo?.ogImageUrl || study.heroImageUrl || OG_IMAGE,
      lastmod: study.updatedAt || study.publishedAt,
      source: "case-study",
    }));

  return [...blogEntries, ...caseStudyEntries].filter(
    (entry) => entry.title?.trim() && entry.description?.trim(),
  );
}

async function main() {
  if (!existsSync(distIndexPath)) {
    console.error("[prerender-seo] dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  const template = readFileSync(distIndexPath, "utf-8");
  const pageSeoSource = readFileSync(pageSeoPath, "utf-8");
  const staticEntries = parsePageSeo(pageSeoSource);

  if (staticEntries.length === 0) {
    console.error("[prerender-seo] No routes parsed from pageSeo.ts — aborting to avoid clobbering dist/index.html.");
    process.exit(1);
  }

  let cmsEntries;
  try {
    cmsEntries = await loadCmsSeoEntries();
  } catch (error) {
    console.error(`[prerender-seo] Unable to load CMS SEO data: ${error.message}`);
    console.error("[prerender-seo] Refusing to build a production bundle with incorrect blog/case-study fallback metadata.");
    console.error("[prerender-seo] Set CMS_SEO_OPTIONAL=true only for an intentionally offline development build.");
    if (process.env.CMS_SEO_OPTIONAL !== "true") process.exit(1);
    cmsEntries = [];
  }

  const entries = [...new Map(
    [...staticEntries, ...cmsEntries].map((entry) => [entry.path, entry]),
  ).values()];

  let written = 0;
  for (const entry of entries) {
    const html = buildHead(template, entry);
    const outPath = entry.path === "/" ? distIndexPath : join(distDir, entry.path, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    written += 1;
  }

  writeFileSync(
    join(distDir, "seo-manifest.json"),
    JSON.stringify(entries, null, 2),
    "utf-8",
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => {
      const canonical = entry.canonical || `${SITE_URL}${entry.path === "/" ? "/" : entry.path.replace(/\/+$/, "")}`;
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(String(entry.lastmod).slice(0, 10))}</lastmod>` : "";
      return `  <url><loc>${escapeXml(canonical)}</loc>${lastmod}</url>`;
    }),
    '</urlset>',
    '',
  ].join("\n");
  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");

  console.log(
    `[prerender-seo] Wrote ${written} route(s): ${staticEntries.length} static and ${cmsEntries.length} CMS detail route(s).`,
  );
}

await main();
