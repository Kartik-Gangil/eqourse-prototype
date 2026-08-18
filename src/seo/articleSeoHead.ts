export interface ArticleSeoConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  author?: string;
  publishedAt?: string;
  modifiedAt?: string;
  schema?: Record<string, unknown>;
}

const MANAGED_SELECTORS = [
  "head > title",
  'head > meta[name="description"]',
  'head > meta[name="keywords"]',
  'head > link[rel="canonical"]',
  'head > meta[property^="og:"]',
  'head > meta[name^="twitter:"]',
  'head > meta[property^="article:"]',
  'head > script[data-cms-seo-schema="true"]',
];

function removeAll(documentRef: Document) {
  documentRef.querySelectorAll(MANAGED_SELECTORS.join(",")).forEach((node) => node.remove());
}

function appendMeta(documentRef: Document, key: "name" | "property", value: string, content: string) {
  const element = documentRef.createElement("meta");
  element.setAttribute("data-cms-seo", "true");
  element.setAttribute(key, value);
  element.content = content;
  documentRef.head.appendChild(element);
}

/**
 * CMS pages can initially receive the SPA/homepage shell before their API data
 * loads. Helmet cannot reliably claim metadata emitted by a different static
 * document, so it may append the article values beside the shell values.
 *
 * CMS articles therefore take exclusive ownership of every singleton SEO tag:
 * remove every existing candidate first, then add exactly one admin-sourced
 * value. This is deliberately independent of the server publishing path, so a
 * newly created or edited article is still correct after client hydration even
 * if a proxy/cache temporarily serves the generic SPA shell.
 */
export function applyArticleSeo(documentRef: Document, config: ArticleSeoConfig) {
  removeAll(documentRef);

  const title = documentRef.createElement("title");
  title.setAttribute("data-cms-seo", "true");
  title.textContent = config.title;
  documentRef.head.appendChild(title);

  appendMeta(documentRef, "name", "description", config.description);
  if (config.keywords?.length) appendMeta(documentRef, "name", "keywords", config.keywords.join(", "));

  const canonical = documentRef.createElement("link");
  canonical.setAttribute("data-cms-seo", "true");
  canonical.rel = "canonical";
  canonical.href = config.canonical;
  documentRef.head.appendChild(canonical);

  appendMeta(documentRef, "property", "og:type", "article");
  appendMeta(documentRef, "property", "og:site_name", "eQOURSE");
  appendMeta(documentRef, "property", "og:title", config.title);
  appendMeta(documentRef, "property", "og:description", config.description);
  appendMeta(documentRef, "property", "og:url", config.canonical);
  if (config.image) appendMeta(documentRef, "property", "og:image", config.image);
  if (config.imageAlt) appendMeta(documentRef, "property", "og:image:alt", config.imageAlt);
  if (config.author) appendMeta(documentRef, "property", "article:author", config.author);
  if (config.publishedAt) appendMeta(documentRef, "property", "article:published_time", config.publishedAt);
  if (config.modifiedAt) appendMeta(documentRef, "property", "article:modified_time", config.modifiedAt);

  appendMeta(documentRef, "name", "twitter:card", "summary_large_image");
  appendMeta(documentRef, "name", "twitter:title", config.title);
  appendMeta(documentRef, "name", "twitter:description", config.description);
  if (config.image) appendMeta(documentRef, "name", "twitter:image", config.image);
  if (config.imageAlt) appendMeta(documentRef, "name", "twitter:image:alt", config.imageAlt);

  if (config.schema) {
    const script = documentRef.createElement("script");
    script.setAttribute("data-cms-seo", "true");
    script.setAttribute("data-cms-seo-schema", "true");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(config.schema).replace(/</g, "\\u003c");
    documentRef.head.appendChild(script);
  }

  return () => {
    documentRef.querySelectorAll('[data-cms-seo="true"]').forEach((node) => node.remove());
  };
}

