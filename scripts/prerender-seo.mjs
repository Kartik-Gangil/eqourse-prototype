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

function buildDataCollectionFallback() {
  const faq = [
    ["What is AI data collection?", "AI data collection is the process of sourcing or capturing raw text, image, audio, video or multimodal data for training, fine-tuning and evaluating AI systems."],
    ["What types of data can eQOURSE collect?", "eQOURSE supports image, audio and speech, text, video and multimodal data collection designed around the use case, users, languages, devices and environments."],
    ["What is the difference between data collection and data annotation?", "Data collection creates or sources the raw dataset. Data annotation adds labels or structure to data that already exists."],
    ["Can you support multilingual data collection?", "Yes. eQOURSE supports data programmes across 30+ languages, including requirements for region, dialect, accent and contributor profile."],
    ["How do you manage data quality?", "Controls can include contributor screening, capture guidelines, pilot validation, automated file checks, human QA, format validation and duplication checks."],
    ["Can you collect data using specific devices or environments?", "Yes. Collection can be designed around defined cameras, microphones, devices, locations, lighting and acoustic conditions."],
    ["How is consent handled?", "For contributor-led programmes, consent and permitted use are defined as part of the collection workflow according to the project and applicable requirements."],
    ["How much does AI data collection cost?", "Cost depends on modality, volume, languages, contributor profile, devices, environments, timeline and QA requirements."],
    ["Can eQOURSE annotate the data after collection?", "Yes. Collected data can move into eQOURSE annotation and labeling, cleaning and validation, and model-testing workflows."],
    ["Can you support AI data collection for robotics?", "eQOURSE supports real-world visual, video and multimodal collection relevant to physical and embodied AI."],
  ];
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${SITE_URL}/ai-data-services/data-collection#service`, name: "AI Data Collection Services", serviceType: "AI Training Data Collection", description: "Custom image, audio, text, video and multimodal data collection for AI and machine learning.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: `${SITE_URL}/ai-data-services/data-collection` };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <span>Data Collection</span></nav>
      <h1>AI Data Collection Services for AI &amp; Machine Learning</h1>
      <p>Build purpose-fit training datasets around the users, languages, devices and real-world environments your model needs to understand. eQOURSE supports custom image, audio, text and video data collection with quality controls, consent handling and secure delivery.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
      <section><h2>What Is AI Data Collection?</h2><p>AI data collection is the process of sourcing or capturing the raw text, images, audio, video and multimodal data required to train, fine-tune and evaluate AI systems.</p><h3>Data Collection vs. Data Annotation</h3><p>Collection creates the raw dataset. Annotation adds labels and structure to data that already exists.</p></section>
      <section><h2>Build Training Data Around Real Deployment Conditions</h2><p>Collection plans should represent the target population, environment, device profile, language mix and intended model behaviour.</p><ul><li>Coverage across participant profiles, demographics, regions and languages</li><li>Defined cameras, microphones, sensors and devices</li><li>Realistic lighting, acoustics, movement and background conditions</li><li>File, metadata, quality and delivery acceptance criteria</li></ul></section>
      <section><h2>Multi-Modal AI Data Collection</h2><article><h3>Image Data Collection</h3><p>Purpose-built visual datasets captured across defined objects, environments, devices, perspectives and lighting conditions.</p></article><article><h3>Audio &amp; Speech Data Collection</h3><p>Scripted and natural speech collected across languages, accents, speaker profiles, acoustic environments and devices.</p></article><article><h3>Text Data Collection</h3><p>Domain-specific, multilingual and conversational text datasets for NLP, LLM training, fine-tuning and evaluation.</p></article><article><h3>Video Data Collection</h3><p>Real-world video covering human activity, objects, environments and temporal behaviour for computer vision and physical AI.</p></article></section>
      <section><h2>How We Collect AI Training Data</h2><ul><li>Contributor-led collection</li><li>Controlled field and studio collection</li><li>Device-specific collection</li><li>Licensed or customer-provided sources</li></ul></section>
      <section><h2>Our AI Data Collection Process</h2><ol><li>Requirement definition</li><li>Collection specification</li><li>Source and vet</li><li>Pilot</li><li>Collect</li><li>Validate</li><li>Secure delivery</li></ol></section>
      <section><h2>Training Data for Modern AI Applications</h2><p>Computer vision, speech and voice AI, generative AI and LLMs, conversational AI, autonomous systems, robotics and physical AI.</p></section>
      <section><h2>Quality, Consent and Data Security Built Into Collection</h2><ul><li>Collection guidelines</li><li>Contributor screening</li><li>Consent handling</li><li>Provenance records</li><li>Quality validation</li><li>ISO 9001 and ISO 27001 certified processes</li></ul></section>
      <section><h2>Multilingual AI Data Collection Across 30+ Languages</h2><p>Programmes can define language, region, accent, dialect and contributor requirements before collection begins, with strong delivery depth across Indic languages.</p></section>
      <section><h2>One AI Data Workflow From Collection to Model Testing</h2><p><a href="/ai-data-services/data-collection">Collect</a> → <a href="/ai-data-services/annotation-labeling">Annotate</a> → <a href="/ai-data-services/cleaning-validation">Clean &amp; Validate</a> → <a href="/ai-data-services/model-testing">Test</a> → Improve</p></section>
      <section><h2>Data Collection for Physical and Embodied AI</h2><p>Purpose-built visual, video and multimodal collection programmes can support systems that perceive and operate in the physical world.</p><p><a href="/robotics-training-data-services">Explore Robotics Training Data Services</a></p></section>
      <section><h2>What Determines AI Data Collection Pricing?</h2><p>Pricing depends on modality, volume, language and geography, contributor profile, devices and environments, quality requirements and timeline.</p></section>
      <section><h2>Frequently Asked Questions About AI Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Ready to Build Your AI Training Dataset?</h2><p>Tell us the data type, target volume, languages, deployment environment and timeline.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildCrawlFallback({ path, title, description }) {
  if (path === "/ai-data-services/data-collection") return buildDataCollectionFallback();
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
    /<div id="root">(?:<main data-seo-prerender="true">[\s\S]*?<\/main>)?<\/div>/,
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
