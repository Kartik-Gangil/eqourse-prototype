import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const pageSeoSource = readFileSync(join(root, "src", "seo", "pageSeo.ts"), "utf8");
const SITE_URL = "https://www.eqourse.com";

const entries = [];
const entryPattern = /"(\/[^\"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)",/gs;
let match;
while ((match = entryPattern.exec(pageSeoSource)) !== null) {
  entries.push({
    path: match[1],
    title: match[2].replace(/\\"/g, '"'),
    description: match[3].replace(/\\"/g, '"'),
  });
}

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const failures = [];
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
  const expectedCanonical = `${SITE_URL}${entry.path === "/" ? "/" : entry.path}`;

  if (titles.length !== 1 || !titles[0]?.includes(`>${escapeHtml(entry.title)}</title>`)) {
    failures.push(`${entry.path}: expected exactly one matching title, found ${titles.length}`);
  }
  if (descriptions.length !== 1 || !descriptions[0]?.includes(`content="${escapeHtml(entry.description)}"`)) {
    failures.push(`${entry.path}: expected exactly one matching meta description, found ${descriptions.length}`);
  }
  if (canonicals.length !== 1 || !canonicals[0]?.includes(`href="${expectedCanonical}"`)) {
    failures.push(`${entry.path}: expected exactly one canonical ${expectedCanonical}, found ${canonicals.length}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`[verify-seo] Verified ${entries.length} routes: one exact title, description, and canonical per page.`);
