import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const redirectsSource = readFileSync(join(root, "src", "routes", "legacyRedirects.ts"), "utf8");
const pageSeoSource = readFileSync(join(root, "src", "seo", "pageSeo.ts"), "utf8");
const redirectPattern = /"(\/[^"]*)"\s*:\s*"(\/[^"]*)"/g;
const redirects = [];
let match;

while ((match = redirectPattern.exec(redirectsSource)) !== null) {
  redirects.push({ from: match[1], to: match[2] });
}

if (redirects.length === 0) {
  throw new Error("No legacy redirects were found; refusing to generate empty hosting rules.");
}

const uniqueSources = new Set(redirects.map(({ from }) => from));
if (uniqueSources.size !== redirects.length) {
  throw new Error("Duplicate legacy redirect sources found.");
}

const canonicalPaths = new Set(
  [...pageSeoSource.matchAll(/"(\/[^"]*)"\s*:\s*\{/g)].map((item) => item[1]),
);
const invalidTargets = redirects.filter(({ to }) => !canonicalPaths.has(to));
if (invalidTargets.length > 0) {
  throw new Error(`Redirect targets missing from pageSeo: ${invalidTargets.map(({ to }) => to).join(", ")}`);
}

const trailingSlashRedirects = [...canonicalPaths]
  .filter((path) => path !== "/")
  .map((path) => `${path}/ ${path} 301!`);

const netlify = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "https://eqourse.com/* https://www.eqourse.com/:splat 301!",
  ...redirects.map(({ from, to }) => `${from} ${to} 301!`),
  "# Preserve matching legacy article slugs while consolidating /blogs/ to /blog/.",
  "/blogs/* /blog/:splat 301!",
  "# Canonicals, sitemap URLs and internal links use no trailing slash.",
  ...trailingSlashRedirects,
  "/blog/*/ /blog/:splat 301!",
  "/casestudy/*/ /casestudy/:splat 301!",
  "# Admin remains an authenticated client-side application.",
  "/admin /index.html 200",
  "/admin/* /index.html 200",
  "# Public routes are prerendered files. Unknown paths fall through to 404.html.",
  "",
].join("\n");

const headers = [
  "# Keep authenticated admin URLs out of search results even if discovered externally.",
  "/admin",
  "  X-Robots-Tag: noindex, nofollow",
  "/admin/*",
  "  X-Robots-Tag: noindex, nofollow",
  "",
].join("\n");

const escapeRewritePattern = (path) => path
  .replace(/^\//, "")
  .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const apache = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "Options -MultiViews",
  "DirectoryIndex index.html",
  "DirectorySlash Off",
  "RewriteEngine On",
  "",
  "# Legacy URLs redirect directly to the final HTTPS + www canonical URL.",
  ...redirects.map(({ from, to }) => (
    `RewriteRule ^${escapeRewritePattern(from)}/?$ https://www.eqourse.com${to} [R=301,L,NE]`
  )),
  "",
  "# Preserve matching legacy article slugs while consolidating /blogs/ to /blog/.",
  "RewriteRule ^blogs/(.+?)/?$ https://www.eqourse.com/blog/$1 [R=301,L,NE]",
  "",
  "# Canonicals, sitemap URLs and internal links use no trailing slash.",
  "# Run this before host/protocol normalization to avoid a two-hop redirect.",
  "RewriteCond %{REQUEST_URI} !^/$",
  "RewriteCond %{REQUEST_URI} /+$",
  "RewriteRule ^(.+?)/+$ https://www.eqourse.com/$1 [R=301,L,NE]",
  "",
  "# Enforce one canonical protocol and host for preferred URLs.",
  "RewriteCond %{HTTPS} !=on [OR]",
  "RewriteCond %{HTTP_HOST} !^www\\.eqourse\\.com$ [NC]",
  "RewriteRule ^ https://www.eqourse.com%{REQUEST_URI} [R=301,L,NE]",
  "",
  "# Serve prerendered route HTML without forcing trailing slashes.",
  "RewriteCond %{REQUEST_FILENAME} -f",
  "RewriteRule ^ - [L]",
  "RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f",
  "RewriteRule ^(.+?)/?$ $1/index.html [L]",
  "",
  "# Admin remains an authenticated client-side application.",
  "RewriteRule ^admin(?:/.*)?$ index.html [L]",
  "",
  "# Unknown public routes must be real 404 responses, not soft-200 SPA pages.",
  "ErrorDocument 404 /404.html",
  "",
  "<IfModule mod_headers.c>",
  "  Header always set X-Content-Type-Options \"nosniff\"",
  "  Header always set Referrer-Policy \"strict-origin-when-cross-origin\"",
  "  Header always set Permissions-Policy \"camera=(), microphone=(), geolocation=()\"",
  "  Header always set Strict-Transport-Security \"max-age=31536000; includeSubDomains\" env=HTTPS",
  "  SetEnvIf Request_URI \"^/admin(?:/|$)\" EQOURSE_NOINDEX=1",
  "  Header always set X-Robots-Tag \"noindex, nofollow\" env=EQOURSE_NOINDEX",
  "  <FilesMatch \"\\.(?:css|js|mjs|woff2?)$\">",
  "    Header set Cache-Control \"public, max-age=31536000, immutable\"",
  "  </FilesMatch>",
  "  <FilesMatch \"\\.(?:png|jpe?g|gif|svg|webp|avif|ico|mp4|webm)$\">",
  "    Header set Cache-Control \"public, max-age=2592000\"",
  "  </FilesMatch>",
  "</IfModule>",
  "",
  "<IfModule mod_deflate.c>",
  "  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml",
  "</IfModule>",
  "",
].join("\n");

writeFileSync(join(root, "public", "_redirects"), netlify, "utf8");
writeFileSync(join(root, "public", "_headers"), headers, "utf8");
writeFileSync(join(root, "public", ".htaccess"), apache, "utf8");

console.log(`[seo-host-config] Generated ${redirects.length} permanent redirect rules for Netlify/Cloudflare Pages and Apache.`);
