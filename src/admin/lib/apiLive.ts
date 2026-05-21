/**
 * Live API implementation — real HTTP calls to the backend.
 *
 * Same function signatures as `apiMock.ts` so the rest of the admin
 * panel doesn't know or care which implementation it's using.
 *
 * All calls go through `apiClient.ts` which handles:
 *   - JWT auth headers
 *   - { success, data } envelope unwrapping
 *   - 401 → auto-redirect to /admin/login
 */

import * as client from "./apiClient";
import type {
  AdminUser,
  AnalyticsSummary,
  BlogPost,
  CaseStudy,
  ContactQuery,
  PagedResponse,
  PilotQuery,
  PublishStatus,
  QueryListParams,
  Sample,
  SampleCategory,
} from "./types";
import type { LoginInput } from "./apiMock";

// ─── Constants ──────────────────────────────────────────────
const TOKEN_KEY = "eqourse_admin_token";
const USER_KEY = "eqourse_admin_user";

// ─── The live API object ────────────────────────────────────
export const liveApi = {
  // ═══════════════════════════════════════════════════════════
  // Auth
  // ═══════════════════════════════════════════════════════════
  async login(input: LoginInput): Promise<{ token: string; user: AdminUser }> {
    // Backend returns: { success: true, _id, username, email, token }
    // We need to transform to: { token, user: { id, email, name } }
    const raw = await client.post<{
      _id: string;
      username: string;
      email: string;
      token: string;
    }>("/api/admin/login", input);

    const user: AdminUser = {
      id: raw._id,
      email: raw.email,
      name: raw.username,
    };

    // Store credentials
    localStorage.setItem(TOKEN_KEY, raw.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token: raw.token, user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // ═══════════════════════════════════════════════════════════
  // Analytics
  // ═══════════════════════════════════════════════════════════
  async getAnalytics(): Promise<AnalyticsSummary> {
    return client.get<AnalyticsSummary>("/api/admin/analytics/summary");
  },

  // ═══════════════════════════════════════════════════════════
  // Contact Queries
  // ═══════════════════════════════════════════════════════════
  async listContactQueries(params: QueryListParams = {}): Promise<PagedResponse<ContactQuery>> {
    return client.get<PagedResponse<ContactQuery>>("/api/admin/contact-queries", {
      status: params.status === "all" ? undefined : params.status,
      from: params.from,
      to: params.to,
      q: params.q,
      page: params.page,
      pageSize: params.pageSize,
    });
  },

  async getContactQuery(id: string): Promise<ContactQuery | null> {
    try {
      return await client.get<ContactQuery>(`/api/admin/contact-queries/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async updateContactQuery(id: string, patch: Partial<Pick<ContactQuery, "status" | "internalNotes">>) {
    return client.patch<ContactQuery>(`/api/admin/contact-queries/${id}`, patch);
  },

  async deleteContactQuery(id: string) {
    return client.del(`/api/admin/contact-queries/${id}`);
  },

  // ═══════════════════════════════════════════════════════════
  // Pilot Queries
  // ═══════════════════════════════════════════════════════════
  async listPilotQueries(params: QueryListParams = {}): Promise<PagedResponse<PilotQuery>> {
    return client.get<PagedResponse<PilotQuery>>("/api/admin/pilot-queries", {
      status: params.status === "all" ? undefined : params.status,
      from: params.from,
      to: params.to,
      q: params.q,
      page: params.page,
      pageSize: params.pageSize,
    });
  },

  async getPilotQuery(id: string): Promise<PilotQuery | null> {
    try {
      return await client.get<PilotQuery>(`/api/admin/pilot-queries/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async updatePilotQuery(id: string, patch: Partial<Pick<PilotQuery, "status" | "internalNotes">>) {
    return client.patch<PilotQuery>(`/api/admin/pilot-queries/${id}`, patch);
  },

  async deletePilotQuery(id: string) {
    return client.del(`/api/admin/pilot-queries/${id}`);
  },

  // ═══════════════════════════════════════════════════════════
  // Blogs
  // ═══════════════════════════════════════════════════════════
  async listBlogs(): Promise<BlogPost[]> {
    const res = await client.get<{ items: BlogPost[] }>("/api/admin/blogs");
    return res.items;
  },

  async getBlog(id: string): Promise<BlogPost | null> {
    try {
      return await client.get<BlogPost>(`/api/admin/blogs/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createBlog(input: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<BlogPost> {
    return client.post<BlogPost>("/api/admin/blogs", input);
  },

  async updateBlog(id: string, patch: Partial<BlogPost>): Promise<BlogPost> {
    return client.patch<BlogPost>(`/api/admin/blogs/${id}`, patch);
  },

  async deleteBlog(id: string) {
    return client.del(`/api/admin/blogs/${id}`);
  },

  async setBlogStatus(id: string, status: PublishStatus) {
    return client.patch<BlogPost>(`/api/admin/blogs/${id}/status`, { status });
  },

  // ═══════════════════════════════════════════════════════════
  // Case Studies
  // ═══════════════════════════════════════════════════════════
  async listCaseStudies(): Promise<CaseStudy[]> {
    const res = await client.get<{ items: CaseStudy[] }>("/api/admin/case-studies");
    return res.items;
  },

  async getCaseStudy(id: string): Promise<CaseStudy | null> {
    try {
      return await client.get<CaseStudy>(`/api/admin/case-studies/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createCaseStudy(input: Omit<CaseStudy, "id" | "createdAt" | "updatedAt" | "slug"> & { slug?: string }): Promise<CaseStudy> {
    return client.post<CaseStudy>("/api/admin/case-studies", input);
  },

  async updateCaseStudy(id: string, patch: Partial<CaseStudy>): Promise<CaseStudy> {
    return client.patch<CaseStudy>(`/api/admin/case-studies/${id}`, patch);
  },

  async deleteCaseStudy(id: string) {
    return client.del(`/api/admin/case-studies/${id}`);
  },

  async setCaseStudyStatus(id: string, status: PublishStatus) {
    return client.patch<CaseStudy>(`/api/admin/case-studies/${id}/status`, { status });
  },

  // ═══════════════════════════════════════════════════════════
  // Sample Categories
  // ═══════════════════════════════════════════════════════════
  async listSampleCategories(): Promise<SampleCategory[]> {
    const res = await client.get<{ items: SampleCategory[] }>("/api/admin/sample-categories");
    return res.items;
  },

  async getSampleCategory(id: string): Promise<SampleCategory | null> {
    try {
      return await client.get<SampleCategory>(`/api/admin/sample-categories/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createSampleCategory(input: Omit<SampleCategory, "id" | "createdAt" | "updatedAt" | "slug" | "sampleCount"> & { slug?: string }): Promise<SampleCategory> {
    return client.post<SampleCategory>("/api/admin/sample-categories", input);
  },

  async updateSampleCategory(id: string, patch: Partial<SampleCategory>): Promise<SampleCategory> {
    return client.patch<SampleCategory>(`/api/admin/sample-categories/${id}`, patch);
  },

  async deleteSampleCategory(id: string, opts: { force?: boolean } = {}) {
    const path = opts.force
      ? `/api/admin/sample-categories/${id}?force=true`
      : `/api/admin/sample-categories/${id}`;
    return client.del(path);
  },

  // ═══════════════════════════════════════════════════════════
  // Samples
  // ═══════════════════════════════════════════════════════════
  async listSamplesByCategory(categoryId: string): Promise<Sample[]> {
    const res = await client.get<{ items: Sample[] }>(`/api/admin/sample-categories/${categoryId}/samples`);
    return res.items;
  },

  async getSample(id: string): Promise<Sample | null> {
    try {
      return await client.get<Sample>(`/api/admin/samples/${id}`);
    } catch (e) {
      if (e instanceof client.ApiError && e.status === 404) return null;
      throw e;
    }
  },

  async createSample(input: Omit<Sample, "id" | "createdAt" | "updatedAt" | "order"> & { order?: number }): Promise<Sample> {
    return client.post<Sample>(`/api/admin/sample-categories/${input.categoryId}/samples`, input);
  },

  async updateSample(id: string, patch: Partial<Sample>): Promise<Sample> {
    return client.patch<Sample>(`/api/admin/samples/${id}`, patch);
  },

  async deleteSample(id: string) {
    return client.del(`/api/admin/samples/${id}`);
  },

  async reorderSample(id: string, order: number) {
    return liveApi.updateSample(id, { order });
  },

  // ═══════════════════════════════════════════════════════════
  // Uploads
  // ═══════════════════════════════════════════════════════════
  async uploadFile(file: File, kind: string): Promise<{ url: string; originalName: string; size: number; mimeType: string }> {
    return client.uploadFile<{ url: string; originalName: string; size: number; mimeType: string }>(
      "/api/admin/uploads",
      file,
      "file",
      { kind },
    );
  },
};
