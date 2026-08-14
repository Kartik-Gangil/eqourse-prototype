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
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const pattern = /"(\/[^"]*)":\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*"((?:[^"\\]|\\.)*)",(?:\s*canonical:\s*"((?:[^"\\]|\\.)*)",)?(?:\s*image:\s*"((?:[^"\\]|\\.)*)",)?/gs;
  const entries = [];
  let match;
  while ((match = pattern.exec(source)) !== null) {
    entries.push({
      path: match[1],
      title: match[2].replace(/\\"/g, '"'),
      description: match[3].replace(/\\"/g, '"'),
      canonical: match[4]?.replace(/\\"/g, '"'),
      image: match[5]?.replace(/\\"/g, '"'),
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

function renderMarkdownForSeo(content) {
  if (!content?.trim()) return "";
  return renderToStaticMarkup(
    React.createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      skipHtml: true,
      components: { h1: ({ children }) => React.createElement("h2", null, children) },
    }, content),
  );
}

function plainTextFromHtml(content) {
  return String(content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

function buildImageDataCollectionFallback() {
  const faq = [
    ["What is image data collection?", "Image data collection captures or sources purpose-built visual data to train, fine-tune, validate or evaluate computer vision and multimodal AI systems."],
    ["What types of images can eQOURSE collect?", "Projects can include objects, products, documents, scenes, gestures, human-centred images and device-specific captures, subject to consent and rights requirements."],
    ["Can you collect images using specific phones or cameras?", "Yes. Programmes can specify hardware, resolution, orientation, camera position and capture settings."],
    ["How do you ensure image diversity?", "The specification can define scene, angle, distance, lighting, geography, object condition, background and participant-profile variation."],
    ["Can you collect document images for OCR?", "Yes. Collections can include receipts, invoices, labels, forms, worksheets and other documents under varied real-world conditions."],
    ["How is consent handled when people appear in images?", "Consent, intended use, handling, retention and access requirements are defined for the project and applicable legal requirements."],
    ["Do you also annotate collected images?", "Yes. Collected images can continue into eQOURSE Annotation & Labeling for project-specific label types."],
    ["What image formats can you deliver?", "Common examples include JPEG, PNG, WebP and other formats agreed during scoping, plus manifests and capture metadata."],
    ["How much does image data collection cost?", "Cost depends on volume, capture complexity, participants, geography, devices, environments, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/image-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Image Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Image Data Collection Services for Computer Vision", serviceType: "Image Data Collection for AI", description: "Custom image data collection for computer vision and visual AI across objects, documents, scenes, devices and real-world conditions.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Image Data Collection</span></nav>
      <h1>Image Data Collection Services for Computer Vision &amp; Visual AI</h1>
      <p>Build purpose-fit image datasets around the objects, people, documents, environments, devices and visual conditions your model must understand.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Image Dataset</a></p>
      <section><h2>What Is Image Data Collection for AI?</h2><p>Image data collection captures or sources visual data for training, fine-tuning, validating or evaluating computer vision and multimodal AI. Programmes can control object type, device, angle, distance, lighting, background, geography and environment.</p></section>
      <section><h2>Custom Image Datasets Built Around Your Computer Vision Use Case</h2><h3>Objects &amp; Products</h3><p>Objects captured across angles, distances, backgrounds and lighting.</p><h3>Documents &amp; Forms</h3><p>Receipts, invoices, forms, labels and packaging under realistic conditions.</p><h3>Human Actions &amp; Gestures</h3><p>Consented gestures and interaction scenarios.</p><h3>Human-Centred Visual Data</h3><p>Appropriately consented imagery under project-specific requirements.</p><h3>Scenes &amp; Environments</h3><p>Indoor, outdoor and domain-specific scenes.</p><h3>Device-Specific Capture</h3><p>Images recorded with defined cameras, phones, resolutions or optics.</p></section>
      <section><h2>Collect Images Under the Conditions Your Model Will Actually See</h2><ul><li>Lighting</li><li>Angle and perspective</li><li>Distance and scale</li><li>Background and occlusion</li><li>Device and resolution</li><li>Geography and participant profile</li></ul></section>
      <section><h2>How We Collect Image Training Data</h2><ul><li>Contributor-led capture</li><li>Controlled or on-site capture</li><li>Field collection</li><li>Customer-provided or rights-cleared sources</li></ul></section>
      <section><h2>Our Image Data Collection Process</h2><ol><li>Use-case definition</li><li>Capture specification</li><li>Contributor and environment setup</li><li>Pilot collection</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling">Continue into Image Annotation &amp; Labeling</a></p></section>
      <section><h2>Image Quality Checks Before Dataset Delivery</h2><p>Checks may cover file integrity, resolution, orientation, formats, blur, exposure, required scenes, capture compliance, coverage and duplicate review.</p></section>
      <section><h2>Consent and Provenance for Human-Centred Image Data</h2><p>Consent, permitted use, provenance, retention, access, de-identification and secure-transfer requirements are defined for the project where applicable.</p></section>
      <section><h2>Image Data for Computer Vision and Multimodal AI</h2><p>Object detection, OCR, visual search, gestures, scene understanding, retail intelligence, mobility vision and vision-language models.</p></section>
      <section><h2>Image Collection Across Real-World Domains</h2><p>Retail, mobility, enterprise documents, governed healthcare workflows, consumer devices, education and EdTech.</p></section>
      <section><h2>Image Dataset Formats and Delivery</h2><p>Typical examples include JPEG, PNG, WebP, TIFF, directory structures, manifests, capture metadata and consent or provenance documentation.</p></section>
      <section><h2>When Do You Need Custom Image Data Collection?</h2><p>Custom capture helps when classes, devices, environments, geographies, licensing evidence or production edge cases are missing from existing datasets.</p></section>
      <section><h2>What Determines Image Data Collection Cost?</h2><p>Pricing depends on volume, complexity, participants, geography, devices, environments, repetitions, field operations, QA depth and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Image Data Collection?</h2><p>Custom specifications, multi-region coordination, specialist workflows, connected downstream services and ISO 9001 and ISO 27001 certified processes.</p><p><a href="/ai-data-services/data-collection">Explore all AI Data Collection Services</a></p></section>
      <section><h2>Frequently Asked Questions About Image Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build the Image Dataset Your Model Actually Needs</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildAudioDataCollectionFallback() {
  const faq = [
    ["What is speech data collection?", "Speech data collection records human speech or related audio for training, fine-tuning, validating or evaluating speech-enabled AI."],
    ["What speech types can eQOURSE collect?", "Projects can include scripted speech, spontaneous speech, conversations, wake words, commands, domain-specific speech and selected acoustic events."],
    ["Can you collect multilingual and accented speech?", "Yes. eQOURSE supports programmes across 30+ languages, with accent, dialect, locale and speaker requirements defined during scoping."],
    ["Can you record in noisy or real-world environments?", "Yes. Projects can target homes, offices, vehicles or other environments when realistic acoustic conditions matter."],
    ["Can you collect audio using specific microphones or devices?", "Yes. A specification can include a particular microphone, phone, headset or recording setup."],
    ["What audio formats do you support?", "Common examples include WAV, FLAC and other agreed formats, with sample rate, bit depth, channels and metadata defined for the model pipeline."],
    ["How do you check audio quality?", "Checks can cover clipping, silence, truncation, integrity, prompt compliance, sample rate, language, device, environment and human review."],
    ["How is voice-data consent handled?", "Contributor consent and permitted use are defined before recording, alongside project-specific retention, access and de-identification requirements."],
    ["Can eQOURSE transcribe or annotate the audio after collection?", "Yes. Collected audio can continue into transcription, annotation, cleaning and validation workflows."],
    ["How much does speech data collection cost?", "Cost depends on languages, dialects, speaker criteria, volume, recording method, devices, environments, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/audio-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Audio & Speech Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Audio & Speech Data Collection Services for Voice AI", serviceType: "Audio and Speech Data Collection for AI", description: "Custom audio and speech data collection for ASR, TTS and voice AI across languages, accents, speakers, devices and real-world acoustic environments.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Audio &amp; Speech Data Collection</span></nav>
      <h1>Audio &amp; Speech Data Collection Services for Voice AI</h1>
      <p>Build speech and audio datasets around the languages, accents, speaker profiles, devices and acoustic environments your model will encounter in production.</p>
      <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Speech Dataset</a></p>
      <section><h2>What Is Audio &amp; Speech Data Collection for AI?</h2><p>Audio data collection records or sources speech, voice and other sound data for training, fine-tuning, validating or evaluating AI systems. Programmes can control language, accent, dialect, speaker profile, speaking style, microphone, environment, noise and recording format.</p><h3>Collection vs. annotation</h3><p>Collection creates the raw audio dataset. Transcripts, speaker labels and structured tags are downstream annotation tasks.</p></section>
      <section><h2>Speech Data Collection for Real Voice AI Use Cases</h2><h3>Scripted Speech</h3><p>Predetermined prompts and commands.</p><h3>Spontaneous Speech</h3><p>Natural speech around topics or scenarios.</p><h3>Conversational Speech</h3><p>Natural or guided multi-speaker conversations.</p><h3>Wake Words &amp; Commands</h3><p>Activation phrases across speakers and environments.</p><h3>Domain-Specific Speech</h3><p>Speech built around specialised scenarios.</p><h3>Non-Speech &amp; Acoustic Events</h3><p>Selected environmental sounds under controlled specifications.</p></section>
      <section><h2>Capture the Language and Acoustic Variation Your Model Needs</h2><ul><li>Language and locale</li><li>Accent and dialect</li><li>Speaker profile</li><li>Speaking style</li><li>Device and microphone</li><li>Environment</li><li>Distance and position</li><li>Noise conditions</li></ul></section>
      <section><h2>Multilingual Speech Data Across 30+ Languages</h2><p>Programmes can define language, regional accent, dialect, speaker mix, code-switching, prompt style, device and acoustic environment, with strong delivery depth across Indic languages.</p></section>
      <section><h2>How We Collect Speech and Audio Training Data</h2><ul><li>Remote contributor recording</li><li>Moderated or studio collection</li><li>In-environment collection</li><li>Defined client workflow where supported</li></ul></section>
      <section><h2>Our Speech Data Collection Process</h2><ol><li>Use-case definition</li><li>Speech specification</li><li>Contributor sourcing and calibration</li><li>Pilot recording</li><li>Collection at scale</li><li>Audio QA</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling">Transcription and Annotation</a> → <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Audio Quality Controls Built Around the Project Specification</h2><p>Checks can cover signal integrity, prompt compliance, acoustic conditions, device and microphone requirements, project-safe identifiers and language-qualified human review.</p></section>
      <section><h2>Audio Training Data for Modern Speech AI</h2><p>ASR, TTS support data, voice assistants, wake words, conversational AI, dialogue understanding, customer-service AI and audio event detection.</p></section>
      <section><h2>Responsible Collection for Human Voice Data</h2><p>Permitted use, contributor consent, retention, access, de-identification and metadata minimisation are defined before collection. Controls can include ISO 9001, ISO 27001, controlled access, secure transfer and provenance records.</p></section>
      <section><h2>Audio Formats, Metadata and Delivery</h2><p>Examples include WAV, FLAC, MP3 where appropriate, mono or stereo, agreed sample rate and bit depth, project-safe identifiers, language, device and environment metadata, and session manifests.</p></section>
      <section><h2>Speech Data Collection Across Real-World Domains</h2><p>Consumer technology, automotive, customer experience, approved financial-services scenarios, education and ethically designed accessibility applications.</p></section>
      <section><h2>When Public Speech Datasets Are Not Enough</h2><p>Custom collection helps when accents, dialects, devices, noisy environments, domain language, commands, conversational scenarios or provenance requirements are missing.</p></section>
      <section><h2>What Determines Audio Data Collection Cost?</h2><p>Pricing depends on volume, language, dialect, speakers, recording complexity, devices, environments, moderation, domain expertise, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Audio &amp; Speech Data Collection?</h2><p>Multilingual and Indic-language depth, remote and controlled collection models, language-aware QA, connected downstream services and ISO 9001 and ISO 27001.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Explore Image Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Audio &amp; Speech Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build Speech Data Around the Voices Your AI Must Understand</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildTextDataCollectionFallback() {
  const faq = [
    ["What is text data collection?", "Text data collection sources, creates or compiles written language data for NLP, LLM and other language-AI systems."],
    ["What is the difference between text collection and text annotation?", "Collection creates or sources the dataset. Annotation adds labels such as intents, entities, sentiment categories or safety tags."],
    ["Can eQOURSE create text for LLM fine-tuning?", "Where operationally supported, contributors or domain experts can create instruction-response, conversational or task-specific examples against defined rubrics."],
    ["Can you collect multilingual text?", "Yes. eQOURSE supports programmes across 30+ languages, with locale, script, regional usage and domain requirements defined during scoping."],
    ["Can you collect domain-specific text?", "Yes. Programmes can use trained contributors or subject-matter experts when specialist terminology or factual knowledge is required."],
    ["How do you manage duplicate or low-quality text?", "Quality workflows can include duplicate detection, language checks, format validation, relevance review, domain review and human QA."],
    ["Can you work with our existing documents or knowledge base?", "Yes. Customer-owned or appropriately authorised sources can be incorporated subject to access, rights, confidentiality and handling requirements."],
    ["What formats can text datasets be delivered in?", "Common formats include JSON, JSONL, CSV, TSV and client-defined text schemas, including conversation and metadata structures."],
    ["How do you handle PII or sensitive text?", "Workflows can include project-specific minimisation, redaction, de-identification, access controls and retention rules."],
    ["How much does text data collection cost?", "Cost depends on volume, language, domain complexity, source method, expertise, output length, rights, QA depth and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/text-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Text Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Text Data Collection Services for NLP, LLMs & Generative AI", serviceType: "Text Data Collection for AI", description: "Custom text data collection for NLP, LLMs and generative AI across multilingual, domain-specific, conversational and human-generated datasets.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Text Data Collection</span></nav>
      <h1>Text Data Collection Services for NLP, LLMs &amp; Generative AI</h1>
      <p>Build domain-specific, multilingual and conversational text datasets around the language patterns, tasks and knowledge your models need to understand.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Text Dataset</a></p>
      <section><h2>What Is Text Data Collection for AI?</h2><p>Text data collection sources, creates or compiles written language data for training, fine-tuning, validating or evaluating NLP, large language models and text-driven AI.</p><h3>Collection creates the dataset; annotation adds structure</h3><p>NER, sentiment, entity and intent labels belong to <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">text and NLP annotation services</a>.</p></section>
      <section><h2>Custom Text Datasets for NLP and Language Models</h2><h3>Domain-Specific Corpora</h3><p>Specialist text for adaptation and retrieval.</p><h3>Conversational &amp; Dialogue Data</h3><p>Human-generated conversations around defined intents.</p><h3>Queries, Intents &amp; Utterances</h3><p>Natural language variants for real interactions.</p><h3>Instructions &amp; Responses</h3><p>Task examples created against defined rubrics where supported.</p><h3>Documents &amp; Written Records</h3><p>Authorised structured and unstructured sources.</p><h3>Handwritten Text Samples</h3><p>Purpose-collected handwriting.</p><h3>Multilingual Text</h3><p>Locale-specific language reflecting real syntax and usage.</p></section>
      <section><h2>Text Collection Creates the Language Data; Annotation Adds Structure</h2><p>Collection sources or creates examples. Annotation adds intent, entity, sentiment, safety or other labels to existing text.</p></section>
      <section><h2>Text Data Collection Methods</h2><ul><li>Human-created text</li><li>Domain-expert creation</li><li>Customer-provided corpora</li><li>Rights-cleared or licensed sources</li><li>Handwriting and document capture</li></ul></section>
      <section><h2>Control the Language Variables That Shape Model Behaviour</h2><ul><li>Domain</li><li>Intent</li><li>Style and register</li><li>Language and locale</li><li>Difficulty and edge cases</li><li>Contributor expertise</li></ul></section>
      <section><h2>Multilingual Text Collection Across 30+ Languages</h2><p>Programmes can define language, locale, script, regional vocabulary, code-switching, register, domain and review requirements, with strong Indic-language capability.</p></section>
      <section><h2>Our Text Data Collection Process</h2><ol><li>Use-case definition</li><li>Dataset specification</li><li>Contributor or expert setup</li><li>Pilot batch</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation</a> → <a href="/ai-data-services/cleaning-validation">Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Text Quality Controls for NLP and LLM Data</h2><p>Controls can cover duplicates, language, formats, fields, relevance, domain review, project-policy content rules, provenance, PII minimisation and human QA.</p></section>
      <section><h2>Text Data for LLM Training, Adaptation and Evaluation</h2><p>Domain adaptation, supervised fine-tuning data, conversational AI, search and retrieval, classification, evaluation sets and multimodal text.</p></section>
      <section><h2>Text Data for NLP Applications</h2><p>Intent classification, query understanding, conversational AI, summarisation, question answering, document understanding, multilingual NLP and RAG corpus preparation.</p></section>
      <section><h2>Text Data Provenance and Responsible Sourcing</h2><p>Permitted sources, usage, access, retention and governance are defined before collection. Controls can include rights-cleared sourcing, consent, provenance metadata, PII minimisation, secure access, ISO 27001 and ISO 9001.</p></section>
      <section><h2>Text Dataset Formats and Delivery</h2><p>Examples include JSON, JSONL, CSV, TSV, TXT, XML, conversation schemas, prompt-response schemas, metadata manifests and provenance fields.</p></section>
      <section><h2>Domain-Specific Text Data Collection</h2><p>Technology, education, financial services, approved healthcare workflows, retail and enterprise knowledge.</p></section>
      <section><h2>When Generic Web Text Is Not Enough</h2><p>Custom collection helps when domains, vocabularies, intents, low-resource languages, provenance, product-specific queries or expert knowledge are missing.</p></section>
      <section><h2>What Determines Text Data Collection Cost?</h2><p>Pricing depends on volume, sourcing method, language, domain, expertise, length, research, rights, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Text Data Collection?</h2><p>30+ languages, Indic-language depth, multidisciplinary specialists, domain expertise, connected downstream workflows and project-specific rubrics.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/data-collection/audio-data-collection">Audio &amp; Speech Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Text Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Build Language Data Around the Tasks Your Model Must Perform</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildVideoDataCollectionFallback() {
  const faq = [
    ["What is video data collection for AI?", "Video data collection records or sources sequences for AI systems that need to understand motion, actions, objects, events and changing environments."],
    ["What types of video can eQOURSE collect?", "Projects can include human activities, gestures, object interactions, indoor and outdoor scenes, mobility scenarios, multi-camera capture and selected first-person tasks."],
    ["Can you collect egocentric or first-person video?", "Where appropriate, approved wearable or first-person setups can capture task sequences and object interactions. Robotics-specific requirements belong to Robotics Training Data Services."],
    ["Can you use specific cameras or devices?", "Yes. Specifications can define phones, cameras, wearable rigs, mounts, viewpoints, resolution and frame rate."],
    ["How do you ensure video quality?", "QA can include integrity, duration, codec, resolution, frame rate, blur, exposure, framing, scenario compliance, duplicates and metadata."],
    ["Can you collect multi-camera video?", "Where operationally supported, the same scene or activity can be captured from multiple viewpoints with synchronisation defined during scoping."],
    ["How is consent handled?", "Participant consent, permitted use, location permissions, retention and access requirements are defined before collection where applicable."],
    ["Can you annotate collected video?", "Yes. Clips can continue into Annotation & Labeling for frame-level, temporal, tracking, action, keypoint or project-specific labels."],
    ["What formats can video be delivered in?", "Common formats include MP4, MOV and other agreed containers or codecs, with technical parameters aligned to the model pipeline."],
    ["How much does video data collection cost?", "Cost depends on volume, scenarios, participants, locations, cameras, resolution, multi-camera requirements, moderation, QA and timeline."],
  ];
  const canonical = `${SITE_URL}/ai-data-services/data-collection/video-data-collection`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Collection", item: `${SITE_URL}/ai-data-services/data-collection` },
    { "@type": "ListItem", position: 4, name: "Video Data Collection", item: canonical },
  ] };
  const service = { "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`, name: "Video Data Collection Services for Computer Vision & Multimodal AI", serviceType: "Video Data Collection for AI", description: "Custom video data collection for computer vision and multimodal AI across actions, objects, environments and first-person scenarios.", provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", url: canonical };
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `<main data-seo-prerender="true">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/data-collection">Data Collection</a> / <span>Video Data Collection</span></nav>
      <h1>Video Data Collection Services for Computer Vision &amp; Multimodal AI</h1>
      <p>Capture real-world video around the actions, objects, camera perspectives, environments and temporal patterns your model must understand.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Discuss Your Video Dataset</a></p>
      <section><h2>What Is Video Data Collection for AI?</h2><p>Video data collection records or sources sequences for AI systems that understand motion, actions, events, object behaviour and changing environments over time. Projects can control camera, viewpoint, frame rate, duration, environment, activity and coverage.</p><h3>Collection creates the raw video</h3><p>Frame, tracking, action and temporal labels belong to <a href="/ai-data-services/annotation-labeling/video-annotation">video annotation services</a>.</p></section>
      <section><h2>Custom Video Datasets for Dynamic AI Systems</h2><h3>Human Actions &amp; Activities</h3><p>Scripted or natural action sequences.</p><h3>Object Movement &amp; Interaction</h3><p>Objects moved, handled or assembled.</p><h3>Environment &amp; Scene Video</h3><p>Scenes across time and operating conditions.</p><h3>In-Vehicle &amp; Mobility Video</h3><p>Approved cabin, road and mobility scenarios.</p><h3>Multi-Camera Capture</h3><p>Cross-view recordings of the same activity.</p><h3>Egocentric / First-Person Video</h3><p>Approved wearable capture of tasks and interactions.</p></section>
      <section><h2>Capture the Temporal and Visual Variation Your Model Needs</h2><ul><li>Action or scenario</li><li>Camera viewpoint</li><li>Frame rate and resolution</li><li>Duration</li><li>Lighting and time</li><li>Environment</li><li>Participant or object coverage</li><li>Temporal diversity</li></ul></section>
      <section><h2>How We Collect Video Training Data</h2><ul><li>Remote contributor capture</li><li>Moderated or controlled capture</li><li>Field collection</li><li>Device or rig-specific capture</li><li>Customer-provided or rights-cleared video</li></ul></section>
      <section><h2>Our Video Data Collection Process</h2><ol><li>Use-case definition</li><li>Scenario and capture specification</li><li>Contributor, location and device setup</li><li>Pilot capture</li><li>Collection at scale</li><li>Quality validation</li><li>Secure delivery</li></ol><p><a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation Services</a> → <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> → <a href="/ai-data-services/model-testing">Model Testing</a></p></section>
      <section><h2>Quality Validation for Video Training Data</h2><p>Checks can cover integrity, codecs, duration, resolution, frame rate, orientation, blur, exposure, framing, action visibility, scenario compliance, coverage and duplicates.</p></section>
      <section><h2>First-Person Video for Embodied and Physical AI</h2><p>Approved wearable setups can capture everyday actions and object interactions. Deep robotics demonstrations, sensor fusion and VLA projects belong to <a href="/robotics-training-data-services">Robotics Training Data Services</a>.</p></section>
      <section><h2>Video Data for Dynamic Computer Vision and Multimodal AI</h2><p>Action recognition, tracking, gestures, scene understanding, mobility, safety, video-language models and selected physical-AI use cases.</p></section>
      <section><h2>Responsible Collection in Human and Real-World Environments</h2><p>Consent, location permissions, permitted use, access, retention, provenance, metadata minimisation, secure transfer and downstream de-identification are defined where applicable.</p></section>
      <section><h2>Video Formats, Metadata and Delivery</h2><p>Examples include MP4, MOV, WebM, agreed codecs, resolution, frame rate, clip and scenario IDs, device and environment metadata, timestamps, synchronisation metadata, manifests and provenance documents.</p></section>
      <section><h2>Video Data Collection Across Real-World Domains</h2><p>Automotive, retail, workplaces, consumer devices, fitness and a bridge to dedicated robotics programmes.</p></section>
      <section><h2>When Existing Video Libraries Do Not Match Deployment</h2><p>Custom capture helps when actions, viewpoints, devices, rare cases, environments, consented footage, first-person data, provenance or temporal diversity are missing.</p></section>
      <section><h2>What Determines Video Data Collection Cost?</h2><p>Pricing depends on volume, scenarios, participants, locations, cameras, frame rate, resolution, synchronisation, field operations, QA and timeline.</p></section>
      <section><h2>Why Choose eQOURSE for Video Data Collection?</h2><p>Scenario-led specifications, flexible capture models, multi-region coordination, connected downstream services, ISO 9001, ISO 27001 and domain specialists.</p><p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a> <a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/data-collection/audio-data-collection">Audio Data Collection</a> <a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection</a></p></section>
      <section><h2>Frequently Asked Questions About Video Data Collection</h2>${faq.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
      <section><h2>Capture the Video Scenarios Your Model Needs to Understand</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
      <script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(service)}</script>
    </main>`;
}

function buildAnnotationLabelingFallback() {
  const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
  const services = [
    ["Image Annotation", "Bounding boxes, semantic and instance segmentation, polygons, keypoints and image classification."],
    ["Video Annotation", "Persistent object tracking, frame interpolation, action recognition, event boundaries and multi-camera association."],
    ["Text and NLP Annotation", "Named entities, sentiment, text classification, relation extraction, intent and machine-translation review."],
    ["Audio and Speech Annotation", "Transcription, speaker diarization, emotion, acoustic events, phonetics and wake-word tagging."],
    ["LLM and RLHF Data", "Response ranking, instruction following, safety, factual verification, red teaming and grounding checks."],
    ["3D Point Cloud and LiDAR", "3D cuboids, point segmentation, sensor fusion, tracking and drivable-space labels."],
    ["Document and OCR Annotation", "Layout regions, form fields, table structure, handwriting, invoice parsing and KYC labels."],
    ["Content Moderation and Trust and Safety", "Policy violations, severity tiers, hate and harassment, NSFW, spam and fraud review."],
  ];
  const faq = [
    ["What is data annotation?", "Data annotation adds labels, tags, boundaries or structure to raw data so a machine learning model can learn from it."],
    ["What is the difference between data annotation and data labeling?", "The terms are often interchangeable. Labeling may assign a class to a whole item, while annotation can include richer regions, relationships and attributes."],
    ["What is the difference between data collection and data annotation?", "Collection sources or captures raw data. Annotation adds labels and structure to data that already exists."],
    ["What types of data can eQOURSE annotate?", "Images, video, text, audio and speech, documents, 3D point clouds and human-feedback data for large language models."],
    ["How do you ensure annotation quality?", "Written guidelines, qualification tests, gold sets, agreement measurement, consensus, senior adjudication, multi-pass review and automated validation."],
    ["Do you provide subject-matter experts?", "Yes. Qualified reviewers cover STEM, medical and life sciences, legal, linguistics and education."],
    ["Can you work in our annotation tool?", "Yes. Projects can run in your platform or on tooling provided by eQOURSE."],
    ["What output formats do you deliver?", "COCO, YOLO, Pascal VOC, CVAT XML, JSON, JSONL, CSV, CoNLL, BIO, SRT, VTT, RTTM, Parquet and custom schemas."],
    ["Do you support multilingual annotation?", "Yes. Native-speaker review is available across 30+ languages, including deep Indic-language coverage."],
    ["How much do data annotation services cost?", "Cost depends on task complexity, objects per item, volume, quality tier, language, expertise, turnaround and security."],
    ["How long does a project take?", "A pilot typically runs within the first week; production timing depends on volume, complexity and quality tier."],
    ["How is data kept secure?", "Work runs under ISO 27001 certified processes with NDAs, role-based access, audit trails and controlled retention."],
    ["Can you fix an existing labeled dataset?", "Yes. eQOURSE can audit, quantify errors, repair labels or relabel against a corrected guideline."],
    ["Can collection and annotation run together?", "Yes. Data can move through collection, annotation, cleaning, validation and testing in one workflow."],
    ["Do you support RLHF and LLM evaluation?", "Yes. Work includes preference ranking, instruction following, safety, factuality, citation checks, red teaming and agent trajectory review."],
  ];
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` },
    { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` },
  ]};
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SITE_URL + "/ai-data-services/annotation-labeling#service",
    name: "Data Annotation & Labeling Services",
    serviceType: "AI data annotation and labeling",
    provider: { "@type": "Organization", name: "eQOURSE", url: SITE_URL },
    areaServed: "Worldwide",
    url: SITE_URL + "/ai-data-services/annotation-labeling",
    description: "Managed image, video, text, audio, document, 3D and LLM data annotation with subject-matter experts and multi-tier quality assurance.",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return `<main data-seo-prerender="true">
    <h1>Data Annotation &amp; Labeling Services for AI and Machine Learning</h1>
    <p>eQOURSE turns raw image, video, text, audio, document and LLM-feedback data into model-ready training data through written guidelines, trained annotators and multi-tier quality review.</p>
    <p>500+ annotation and QA specialists · 30+ languages · ISO 9001 and ISO 27001 certified processes</p>
    <p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Data Annotation and Labeling?</h2><p>Data annotation adds labels, tags, boundaries or structure to raw data so a machine learning model can learn from it. The quality ceiling of a supervised model is set by its labels, so annotation is a specification problem before it is a labour problem.</p><h3>Data Annotation vs. Data Labeling</h3><p>Labeling often assigns a class to a whole item; annotation can also describe regions, relationships and attributes.</p><h3>Data Collection vs. Data Annotation</h3><p>Collection creates raw data. Annotation adds meaning to existing data.</p><a href="/ai-data-services/data-collection">Explore AI Data Collection Services</a></section>
    <section><h2>Data Annotation Services Across Every Data Type</h2>${services.map(([title, description]) => `<article><h3>${title}</h3><p>${description}</p></article>`).join("")}</section>
    <section><h2>Annotation Task Types We Support</h2><p>Computer vision: bounding boxes, polygons, segmentation, keypoints and cuboids. Video: tracking, interpolation, action and event boundaries. Language: NER, relations, intent, sentiment and relevance. Speech: transcription, diarization and acoustic events. Documents: layout, forms, tables and handwriting. Generative AI: preference ranking, rubric evaluation, factuality, citations and agent trajectories.</p><a href="/ai-data-samples">See annotation samples</a></section>
    <section><h2>Our Data Annotation Process</h2><ol><li>Scope and sample review</li><li>Guideline authoring</li><li>Annotator onboarding and calibration</li><li>Pilot batch</li><li>Production annotation</li><li>Multi-tier quality review</li><li>Delivery and iteration</li></ol></section>
    <section><h2>Multi-Tier QA Framework</h2><p>Gold-standard sets, inter-annotator agreement, consensus and adjudication, multi-pass review, automated validation, documented escalation paths and acceptance criteria agreed during the pilot.</p></section>
    <section><h2>Annotation Guidelines and Edge-Case Handling</h2><p>Guidelines are stress-tested against real samples. New rulings are versioned, dated, distributed to the full team and back-propagated where consistency requires relabeling.</p></section>
    <section><h2>Annotation by Subject-Matter Experts, Not Just Annotators</h2><p>STEM, medical, life-sciences, language, assessment and curriculum experts review tasks where domain judgement—not throughput—sets quality.</p></section>
    <section><h2>Multilingual Annotation Across 30+ Languages, With Deep Indic Coverage</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, including code-mixed and transliterated content.</p></section>
    <section><h2>Tools, Platforms and Output Formats</h2><p>COCO JSON, YOLO, Pascal VOC, CVAT XML, masks, JSONL, CSV, CoNLL, BIO, SRT, VTT, RTTM, Parquet and custom schemas.</p></section>
    <section><h2>Data Security, Privacy and Compliance</h2><p>ISO-certified processes, NDAs, role-based access, controlled environments, PII workflows, audit trails and contract-defined retention and deletion.</p></section>
    <section><h2>Engagement Models</h2><p>Managed projects, dedicated teams, overflow support, and QA or relabeling engagements.</p></section>
    <section><h2>In-House vs. Crowdsourced vs. Managed Annotation</h2><p>eQOURSE combines a retained trained team, expert reviewers, versioned guidelines, gold sets, agreement measurement and scalable delivery.</p></section>
    <section><h2>What Determines Data Annotation Pricing?</h2><p>Task complexity, objects per item, volume, quality tier, language and domain expertise, turnaround, security and guideline maturity.</p></section>
    <section><h2>Data Annotation for Every Industry</h2><p>Automotive, healthcare, retail, robotics, agriculture, finance, media and education.</p></section>
    <section><h2>One AI Data Workflow, From Collection to Model Testing</h2><p><a href="/ai-data-services/data-collection">Collect</a> → Annotate → <a href="/ai-data-services/cleaning-validation">Clean and Validate</a> → <a href="/ai-data-services/model-testing">Test</a> → Improve</p><a href="/robotics-training-data-services">Robotics Training Data Services</a></section>
    <section><h2>See the Work</h2><p><a href="/ai-data-samples">Annotation samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Why Choose eQOURSE for Data Annotation</h2><p>Subject-matter experts, complete AI data workflows, guideline-first delivery, Indic language depth, 500+ specialists, ISO-certified processes and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About Data Annotation</h2>${faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</section>
    <section><h2>Turn Your Raw Data Into Model-Ready Training Data</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${json(serviceSchema)}</script><script type="application/ld+json">${json(breadcrumb)}</script><script type="application/ld+json">${json(faqSchema)}</script>
  </main>`;
}

function buildLlmRlhfFallback() {
  const services = [
    ["Preference Ranking & RLHF Data", "Pairwise and list-wise model-output comparison with optional reviewer rationale."],
    ["SFT & Instruction Data Creation", "Human-authored prompts, gold responses, rewrites and task distributions."],
    ["Rubric-Based Response Evaluation", "Multi-dimensional scoring against anchored evaluation criteria."],
    ["Factuality & Hallucination Review", "Claim-level verification, source checks and fabrication detection."],
    ["RAG Grounding & Citation Verification", "Answer-context alignment, citation accuracy and retrieval relevance."],
    ["Safety, Toxicity & Policy Classification", "Policy taxonomy labels, harm categories and severity tiers."],
    ["Red Teaming & Adversarial Prompts", "Jailbreak, prompt-injection and refusal-boundary testing."],
    ["Agent Trajectory & Tool-Use Evaluation", "Step correctness, tool choice, recovery and end-to-end success."],
    ["Multi-Turn Conversation Evaluation", "Context retention, consistency, persona adherence and conversation success."],
    ["Model Comparison & Benchmarking", "Blind A/B evaluation, win rates and regression detection."],
    ["Domain-Expert Review", "Qualified reviewers for STEM, medical, legal, finance, education and code."],
    ["Multilingual LLM Evaluation", "Native-speaker evaluation across 30+ languages and code-mixed input."],
  ];
  const faqs = [
    ["What is RLHF?", "Reinforcement Learning from Human Feedback trains a language model on human preferences by learning from reviewers who compare or score model outputs."],
    ["What is the difference between SFT, RLHF and DPO?", "SFT teaches how to respond from curated examples. RLHF and DPO use human preference pairs to teach which response is better; DPO skips the separate reward model."],
    ["What LLM data services does eQOURSE provide?", "Preference ranking, SFT data, rubric evaluation, factuality and RAG review, safety classification, red teaming, agent evaluation, benchmarking and multilingual evaluation."],
    ["Do you provide subject-matter experts?", "Yes. Qualified reviewers cover STEM, education, medical and life sciences, legal, finance, software and linguistics."],
    ["How do you measure quality when there is no single right answer?", "Inter-rater reliability, blind duplicate sampling, expert gold sets, anchored rubrics, bias controls and senior adjudication."],
    ["What is agent trajectory evaluation?", "It reviews a multi-step agent run for tool selection, call structure, reasoning continuity, recovery and task success."],
    ["Can you help design our evaluation rubric?", "Yes. eQOURSE defines dimensions, scales, anchor examples and tie-break rules, then stress-tests them in calibration."],
    ["What formats do you deliver in?", "JSONL preference pairs, chat-format SFT data, rubric scores, conversations, agent traces, red-team result sets and custom schemas."],
    ["Do you support red teaming?", "Yes. Human-written jailbreaks, prompt injection, refusal probing and domain-specific attacks can be labeled by category and severity."],
    ["Which languages do you support?", "30+ languages with deep Indic coverage including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Urdu."],
    ["How much does RLHF data cost?", "Cost depends on reviewer qualification, complexity, response length, rubric maturity, agreement target, language and turnaround."],
    ["How do you keep our model outputs and prompts confidential?", "ISO 27001 processes, NDAs, named pools, role-based access, audit trails, controlled environments and contract-defined retention protect client data."],
    ["Can you evaluate our model against a competitor's?", "Yes. Blind side-by-side comparison uses randomized response order with win-rate and dimension-level reporting."],
    ["How do we start?", "Share a sample set and evaluation goal for a free pilot, rubric draft and inter-rater agreement report."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation#service`, name: "RLHF & LLM Data Annotation Services", serviceType: "RLHF and LLM Data Annotation", url: `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "LLM and RLHF Data Services", itemListElement: services.map(([name]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "LLM & RLHF Data", item: `${SITE_URL}/ai-data-services/annotation-labeling/llm-rlhf-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true">
    <h1>RLHF &amp; LLM Data Annotation Services for Model Alignment</h1><p>eQOURSE builds preference rankings, SFT datasets, rubric evaluations, factuality checks, safety labels and red-team prompts with subject-matter experts across 30+ languages.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is RLHF and LLM Data Annotation?</h2><p>Reinforcement Learning from Human Feedback teaches a language model which responses people prefer. LLM annotation also creates instruction-response pairs, verifies factuality and citations, classifies safety and probes model failures.</p><h3>SFT, RLHF and DPO: What's the Difference?</h3><p>SFT teaches how to respond. RLHF and DPO teach which response is better using human preference pairs.</p><h3>Why Human Feedback Still Matters</h3><p>Qualified human reviewers catch specialist errors, cultural nuance and novel failures that synthetic feedback misses.</p></section>
    <section><h2>LLM Data Services We Deliver</h2>${services.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</section>
    <section><h2>Why Subject-Matter Experts Change the Result</h2><p>Technical fluency is not technical correctness. eQOURSE assigns trained annotators, senior reviewers or subject-matter experts according to the judgement required.</p></section>
    <section><h2>Expert Domains We Cover</h2><p>STEM and mathematics, education and pedagogy, medical and life sciences, legal and compliance, finance and business, software and code, linguistics and translation.</p></section>
    <section><h2>How an LLM Data Project Runs</h2><ol><li>Objective and task definition</li><li>Rubric design</li><li>Reviewer qualification</li><li>Calibration</li><li>Pilot batch</li><li>Production evaluation</li><li>Delivery and iteration</li></ol></section>
    <section><h2>Quality Control When There Is No Single Right Answer</h2><p>Inter-rater reliability, blind duplicates, gold sets, rubric anchors, adjudication, bias controls, rationale capture and agreement reporting.</p></section>
    <section><h2>Multilingual LLM Evaluation Across 30+ Languages</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, including romanised, transliterated and code-mixed input.</p></section>
    <section><h2>Data Formats and Delivery</h2><p>JSONL preference pairs, SFT chat arrays, rubric scores, conversation threads, agent traces, red-team results and custom schemas delivered securely.</p></section>
    <section><h2>Works With Your Evaluation Stack</h2><p>Projects can run in your platform, custom harness or client-controlled environment.</p></section>
    <section><h2>Security, IP and Confidentiality</h2><p>ISO-certified processes, NDAs, named reviewer pools, role-based access, audit trails, controlled retention and client IP assignment.</p></section>
    <section><h2>Engagement Models</h2><p>Managed evaluation, dedicated expert pools, continuous evaluation, surge capacity, and rubric and QA consulting.</p></section>
    <section><h2>What Determines RLHF and LLM Data Cost?</h2><p>Reviewer qualification, complexity, response length, rubric maturity, agreement target, language, turnaround and security tier.</p></section>
    <section><h2>Who We Build LLM Data For</h2><p>Foundation model teams, enterprise fine-tuning teams, RAG builders, AI agent teams, EdTech products and regulated industries.</p></section>
    <section><h2>Related AI Data Services</h2><p>Text &amp; NLP Annotation and Content Moderation pages are coming soon. <a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection for LLMs</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-services/annotation-labeling">All Annotation Services</a></p></section>
    <section><h2>See the Work</h2><p><a href="/ai-data-samples/rlhf">RLHF samples</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
    <section><h2>Why Choose eQOURSE for RLHF and LLM Data</h2><p>Subject-matter experts, rubric-first delivery, agreement reporting, Indic-language depth, named pools, a full AI data pipeline and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About RLHF &amp; LLM Data</h2>${faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Align Your Model With Expert Human Feedback</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  </main>`;
}

function buildImageAnnotationFallback() {
  const types = ["Bounding Box Annotation", "Rotated and Oriented Boxes", "Polygon and Polyline Annotation", "Semantic Segmentation", "Instance Segmentation", "Panoptic Segmentation", "Keypoint and Landmark Annotation", "Image Classification and Multi-label Tagging", "Attribute and Metadata Tagging", "Text Region Labeling in Images"];
  const faqs = [
    ["What is image annotation?", "Image annotation adds machine-readable boxes, outlines, masks, keypoints or class tags to still images so computer vision models can learn to recognise objects, shapes and scenes."],
    ["What is the difference between bounding box and polygon annotation?", "Bounding boxes mark approximate object location quickly. Polygons trace the actual outline and are used when shape matters."],
    ["What is the difference between semantic and instance segmentation?", "Semantic segmentation assigns pixels by class. Instance segmentation gives every object its own mask."],
    ["How do you measure image annotation quality?", "eQOURSE uses IoU scoring, gold sets, inter-annotator agreement, consensus, second-pass review and automated validation."],
    ["What output formats do you deliver?", "COCO JSON, YOLO, Pascal VOC, CVAT XML, PNG masks, RLE masks, JSON, CSV, TFRecord, Parquet and custom schemas."],
    ["How do we start?", "Share representative images, your label schema and accuracy target for a free pilot with a QA report."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation#service`, name: "Image Annotation Services", serviceType: "Computer Vision Image Annotation", url: `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Image Annotation Services", itemListElement: types.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Image Annotation", item: `${SITE_URL}/ai-data-services/annotation-labeling/image-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true">
    <h1>Image Annotation Services for Computer Vision and Visual AI</h1><p>Pixel-accurate annotation for object detection, segmentation, pose estimation and classification with documented edge-case rules and multi-tier quality review.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
    <section><h2>What Is Image Annotation?</h2><p>Image annotation adds machine-readable labels to still images. Boxes teach approximate location, masks teach exact shape, keypoints teach structure and image labels teach scene-level categories.</p><h3>Image Annotation vs. Image Labeling</h3><p>Labeling commonly means a whole-image class; annotation includes spatial boxes, polygons, masks and keypoints.</p><h3>Image Annotation vs. Image Data Collection</h3><p>Collection captures new images. Annotation structures images you already have. <a href="/ai-data-services/data-collection/image-data-collection">Explore Image Data Collection</a>.</p></section>
    <section><h2>Image Annotation Types We Deliver</h2>${types.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Guideline-led visual labels delivered to the geometry, class and attribute rules agreed in the pilot.</p></article>`).join("")}</section>
    <section><h2>Which Image Annotation Type Do You Need?</h2><p>Choose classification for image-level categories, boxes for detection, polygons for tight outlines, semantic masks for class areas, instance masks for separate objects, panoptic masks for complete scenes, and keypoints for pose or structure.</p><h3>Bounding Box or Polygon?</h3><p>Use boxes when location is enough and polygons when shape matters.</p><h3>Semantic or Instance Segmentation?</h3><p>Semantic masks map area by class; instance masks preserve separate objects.</p></section>
    <section><h2>Our Image Annotation Process</h2><ol><li>Sample review</li><li>Guideline authoring</li><li>Annotator calibration</li><li>Pilot batch</li><li>Production</li><li>Multi-tier QA</li><li>Delivery and iteration</li></ol></section>
    <section><h2>How We Keep Image Annotation Accurate</h2><p>IoU monitoring, gold sets, inter-annotator agreement, consensus, adjudication, second-pass review, automated geometry validation, class-balance reporting and pilot-defined acceptance criteria.</p></section>
    <section><h2>Occlusion, Truncation and the Cases That Break Datasets</h2><p>Written rules cover occlusion, truncation, crowds, small objects, ambiguous classes, reflections, poor exposure and overlapping instances.</p></section>
    <section><h2>Tools, Platforms and Output Formats</h2><p>COCO JSON, YOLO, Pascal VOC, CVAT XML, PNG and RLE masks, JSON, CSV, TFRecord, Parquet and custom schemas, with a manifest, QA report and versioned guideline.</p></section>
    <section><h2>Image Annotation Across Industries</h2><p>Automotive, retail, manufacturing, agriculture, healthcare, construction, security and <a href="/robotics-training-data-services">robotics</a>.</p></section>
    <section><h2>Model-Assisted Pre-Labeling</h2><p>Human reviewers can correct model suggestions while quality is measured against the same expert ground truth as manual work.</p></section>
    <section><h2>Data Security and Compliance</h2><p>ISO-certified processes, NDAs, role-based access, audit trails, secure environments, PII redaction and contract-defined retention.</p></section>
    <section><h2>What Determines Image Annotation Cost?</h2><p>Annotation type, object count, taxonomy complexity, precision target, scene density, QA tier, volume, expertise, turnaround and security.</p></section>
    <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/data-collection/image-data-collection">Image Data Collection</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning and Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-services/annotation-labeling">All Annotation Services</a></p></section>
    <section><h2>Why Choose eQOURSE for Image Annotation?</h2><p>Guideline-first delivery, measured quality, full-pipeline support, 500+ specialists, ISO-certified processes and a free pilot.</p></section>
    <section><h2>Frequently Asked Questions About Image Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
    <section><h2>Get Your Images Annotated for Production</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section>
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  </main>`;
}

function buildVideoAnnotationFallback() {
  const services = ["Object Tracking with Persistent IDs", "Frame-by-Frame Bounding Boxes", "Keyframe Annotation with Interpolation", "Video Instance Segmentation", "Action and Activity Recognition", "Temporal Event Segmentation", "Trajectory Annotation", "Pose and Skeletal Tracking", "Multi-Camera Re-Identification", "Video Classification"];
  const faqs = [
    ["What is video annotation?", "Video annotation labels objects, actions and events across frames so a model learns how things move and change over time while each object keeps a consistent identity."],
    ["What is the difference between video annotation and image annotation?", "Video annotation adds identity persistence, temporal consistency and annotation-frequency decisions across a sequence."],
    ["Do you annotate every frame?", "Usually not. Keyframe interpolation with human review is the default for many projects; the pilot compares two frequencies."],
    ["How do you measure video annotation quality?", "ID switch rate, track fragmentation, temporal consistency, interpolation verification, keyframe IoU, completeness audits and full-sequence review."],
    ["What output formats do you deliver?", "MOT Challenge, COCO-Video, CVAT XML, YOLO, Pascal VOC, JSON, CSV, PNG masks, SRT, VTT and custom schemas."],
    ["How do we start?", "Share two to five representative minutes, the class list and accuracy target for a free pilot with track-level metrics."],
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation#service`, name: "Video Annotation Services", serviceType: "Video Annotation and Labeling", url: `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation`, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Video Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Video Annotation", item: `${SITE_URL}/ai-data-services/annotation-labeling/video-annotation` }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true"><h1>Video Annotation Services for Object Tracking and Video AI</h1><p>Frame-accurate tracking with persistent identities, precise action boundaries and a measured annotation frequency.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Video Annotation?</h2><p>Video annotation labels objects, actions and events across a sequence while preserving identity through occlusion and re-entry.</p><h3>Video Annotation vs. Image Annotation</h3><p>Video adds identity persistence, temporal consistency and annotation frequency. <a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation Services</a> cover independent frames.</p><h3>Video Annotation vs. Video Data Collection</h3><p>Collection captures footage; annotation labels existing footage. <a href="/ai-data-services/data-collection/video-data-collection">Video Data Collection Services</a></p></section>
  <section><h2>Video Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Guideline-led temporal labels delivered to the identity, geometry and boundary rules agreed in the pilot.</p></article>`).join("")}</section>
  <section><h2>How Many Frames Do You Actually Need Annotated?</h2><p>Every frame, every nth frame, keyframe plus interpolation, adaptive frequency and event-triggered labeling offer different cost and accuracy trade-offs.</p><h3>How We Recommend a Frequency</h3><p>We annotate one clip at two frequencies and measure the positional accuracy difference.</p></section>
  <section><h2>Our Video Annotation Process</h2><ol><li>Sample review</li><li>Guidelines</li><li>Frequency calibration</li><li>Annotator calibration</li><li>Pilot</li><li>Production with temporal QA</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure Video Annotation Quality</h2><p>ID switch rate, fragmentation, temporal consistency, interpolation checks, keyframe IoU, completeness, gold clips, full-sequence review and automated validation.</p></section>
  <section><h2>The Hard Part: Keeping Identity Through Occlusion</h2><p>Versioned rules cover occlusion, re-entry, crowd ambiguity, camera cuts, fast motion, partial entry, drift and static objects.</p></section>
  <section><h2>Tools, Platforms and Output Formats</h2><p>MOT, COCO-Video, CVAT, YOLO, Pascal VOC, JSON, CSV, masks, SRT, VTT and custom schemas with track-level QA reports.</p></section>
  <section><h2>Video Annotation Across Industries</h2><p>Automotive, retail, sports, manufacturing, security, healthcare, <a href="/robotics-training-data-services">robotics</a> and agriculture.</p></section>
  <section><h2>Model-Assisted Tracking</h2><p>Pre-generated tracks receive human full-sequence correction and the same ground-truth measurement as manual work.</p></section>
  <section><h2>Data Security and Compliance</h2><p>ISO-certified processes, NDAs, controlled access, redaction, audit trails and contract-defined deletion.</p></section>
  <section><h2>What Determines Video Annotation Cost?</h2><p>Frequency, method, objects, frame rate, motion, occlusion, track duration, QA, turnaround and security.</p></section>
  <section><h2>Related AI Data Services</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/data-collection/video-data-collection">Video Data Collection</a> <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a></p></section>
  <section><h2>Why Choose eQOURSE for Video Annotation?</h2><p>Track-level metrics, measured frequency, full-sequence review, guideline-first delivery, 500+ specialists and ISO-certified processes.</p></section>
  <section><h2>Frequently Asked Questions About Video Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Get Your Video Annotated for Production</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildDocumentOcrAnnotationFallback() {
  const services = ["Document Layout and Region Annotation", "Key-Value Pair Extraction", "Table Structure Recognition", "Line-Item Extraction", "Form Field and Checkbox Annotation", "Handwriting Transcription", "Signature, Stamp and Seal Detection", "Document Classification and Multi-Page Splitting", "Reading Order Annotation", "Entity Extraction in Documents", "PII Identification and Redaction Marking", "OCR Ground-Truth Transcription"];
  const faqs = [
    ["What is document annotation?", "Document annotation labels document structure and meaning, including fields, tables, reading order and document boundaries."],
    ["What is the difference between OCR and document annotation?", "OCR converts pixels into characters. Document annotation adds field relationships, table structure and reading order."],
    ["How do you handle borderless tables?", "Rows, columns, headers, merged cells and spanning cells are represented explicitly and scored at cell level."],
    ["Can you handle handwritten documents?", "Yes. Handwriting is transcribed at line or word level with confidence flags for ambiguous or illegible content."],
    ["What output formats do you deliver?", "JSON, JSONL, hOCR, ALTO XML, PAGE XML, FUNSD, DocVQA, CoNLL, COCO regions, CSV, Excel, searchable PDF and custom schemas."],
    ["How do we start?", "Share representative documents and the extraction schema for a pilot with field-level quality reporting."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/document-ocr-annotation`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "Document & OCR Annotation Services", serviceType: "Document and OCR Annotation", url, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Document and OCR Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Document & OCR Annotation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  return `<main data-seo-prerender="true"><h1>Document &amp; OCR Annotation Services for Document AI and IDP</h1><p>Layout regions, key-value pairs, table structure, handwriting and form fields built on publishing and digital-conversion expertise.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Document &amp; OCR Annotation?</h2><p>Document annotation teaches models what text says, where it sits and how it relates structurally. OCR ground truth measures character recognition; document annotation adds fields, tables and reading order.</p></section>
  <section><h2>Document Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Position-aware labels produced to a versioned schema and field-level acceptance target.</p></article>`).join("")}</section>
  <section><h2>Document Types We Work With</h2><p>Invoices, receipts, KYC, claims, contracts, trade paperwork, medical forms, transcripts, mark sheets and archival records.</p></section>
  <section><h2>Document Structure Is Already Our Core Business</h2><p>Publishing production, <a href="/digital-conversion">Digital Conversion</a>, <a href="/image-processing">Image Processing</a>, <a href="/metadata-services">Metadata Services</a> and <a href="/editorial-publishing-designing-services">Editorial &amp; Publishing</a> establish eQOURSE's page-structure expertise.</p></section>
  <section><h2>Our Document Annotation Process</h2><ol><li>Sample and schema review</li><li>Guideline authoring</li><li>Template coverage mapping</li><li>Team calibration</li><li>Pilot batch</li><li>Production with field-level QA</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure Document Annotation Quality</h2><p>Per-field accuracy, CER and WER, table-cell accuracy, normalisation checks, gold documents, double-entry and template audits.</p></section>
  <section><h2>Tables, Handwriting and the Problems That Break Document Pipelines</h2><p>Versioned rulings cover borderless tables, mixed handwriting, complex reading order and multi-page document boundaries.</p></section>
  <section><h2>Handling Sensitive Documents</h2><p>PII classification, masking, pseudonymisation, restricted environments, vetted teams, audit trails and contract-defined deletion.</p></section>
  <section><h2>Output Formats and Delivery</h2><p>JSON, hOCR, ALTO XML, PAGE XML, FUNSD, DocVQA, CoNLL, COCO regions, CSV, Excel, searchable PDF and custom schemas.</p></section>
  <section><h2>OCR-Assisted Annotation</h2><p>Human correction accelerates clean printed documents; manual transcription replaces pre-fill where it reduces accuracy. OCR ground truth remains independent.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/cleaning-validation">Cleaning and Validation</a> <a href="/ai-data-samples">Annotation samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About Document &amp; OCR Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Build the Training Data Behind Your Document AI</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildPointCloudLidarAnnotationFallback() {
  const services = ["3D Cuboid Annotation","Point-Level Semantic Segmentation","3D Instance Segmentation","Multi-Sweep Object Tracking","Camera-LiDAR Sensor Fusion","Radar and Multi-Sensor Fusion","3D Lane and Road Marking","Drivable and Free Space","Ground and Surface Classification","3D Keypoints and Pose","Occupancy Grid Labeling","Aerial and Survey Point Clouds"];
  const faqs = [
    ["What is 3D point cloud annotation?","3D point cloud annotation labels LiDAR or depth-sensor data through oriented cuboids, point classes, surfaces and persistent tracks."],
    ["What is the difference between a 3D cuboid and a 2D bounding box?","A 3D cuboid adds physical position, dimensions and yaw to the image-plane location represented by a 2D box."],
    ["Why does calibration matter for 3D annotation?","Incorrect extrinsic calibration makes correct geometry project incorrectly into a camera view. Calibration must be validated before production."],
    ["How do you measure 3D annotation quality?","We report 3D IoU plus translation, dimension and heading error separately, track consistency, fusion agreement and accuracy by distance band."],
    ["What formats do you support?","Inputs include PCD, LAS or LAZ, PLY, KITTI BIN, ROS bag and E57; outputs include KITTI, nuScenes, Waymo-style, SUSTechPOINTS and custom schemas."],
    ["How do we start?","Share 20 to 50 difficult frames, calibration files and your schema for a measured pilot."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"3D Point Cloud & LiDAR Annotation Services",serviceType:"3D Point Cloud and LiDAR Annotation",url,description:"3D point cloud and LiDAR annotation for autonomous systems and robotics with calibration validation and component-level geometric QA.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",hasOfferCatalog:{"@type":"OfferCatalog",name:"3D Point Cloud and LiDAR Annotation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"3D Point Cloud & LiDAR Annotation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>3D Point Cloud &amp; LiDAR</span></nav><h1>3D Point Cloud &amp; LiDAR Annotation Services for Autonomous Systems</h1><p>3D cuboids, point segmentation, multi-sweep tracking and camera-LiDAR fusion delivered with calibration validation and component-level geometric QA.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is 3D Point Cloud &amp; LiDAR Annotation?</h2><p>Annotation gives sparse sensor geometry meaning through objects, surfaces, drivable regions and tracks. A 3D cuboid records x, y and z position, physical dimensions and heading.</p><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> and <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> cover 2D-only work.</p></section>
  <section><h2>3D Annotation Types We Deliver</h2>${services.map(name=>`<article><h3>${escapeHtml(name)}</h3><p>Spatial labels delivered to a versioned coordinate and geometry specification.</p></article>`).join("")}</section>
  <section><h2>Fusion Is a Calibration Problem Before Annotation Begins</h2><p>We validate extrinsics, temporal synchronisation, ego-motion compensation, intrinsic distortion and long-capture drift before production. Projection agreement separates calibration error from annotation error.</p></section>
  <section><h2>Our 3D Annotation Process</h2><ol><li>Sensor review and calibration validation</li><li>Schema and guideline authoring</li><li>Annotator qualification</li><li>Pilot with geometric metrics</li><li>Production annotation</li><li>Multi-tier 3D and projection review</li><li>Delivery and iteration</li></ol></section>
  <section><h2>How We Measure 3D Annotation Quality</h2><p>3D IoU, translation error, dimensions, heading, ID switches, fragmentation, fusion projection agreement, point inclusion, ground-plane consistency and distance-band reporting.</p></section>
  <section><h2>What the Sensor Can and Cannot Tell You</h2><p>Minimum point thresholds, occlusion rules, weather artefacts, reflective surfaces, ground ambiguity, heading ambiguity and sensor-specific density are documented before scale. Unsupported geometry is flagged rather than invented.</p></section>
  <section><h2>Output Formats and Delivery</h2><p>PCD, LAS, LAZ, PLY, KITTI BIN, ROS bag and E57 inputs; KITTI, nuScenes, Waymo-style, SUSTechPOINTS, JSON, point-wise labels, CSV cuboids and custom outputs with coordinate conventions confirmed in the pilot.</p></section>
  <section><h2>Where 3D Annotation Is Used</h2><p>Autonomous vehicles, ADAS, warehouse robotics, drones, surveying, construction, mining, agriculture, smart cities and rail. Explore <a href="/robotics-training-data-services">Robotics Training Data Services</a>.</p></section>
  <section><h2>Model-Assisted Annotation, Security and Cost</h2><p>Pre-generation is measured by distance-band recall and avoided where it biases rare, far-field or benchmark data. Secure projects use vetted access, audit trails and defined retention. Cost depends on label type, objects, density, tracking, fusion, thresholds and scene difficulty.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/data-collection">AI Data Collection</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/ai-data-samples/computer-vision">Computer vision samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About 3D &amp; LiDAR Annotation</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Annotate Your Sensor Data for Production Perception</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildAudioSpeechAnnotationFallback() {
  const services = ["Verbatim Transcription", "Clean and Normalised Transcription", "Timestamping and Segmentation", "Forced Alignment", "Speaker Diarization", "Speaker Identification and Voice Matching", "Language and Dialect Identification", "Emotion and Tone Labeling", "Acoustic Event Classification", "Phonetic Transcription", "Wake Word and Keyword Spotting", "Voice Intent and Slot Labeling", "Audio Quality Rating", "TTS Data QC and Prosody Review"];
  const faqs = [
    ["What is audio annotation?", "Audio annotation turns recorded sound into structured data: what was said, who said it, when and how they said it, and which non-speech sounds were present."],
    ["What is the difference between verbatim and clean transcription?", "Verbatim preserves fillers, false starts and stutters. Clean transcription removes disfluencies and normalises numbers and dates."],
    ["What is speaker diarization?", "Speaker diarization determines who spoke when and maintains consistent speaker identities through overlap and interruption."],
    ["How do you measure speech annotation quality?", "We report WER, DER, timestamp accuracy, speaker consistency, style-guide conformance, hidden gold clips and second-pass listening review."],
    ["Do you handle Indian regional languages, accents and code-switched speech?", "Yes. Alongside global-language delivery, our India-wide coverage includes regional languages, regional Indian English, dialects, mixed-language speech, register and lower-resource varieties."],
    ["Which languages do you support?", "We support 30+ global languages, with comprehensive coverage across India's regional languages, accents, dialects and code-switched speech."],
    ["How do we start?", "Share 30 to 60 minutes of representative difficult audio and your style requirements for a measured pilot and throughput estimate."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/audio-speech-annotation`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: "Audio & Speech Annotation Services", serviceType: "Audio and Speech Annotation", description: "Multilingual audio and speech annotation across 30+ global languages, with comprehensive Indian regional-language, accent and code-switching coverage.", url, provider: { "@type": "Organization", name: "eQOURSE", url: `${SITE_URL}/` }, areaServed: "Worldwide", availableLanguage: ["en","es","fr","de","pt","ar","zh","ja","ko","id","ms","th","vi","hi","bn","ta","te","mr","gu","kn","ml","pa","or","as","ur"], hasOfferCatalog: { "@type": "OfferCatalog", name: "Audio and Speech Annotation Services", itemListElement: services.map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "AI Data Services", item: `${SITE_URL}/ai-data-services` }, { "@type": "ListItem", position: 3, name: "Data Annotation & Labeling", item: `${SITE_URL}/ai-data-services/annotation-labeling` }, { "@type": "ListItem", position: 4, name: "Audio & Speech Annotation", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>Audio &amp; Speech Annotation</span></nav><h1>Audio &amp; Speech Annotation Services for Voice AI and ASR</h1><p>Transcription, speaker diarization, timing, emotion, acoustic events and phonetic labeling across 30+ global languages, with comprehensive Indian regional-language coverage.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p>
  <section><h2>What Is Audio &amp; Speech Annotation?</h2><p>Audio annotation turns recorded sound into machine-readable data: what was said, who said it, when they said it, how they said it and what else was audible.</p><p><a href="/ai-data-services/data-collection/audio-data-collection">Audio Data Collection</a> creates the recording; <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation</a> adds meaning after transcription.</p></section>
  <section><h2>Audio &amp; Speech Annotation Types We Deliver</h2>${services.map(name => `<article><h3>${escapeHtml(name)}</h3><p>Native-listener labels delivered to a versioned speech style guide.</p></article>`).join("")}</section>
  <section><h2>Choose Verbatim or Clean Before Annotation Starts</h2><p>Verbatim preserves fillers, false starts, repetitions and stutters for ASR. Clean transcription normalises spoken language for search, subtitles and readable archives.</p></section>
  <section><h2>Our Audio Annotation Process</h2><ol><li>Sample and use-case review</li><li>Style guide and schema</li><li>Native-listener calibration</li><li>Pilot and error analysis</li><li>Production annotation</li><li>Listening QA and adjudication</li><li>Secure delivery and iteration</li></ol></section>
  <section><h2>Speech Annotation Quality You Can Measure</h2><p>Raw and normalised word error rate, character error rate, diarization error rate, timestamp tolerance, speaker consistency, blind gold clips and second-pass listening review.</p></section>
  <section><h2>Global Language Coverage with India's Regional Depth</h2><p>We support 30+ global languages across European, Asian and Middle Eastern markets. Our specialist advantage is comprehensive coverage across India's regional languages, accents, dialects and code-switched speech.</p></section>
  <section><h2>Formats, Audio Handling and Use Cases</h2><p>JSON, JSONL, RTTM, CTM, TextGrid, SRT, VTT, Kaldi, Hugging Face, ELAN EAF, CSV, TSV and custom schemas for ASR, call analytics, TTS, healthcare, acoustic events and accessibility.</p><p><a href="/subtitling-services">Subtitling Services</a> <a href="/accessible-media-enhancements">Accessible Media Enhancements</a></p></section>
  <section><h2>ASR Assistance, Voice Security and Cost</h2><p>Machine transcription is used only where it improves throughput and every assisted batch receives listening review. Voice data uses controlled access, audit trails, PII controls and contract-defined retention.</p><h3>Real-time ratio planning ranges</h3><p>Clean single-speaker audio is commonly 2 to 4 times real time; structured multi-speaker audio 4 to 8 times; difficult overlap, accents and word timing may exceed 10 times. A pilot confirms the actual ratio.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a> <a href="/ai-data-samples/audio-speech">Audio samples</a> <a href="/casestudy">Case studies</a></p></section>
  <section><h2>Frequently Asked Questions About Audio &amp; Speech Annotation</h2>${faqs.map(([q,a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section>
  <section><h2>Turn Your Audio Into Model-Ready Speech Data</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></main>`;
}

function buildContentModerationFallback() {
  const services = ["Text and Comment Moderation", "Image Moderation", "Video Moderation", "Audio Moderation", "Profile and Identity Review", "Marketplace and Listing Moderation", "Spam, Scam and Fraud Detection", "Brand Safety and Ad Review", "Appeals and Escalation Review", "Policy Taxonomy Design", "Multilingual Content Moderation"];
  const faqs = [
    ["What is content moderation?", "Content moderation reviews user-generated content against platform policy and decides whether to leave, restrict, remove or escalate it."],
    ["What types of content can eQOURSE moderate?", "Text, images, video, audio, profiles, listings, advertising creative, spam, scam and fraud across 30+ languages."],
    ["What is the difference between content moderation and building a moderation model?", "Training a classifier is a finite annotation project. Running a live policy queue is an ongoing operation with coverage, latency and escalation commitments."],
    ["Why are human moderators needed?", "People handle uncertain, context-dependent, novel and appealed cases while automation handles confident high-volume decisions."],
    ["How do you protect moderator wellbeing?", "Safeguards include exposure limits, queue rotation, proactive confidential clinical support, exposure-reducing tools, informed consent and the right to step away."],
    ["How is moderation quality measured?", "False positives and false negatives are separated, with per-category precision and recall, borderline agreement, appeal overturn rate, hidden gold cases and SLA latency."],
    ["What is a severity tier?", "Severity tiers distinguish intensity within a policy category and map each category-tier pair to a proportionate action."],
    ["Do you handle child sexual abuse material?", "No. eQOURSE does not accept CSAM review or classification work. Specialist legally structured organisations and relevant authorities must handle it."],
    ["Can you moderate in languages other than English?", "Yes. Native-language moderation is available across 30+ global languages with India-wide regional-language, dialect and code-mixed depth."],
    ["Can you provide 24/7 coverage?", "Yes. Coverage can be designed for business hours, extended hours or 24/7 operations with severity-based latency targets."],
    ["Can you help write a content policy?", "Yes. We design and stress-test categories, severity tiers, action mapping, context modifiers and worked examples."],
    ["How much does content moderation cost?", "Cost depends on volume, content type, complexity, severity, coverage, latency, languages, appeals, policy maturity and security."],
  ];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/content-moderation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"Content Moderation & Trust and Safety Services",serviceType:"Content Moderation and Trust and Safety",url,description:"Human content moderation with severity-tiered policy enforcement, appeals, multilingual context and moderator wellbeing safeguards.",provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",availableLanguage:["en","hi","bn","ta","te","mr","gu","kn","ml","pa","or","as","ur","es","fr","de","pt","ar","zh","ja","ko","id","th","vi"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Content Moderation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"Content Moderation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/ai-data-services">AI Data Services</a> / <a href="/ai-data-services/annotation-labeling">Data Annotation &amp; Labeling</a> / <span>Content Moderation</span></nav><h1>Content Moderation &amp; Trust and Safety Services</h1><p>Human moderation across text, image, video and audio with severity-tiered policy enforcement, appeals and escalation in 30+ languages.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Trust &amp; Safety Specialist</a></p>
  <section><h2>What Is Content Moderation?</h2><p>Content moderation reviews user-generated content against written policy and applies proportionate action. Automation handles confident volume; people handle the uncertain middle, context, novel patterns and appeals.</p><p>For classifier data use <a href="/ai-data-services/annotation-labeling/text-nlp-annotation">Text &amp; NLP Annotation Services</a>. For model-output safety evaluation use <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation Services</a>.</p></section>
  <section><h2>Content Moderation Services We Deliver</h2>${services.map(name=>`<article><h3>${escapeHtml(name)}</h3><p>Policy-led decisions with severity, context and escalation recorded.</p></article>`).join("")}</section>
  <section><h2>Binary Safe or Unsafe Is Not a Policy</h2><p>A working taxonomy includes category definitions, severity tiers, action mapping, confidence handling, context modifiers, repeat-behaviour rules and jurisdictional annexes. It is stress-tested on real samples before launch.</p></section>
  <section><h2>How We Protect the People Doing This Work</h2><p>Exposure limits, queue rotation, proactive confidential clinical support, exposure-reducing tools, a right to step away, informed consent, peer debriefs and trained supervisors are built into the operation.</p></section>
  <section><h2>Where Humans Belong in a Moderation Stack</h2><p>People review the classifier decision boundary, context-dependent speech, novel harm patterns and appeals. Moderator decisions can improve automation over time.</p></section>
  <section><h2>How We Set Up a Moderation Operation</h2><ol><li>Policy and volume review</li><li>Taxonomy and action mapping</li><li>Safeguarded queue design</li><li>Moderator selection and training</li><li>Calibration and pilot</li><li>Production operation</li><li>Policy iteration</li></ol></section>
  <section><h2>How Moderation Quality Is Measured</h2><p>False positives and false negatives are separated, with per-category precision and recall, borderline agreement, appeal overturn rate, hidden gold cases, senior adjudication and severity-based SLA latency.</p></section>
  <section><h2>Moderation Needs Local Context, Not Just Translation</h2><p>Native reviewers cover 30+ global languages with comprehensive depth across Indian regional languages, code-mixed text, dialect and regional context.</p></section>
  <section><h2>Appeals and Escalation</h2><p>Independent second review, captured reasoning, named escalation paths, overturn analysis and transparency-ready records.</p></section>
  <section><h2>Work We Decline</h2><p>eQOURSE does not accept CSAM review or classification, extremist content review at scale, unsafe queue configurations, moderation without written policy or sole authority for legally consequential outcomes.</p></section>
  <section><h2>Integration, Security and Coverage</h2><p>Work runs in client or managed tooling with role-based access, audited decisions, ISO-certified processes and business-hours, extended-hours or 24/7 coverage.</p></section>
  <section><h2>Related Services and Proof</h2><p><a href="/ai-data-services/annotation-labeling/image-annotation">Image Annotation</a> <a href="/ai-data-services/annotation-labeling/video-annotation">Video Annotation</a> <a href="/ai-data-services/model-testing">AI Model Testing</a> <a href="/casestudy">Case studies</a> <a href="/clients-testimonials">Client testimonials</a></p></section>
  <section><h2>Frequently Asked Questions About Content Moderation</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><section><h2>Build a Moderation Operation That Holds Up</h2><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Trust &amp; Safety Specialist</a></p></section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildTextNlpAnnotationFallback() {
  const services = ["Named Entity Recognition", "Nested and Overlapping Entities", "Relation Extraction", "Coreference Resolution", "Text Classification", "Sentiment and Aspect Sentiment", "Intent and Slot Filling", "Part-of-Speech and Syntax", "Text Span Extraction", "Search Relevance", "Machine Translation Post-Editing", "Semantic Similarity and RAG Quality"];
  const faqs = [["What is text annotation?", "Text annotation adds structured meaning to written language so models can learn entities, sentiment, intent, relations and categories."], ["Do you support Indic and code-mixed text?", "Yes. Native reviewers handle Hinglish, romanised Indic, script switching, dialect and register across 30+ languages."], ["How do you measure quality?", "We report inter-annotator agreement, span F1, boundary agreement, blind duplicates and expert-adjudicated gold sets."], ["How do we start?", "Share a representative sample and taxonomy, or ask eQOURSE to design one, for a pilot and agreement report."]];
  const url = `${SITE_URL}/ai-data-services/annotation-labeling/text-nlp-annotation`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","@id":`${url}#service`,name:"Text & NLP Annotation Services",serviceType:"Text and NLP Annotation",url,provider:{"@type":"Organization",name:"eQOURSE",url:`${SITE_URL}/`},areaServed:"Worldwide",hasOfferCatalog:{"@type":"OfferCatalog",name:"Text and NLP Annotation Services",itemListElement:services.map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"AI Data Services",item:`${SITE_URL}/ai-data-services`},{"@type":"ListItem",position:3,name:"Data Annotation & Labeling",item:`${SITE_URL}/ai-data-services/annotation-labeling`},{"@type":"ListItem",position:4,name:"Text & NLP Annotation",item:url}]},{"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]};
  return `<main data-seo-prerender="true"><h1>Text &amp; NLP Annotation Services for Language AI</h1><p>Build NLP, search, chatbot and LLM training data across 30+ languages with native reviewers, Indic and code-mixed coverage, and measured agreement.</p><p><a href="/free-pilot">Start Free Pilot</a> <a href="/contact-us">Talk to a Data Specialist</a></p><section><h2>What Is Text &amp; NLP Annotation?</h2><p>Text annotation adds structured meaning to written language. If position matters, use <a href="/ai-data-services/annotation-labeling/document-ocr-annotation">Document &amp; OCR Annotation</a>. To judge model output, use <a href="/ai-data-services/annotation-labeling/llm-rlhf-annotation">LLM &amp; RLHF Annotation</a>.</p></section><section><h2>Text Annotation Types We Deliver</h2>${services.map(x=>`<article><h3>${escapeHtml(x)}</h3><p>Taxonomy-tested labels delivered with measured quality.</p></article>`).join("")}</section><section><h2>The Label Set Matters More Than the Annotator Count</h2><p>We test mutual exclusivity, exhaustiveness, learnability, boundary rules, granularity and real-corpus grounding before scale.</p></section><section><h2>Our Text Annotation Process</h2><ol><li>Corpus review</li><li>Taxonomy stress-test</li><li>Guidelines</li><li>Calibration</li><li>Pilot</li><li>Production and QA</li><li>Delivery and iteration</li></ol></section><section><h2>Quality You Can Measure</h2><p>Cohen's kappa, Krippendorff's alpha, strict and relaxed span F1, boundary agreement, blind duplicates, gold sets and adjudication.</p></section><section><h2>Indic and Code-Mixed Language Annotation</h2><p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, plus 18 more languages.</p></section><section><h2>Related Services</h2><p><a href="/ai-data-services/data-collection/text-data-collection">Text Data Collection</a> <a href="/translation-services">Translation Services</a> <a href="/localization-services">Localization Services</a> <a href="/ai-data-services/cleaning-validation">Data Cleaning &amp; Validation</a></p></section><section><h2>Frequently Asked Questions</h2>${faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</section><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script></main>`;
}

function buildCrawlFallback({ path, title, description, crawlHtml = "", source }) {
  if (path === "/ai-data-services/data-collection") return buildDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/image-data-collection") return buildImageDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/audio-data-collection") return buildAudioDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/text-data-collection") return buildTextDataCollectionFallback();
  if (path === "/ai-data-services/data-collection/video-data-collection") return buildVideoDataCollectionFallback();
  if (path === "/ai-data-services/annotation-labeling") return buildAnnotationLabelingFallback();
  if (path === "/ai-data-services/annotation-labeling/llm-rlhf-annotation") return buildLlmRlhfFallback();
  if (path === "/ai-data-services/annotation-labeling/image-annotation") return buildImageAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/video-annotation") return buildVideoAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/document-ocr-annotation") return buildDocumentOcrAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/text-nlp-annotation") return buildTextNlpAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/audio-speech-annotation") return buildAudioSpeechAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation") return buildPointCloudLidarAnnotationFallback();
  if (path === "/ai-data-services/annotation-labeling/content-moderation") return buildContentModerationFallback();
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

  const article = crawlHtml
    ? `<article data-cms-source="${escapeHtml(source || "article")}">${crawlHtml}</article>`
    : "";

  return `<main data-seo-prerender="true">
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(description)}</p>
      ${article}
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

function buildHead(template, entry) {
  const { path, title, description, canonical: canonicalOverride, ogType = "website", image = OG_IMAGE } = entry;
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
    `<div id="root">${buildCrawlFallback(entry)}</div>`,
  );
}

function buildCmsShell(template) {
  return template
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]*\bname="(?:description|keywords)"[^>]*>\s*/gi, "")
    .replace(/<link[^>]*\brel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>');
}

async function fetchCmsItems(resource) {
  const url = `${CMS_API_BASE}/api/${resource}?limit=1000`;
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(Number(process.env.CMS_SEO_TIMEOUT_MS) || 60000),
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
      crawlHtml: blog.bodyFormat === "html"
        ? `<p>${escapeHtml(plainTextFromHtml(blog.body))}</p>`
        : renderMarkdownForSeo(blog.body),
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
      crawlHtml: [
        ["Challenge", study.challenge],
        ["Solution", study.solution],
        ["Results", study.results],
      ].filter(([, content]) => content?.trim()).map(([heading, content]) => (
        `<section><h2>${heading}</h2>${renderMarkdownForSeo(content)}</section>`
      )).join(""),
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

  // Unknown/new CMS routes use a metadata-empty SPA shell rather than the
  // homepage's title, description and canonical. Known published routes below
  // still receive complete server-readable metadata and article content.
  writeFileSync(join(distDir, "cms-shell.html"), buildCmsShell(template), "utf-8");

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
    JSON.stringify(entries.map(({ crawlHtml, ...entry }) => entry), null, 2),
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
