import { defineConfig, type IndexHtmlTransformContext, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { normalisePath, pageSeo } from "./src/seo/pageSeo";

const SITE_URL = "https://www.eqourse.com";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Vite serves index.html for every SPA route in development. Without this
 * transform, SEO tools see the homepage metadata in the raw response and the
 * correct route metadata after React mounts, which they report as duplicate
 * SSR/CSR tags. Emit the route's approved metadata in the initial HTML so both
 * sources are identical.
 */
const routeSeoHtml = (): Plugin => ({
  name: "eqourse-route-seo-html",
  enforce: "pre",
  transformIndexHtml: {
    order: "pre",
    handler(html: string, context?: IndexHtmlTransformContext) {
      const requestUrl = context?.originalUrl ?? context?.path ?? "/";
      const pathname = normalisePath(new URL(requestUrl, "http://localhost").pathname);
      const seo = pageSeo[pathname];

      let transformed = html
        .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
        .replace(/<meta[^>]*\bname="description"[^>]*>\s*/gi, "")
        .replace(/<link[^>]*\brel="canonical"[^>]*>\s*/gi, "");

      // Dynamic CMS detail routes are not in the spreadsheet. Their React
      // page supplies the only title/description/canonical after data loads.
      if (!seo) return transformed;

      const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
      const tags = [
        `<title data-rh="true">${escapeHtml(seo.title)}</title>`,
        `<meta data-rh="true" name="description" content="${escapeHtml(seo.description)}" />`,
        `<link data-rh="true" rel="canonical" href="${canonical}" />`,
      ].join("\n    ");

      transformed = transformed.replace(
        /(<meta\s+charset="UTF-8"\s*\/?>)/i,
        `$1\n    ${tags}`,
      );

      return transformed;
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [routeSeoHtml(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
