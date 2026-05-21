/**
 * Admin API entry point — factory that switches between mock and live.
 *
 * When `VITE_API_BASE_URL` is set (e.g. in .env.development or .env.production),
 * all API calls go to the real backend via `apiLive.ts`.
 *
 * When it's NOT set, the admin panel continues to work with the localStorage
 * mock in `apiMock.ts` — zero regression, perfect for frontend-only development.
 *
 * Every consumer imports from THIS file:
 *   import { adminApi, slugify } from "../lib/api";
 *
 * The import path never changes — only the underlying implementation swaps.
 */

import { mockApi, slugify } from "./apiMock";
import { liveApi } from "./apiLive";

const useLive = !!import.meta.env.VITE_API_BASE_URL;

if (useLive) {
  console.info(
    `[eQOURSE] API mode: LIVE → ${import.meta.env.VITE_API_BASE_URL}`
  );
} else {
  console.info("[eQOURSE] API mode: MOCK (localStorage). Set VITE_API_BASE_URL to connect to backend.");
}

/**
 * The admin API object. Same interface regardless of mock vs live.
 * All admin pages import `adminApi` from this file.
 */
export const adminApi = useLive ? liveApi : mockApi;

/** Slugify helper — used by editors (BlogEditor, CaseStudyEditor, etc.) */
export { slugify };

/** Re-export LoginInput type for convenience */
export type { LoginInput } from "./apiMock";
