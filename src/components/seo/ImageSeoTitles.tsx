import { useLayoutEffect } from "react";

const cleanText = (value: string | null | undefined) => value?.replace(/\s+/g, " ").trim() || "";

const titleFromSource = (image: HTMLImageElement): string => {
  try {
    const url = new URL(image.currentSrc || image.src, window.location.href);
    const faviconDomain = url.searchParams.get("domain");
    if (faviconDomain) return `${faviconDomain.replace(/^www\./, "")} logo`;

    const filename = decodeURIComponent(url.pathname.split("/").pop() || "")
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/-[A-Za-z0-9_-]{8,}$/i, "")
      .replace(/[-_]+/g, " ")
      .trim();

    if (filename && !/^(image|img|photo|picture|favicon)$/i.test(filename)) {
      return filename.replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
  } catch {
    // Data/blob URLs and malformed third-party URLs fall through to context.
  }

  return "eQOURSE image";
};

const contextualTitle = (image: HTMLImageElement): string => {
  const alt = cleanText(image.getAttribute("alt"));
  if (alt) return alt;

  const ariaLabel = cleanText(image.getAttribute("aria-label"));
  if (ariaLabel) return ariaLabel;

  const figureCaption = cleanText(image.closest("figure")?.querySelector("figcaption")?.textContent);
  if (figureCaption) return figureCaption;

  const container = image.closest("article, section, a, li");
  const heading = cleanText(container?.querySelector("h1, h2, h3, h4, h5, h6")?.textContent);
  if (heading) return heading;

  return titleFromSource(image);
};

const ensureImageTitle = (image: HTMLImageElement) => {
  if (cleanText(image.getAttribute("title"))) return;
  image.setAttribute("title", contextualTitle(image));
  image.dataset.autoImageTitle = "true";
};

/**
 * Covers static, API-driven, and markdown/HTML images. Explicit titles win;
 * missing titles inherit the existing alt text, nearby context, or filename.
 */
const ImageSeoTitles = () => {
  useLayoutEffect(() => {
    const scan = (root: ParentNode) => root.querySelectorAll<HTMLImageElement>("img").forEach(ensureImageTitle);
    scan(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) {
          ensureImageTitle(mutation.target);
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) ensureImageTitle(node);
          if (node instanceof Element) scan(node);
        });
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["alt", "src", "title"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ImageSeoTitles;
