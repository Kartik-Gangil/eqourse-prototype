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

const netlify = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "https://eqourse.com/* https://www.eqourse.com/:splat 301!",
  ...redirects.map(({ from, to }) => `${from} ${to} 301!`),
  "/* /index.html 200",
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
  "# SPA fallback for dynamic CMS and client-side routes.",
  "RewriteRule ^ index.html [L]",
  "",
  "<IfModule mod_headers.c>",
  "  Header always set X-Content-Type-Options \"nosniff\"",
  "  Header always set Referrer-Policy \"strict-origin-when-cross-origin\"",
  "  Header always set Permissions-Policy \"camera=(), microphone=(), geolocation=()\"",
  "  Header always set Strict-Transport-Security \"max-age=31536000; includeSubDomains\" env=HTTPS",
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
writeFileSync(join(root, "public", ".htaccess"), apache, "utf8");

console.log(`[seo-host-config] Generated ${redirects.length} permanent redirect rules for Netlify/Cloudflare Pages and Apache.`);
