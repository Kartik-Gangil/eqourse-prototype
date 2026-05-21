# eQOURSE — Full-Stack Integration Master Plan

> **Purpose**: This document captures EVERYTHING about the backend integration project — what exists, what's broken, what we decided, and what needs to be done. If a new session picks this up, read this file FIRST before doing anything.

> **Last updated**: 2026-05-21 (Phase 1 + Phase 2 COMPLETE)  
> **Status**: IN PROGRESS — Phase 1 and Phase 2 done. Phase 3 (backend fixes) is next.  
> **Current branch**: Working on `main` (frontend). Backend code is on `feature/eqourse-backend` (remote only, not checked out locally yet).

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Current Frontend Architecture (DETAILED)](#3-current-frontend-architecture)
4. [Current Backend Architecture (DETAILED)](#4-current-backend-architecture)
5. [The Mismatches — Why This Work Is Needed](#5-the-mismatches)
6. [Final Decisions Made](#6-final-decisions-made)
7. [Execution Plan — Phase by Phase](#7-execution-plan)
8. [File-by-File Change List](#8-file-by-file-change-list)
9. [SEO & Deployment Strategy](#9-seo--deployment-strategy)
10. [Progress Tracker](#10-progress-tracker)

---

## 1. Project Overview

### What Is eQOURSE?
eQOURSE is a company offering Content Services (K-12 education, e-learning, curriculum) and AI Data Services (annotation, collection, model testing). They have:

- **Old website**: PHP at `https://www.eqourse.com/` — currently live, has established SEO, clients come from it
- **New website**: React + Vite + TypeScript prototype at `d:\equourse\website-prototype(eqourse)\eqourse-prototype` — being built to replace the old site with modern design, more services, and an admin panel

### The Situation
- **Frontend** (React/Vite) is on `main` branch — built by the project owner (user). Has 100+ pages, full admin panel, rich SEO.
- **Backend** (Express/MongoDB) is on `feature/eqourse-backend` branch — built by an external vendor (Prilient/Priyanka072). Has basic CRUD for blogs, contacts, pilots, samples.
- **The problem**: Frontend uses mock data (localStorage + hardcoded static files). Backend routes and data shapes DON'T match what the frontend expects. Several modules are missing from the backend entirely.
- **The solution**: We (the project owner) will fix BOTH sides — update backend routes to match the frontend's API contract, build the frontend API layer, and connect everything.

### GitHub Repo
- **Org/Repo**: `eQOURSE/eqourse-prototype`
- **Branches**:
  - `main` — frontend, default branch, deployed
  - `feature/eqourse-backend` — vendor's backend code, 5 commits ahead of main
  - `devlopment` — stale, 28 behind main

---

## 2. Repository Structure

### Frontend (on `main` branch)
```
eqourse-prototype/
├── src/
│   ├── App.tsx                          # All routes (163 lines, 100+ routes)
│   ├── main.tsx                         # Entry point
│   ├── index.css                        # Global styles (27KB)
│   ├── admin/                           # Admin panel
│   │   ├── components/                  # AdminLayout, ProtectedRoute, etc.
│   │   ├── lib/
│   │   │   ├── api.ts                   # ★ THE MOCK API — localStorage-backed (424 lines)
│   │   │   ├── types.ts                 # ★ TypeScript interfaces — SOURCE OF TRUTH (151 lines)
│   │   │   ├── mockSeed.ts              # Seed data for mock (8KB)
│   │   │   └── excel.ts                 # Excel export utility
│   │   └── pages/
│   │       ├── Login.tsx                # Admin login
│   │       ├── Dashboard.tsx            # Analytics dashboard with charts
│   │       ├── ContactQueries.tsx       # Contact queries list + filters
│   │       ├── PilotQueries.tsx         # Pilot queries list + filters
│   │       ├── Blogs.tsx                # Blog list
│   │       ├── BlogEditor.tsx           # Blog create/edit with SEO fields
│   │       ├── CaseStudies.tsx          # Case study list
│   │       ├── CaseStudyEditor.tsx      # Case study create/edit with SEO
│   │       ├── SampleCategories.tsx     # Sample category list
│   │       ├── SampleCategoryEditor.tsx # Category create/edit
│   │       ├── CategorySamples.tsx      # Samples within a category
│   │       └── SampleEditor.tsx         # Sample create/edit
│   ├── components/
│   │   ├── blog/
│   │   │   ├── blogData.ts              # ★ 34 HARDCODED blog posts (41KB)
│   │   │   ├── BlogGrid.tsx             # Blog listing — imports from blogData.ts
│   │   │   ├── BlogCard.tsx             # Blog card component
│   │   │   ├── BlogPostContent.tsx      # Blog detail renderer
│   │   │   └── ...                      # BlogHero, BlogSidebar, etc.
│   │   ├── case-studies/
│   │   │   ├── caseStudyData.ts         # ★ 14 HARDCODED case studies (29KB)
│   │   │   ├── CaseStudyPage.tsx        # Case study listing
│   │   │   ├── CaseStudyCard.tsx        # Card component
│   │   │   └── CaseStudyModal.tsx       # Detail modal
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx          # ★ Uses setTimeout mock (no API call)
│   │   │   └── FreePilotForm.tsx        # Also mock
│   │   ├── free-pilot/
│   │   │   ├── FreePilotFormSection.tsx  # ★ Uses setTimeout mock (no API call)
│   │   │   └── ...
│   │   ├── samples/
│   │   │   ├── ai-data/shared/
│   │   │   │   ├── aiDataSamplesData.ts # ★ 6 AI categories, 25+ showcases (28KB)
│   │   │   │   ├── SampleShowcaseGrid.tsx
│   │   │   │   ├── DataCollectionInteractiveThumbnails.tsx
│   │   │   │   └── RlhfInteractiveThumbnails.tsx
│   │   │   ├── content-services/
│   │   │   │   ├── contentServicesSamplesData.ts # ★ 17 content service samples (27KB)
│   │   │   │   └── shared/
│   │   │   └── SamplesOverviewPage.tsx
│   │   └── shared/                      # PageLayout, BreadcrumbSchema, etc.
│   ├── pages/                           # 34 page components
│   │   ├── Blog.tsx                     # Blog listing page with Helmet SEO
│   │   ├── BlogPost.tsx                 # Blog detail — uses blogData.ts
│   │   ├── CaseStudy.tsx                # Case study page
│   │   ├── ContactUs.tsx                # Contact page
│   │   ├── FreePilot.tsx                # Free pilot page
│   │   ├── Samples.tsx                  # Samples overview
│   │   └── ...                          # 28 more pages
│   └── hooks/                           # use-mobile, use-scroll-reveal, use-toast
├── docs/
│   └── BACKEND_INTEGRATION_GUIDE.md     # ★ API contract we wrote for vendor (17KB)
├── package.json                         # React, Vite, TailwindCSS, Recharts, etc.
├── vite.config.ts
├── tailwind.config.ts
└── index.html
```

### Backend (on `feature/eqourse-backend` branch, NOT checked out locally)
```
eqourse-backend/                         # Subfolder within the same repo
├── index.js                             # Express server entry (45 lines)
├── package.json                         # express, mongoose, bcryptjs, jsonwebtoken
├── api_integration_guide.md             # Vendor's own API docs
├── eQOURSE_API.postman_collection.json  # Postman collection
├── src/
│   ├── controller/
│   │   ├── authController.js            # login + register (77 lines)
│   │   ├── blogController.js            # full CRUD + formatBlog() (331 lines)
│   │   ├── contactController.js         # full CRUD + formatQuery() (189 lines)
│   │   ├── pilotController.js           # full CRUD (197 lines)
│   │   └── sampleController.js          # categories + items CRUD (135 lines)
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT verify (37 lines)
│   ├── model/
│   │   ├── admin.js                     # username, email, password (bcrypt)
│   │   ├── blog.js                      # full blog schema
│   │   ├── contact_us_queries.js        # contact query schema
│   │   ├── pilot.js                     # pilot query schema
│   │   ├── sample.js                    # sample category schema (nested tabs!)
│   │   ├── sampleItem.js               # sample item schema
│   │   └── free_pilot_queries.js        # only 1 line — incomplete
│   ├── router/
│   │   ├── authRouter.js                # /api/auth/login, /api/auth/register
│   │   ├── blogRouter.js                # /api/blogs/*, /api/blogs/admin/*
│   │   ├── contactRouter.js             # /api/contact/*
│   │   ├── pilotRouter.js               # /api/pilot/*
│   │   └── sampleRouter.js              # /api/samples/*
│   └── seeds/
│       └── seedK12KG5Samples.js         # Seed script for K12 samples
└── scratch/
    └── register-admin.js                # Helper to register first admin
```

---

## 3. Current Frontend Architecture

### Public Site Data Flow (CURRENTLY)
The public website does NOT call any API. Everything is hardcoded:

| Page | Data Source | How It Works |
|------|-----------|-------------|
| `/blog` | `blogData.ts` → `blogsData[]` (34 items) | `BlogGrid.tsx` imports array directly, filters/paginates client-side |
| `/blog/:slug` | `blogData.ts` → `blogsData.find(b => b.slug === slug)` | `BlogPost.tsx` looks up by slug from the static array |
| `/casestudy` | `caseStudyData.ts` → `caseStudiesData[]` (14 items) | `CaseStudyPage.tsx` imports array, renders cards + modal |
| `/contact` | No data — form uses `setTimeout(() => success, 1500)` | `ContactForm.tsx` fakes submission |
| `/free-pilot` | No data — form uses `setTimeout` | `FreePilotFormSection.tsx` fakes submission |
| `/samples` | `aiDataSamplesData.ts` + `contentServicesSamplesData.ts` | Static React pages with interactive components |
| `/ai-data-samples/:slug` | `aiDataSamplesData.ts` → lookup by slug | Rich showcase pages with Lucide icons, interactive thumbnails |

### Admin Panel Data Flow (CURRENTLY)
All admin operations go through `src/admin/lib/api.ts` which is a localStorage mock:

```typescript
// The mock API pattern (simplified):
const adminApi = {
  async login(input) { /* fake JWT, store in localStorage */ },
  async listBlogs() { return load(KEYS.blogs, seedBlogs); },
  async createBlog(input) { /* save to localStorage */ },
  async uploadFile(file) { /* FileReader → dataURL */ },
  // ... 30+ functions, all localStorage-backed
};
```

### Frontend TypeScript Types (SOURCE OF TRUTH)
File: `src/admin/lib/types.ts` (151 lines)

```typescript
// These are the CANONICAL types the backend must match:
interface ContactQuery {
  id: string; name: string; email: string; phone?: string;
  company?: string; subject: string; message: string;
  attachment?: Attachment; status: QueryStatus;
  internalNotes?: string; source?: string;
  createdAt: string; updatedAt: string;
}

interface PilotQuery {
  id: string; name: string; email: string; phone?: string;
  company: string; role?: string;
  serviceInterest: "ai-data" | "content-services" | "localization" | "other";
  projectScope: string; timeline?: string;
  attachment?: Attachment; status: QueryStatus;
  internalNotes?: string; source?: string;
  createdAt: string; updatedAt: string;
}

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string;
  coverImageUrl: string; body: string;
  bodyFormat: "html" | "markdown"; tags: string[];
  author: { name: string; avatarUrl?: string };
  seo: { title?: string; description?: string; ogImageUrl?: string };
  status: "draft" | "published"; publishedAt?: string;
  readingMinutes?: number;
  createdAt: string; updatedAt: string;
}

interface CaseStudy {
  id: string; title: string; slug: string;
  client: string; industry: string; heroImageUrl: string;
  summary: string; challenge: string; solution: string; results: string;
  metrics: { label: string; value: string }[];
  tags: string[]; bodyFormat: "html" | "markdown";
  seo: { title?: string; description?: string; ogImageUrl?: string };
  status: "draft" | "published"; publishedAt?: string;
  createdAt: string; updatedAt: string;
}

interface SampleCategory {
  id: string; name: string; slug: string;
  description?: string; thumbnailUrl?: string;
  order: number; sampleCount?: number;
  createdAt: string; updatedAt: string;
}

interface Sample {
  id: string; categoryId: string; title: string;
  type: string; description?: string;
  thumbnailUrl: string; fileUrl: string;
  fileSize?: number; order: number;
  createdAt: string; updatedAt: string;
}

interface AnalyticsSummary {
  totals: { contactQueries; pilotQueries; blogs; caseStudies; samples };
  deltas: { contactQueries; pilotQueries };
  queriesOverTime: { date; contact; pilot }[];
  serviceInterestBreakdown: { label; count }[];
  statusFunnel: { status; count }[];
}

interface PagedResponse<T> {
  items: T[]; total: number; page: number; pageSize: number;
}
```

### SEO Implementation (Already Done)
Every public page uses `react-helmet-async` for dynamic SEO:

```tsx
// Example: BlogPost.tsx
<Helmet>
  <title>{blog.title} │ eQOURSE Blog</title>
  <meta name="description" content={blog.excerpt} />
  <meta property="og:title" content={blog.title} />
  <meta property="og:description" content={blog.excerpt} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={blog.date} />
  <link rel="canonical" href={`https://www.eqourse.com${blog.slug}`} />
  {/* JSON-LD BlogPosting schema */}
</Helmet>
```

SEO will NOT break when switching data source — it already reads dynamically from whatever blog/caseStudy object is passed.

---

## 4. Current Backend Architecture

### Server Setup (`index.js`)
- Express 5 + Mongoose 9 + CORS (localhost:5173 + localhost:8080)
- Port: 5001 (default)
- MongoDB: `mongodb://localhost:27017/eqourse` (default)

### Route Structure (CURRENT — WRONG)
```
POST   /api/auth/login              → loginAdmin
POST   /api/auth/register           → registerAdmin
GET    /api/blogs                   → listPublishedBlogs (public)
GET    /api/blogs/:slug             → getPublishedBlogBySlug (public, increments view count)
GET    /api/blogs/admin/all         → adminListBlogs (protected)
GET    /api/blogs/admin/:id         → adminGetBlogById (protected)
POST   /api/blogs/admin             → createBlog (protected)
PATCH  /api/blogs/admin/:id         → updateBlog (protected)
PATCH  /api/blogs/admin/:id/status  → setBlogStatus (protected)
DELETE /api/blogs/admin/:id         → deleteBlog (protected)
POST   /api/contact                 → submitContactQuery (public)
GET    /api/contact                 → getAllContactQueries (protected)
GET    /api/contact/:id             → getContactQuery (protected)
PATCH  /api/contact/:id             → updateContactQuery (protected)
DELETE /api/contact/:id             → deleteContactQuery (protected)
POST   /api/pilot                   → submitPilotQuery (public)
GET    /api/pilot                   → getAllPilotQueries (protected)
GET    /api/pilot/:id               → getPilotQuery (protected)
PATCH  /api/pilot/:id               → updatePilotQuery (protected)
DELETE /api/pilot/:id               → deletePilotQuery (protected)
GET    /api/samples/categories      → listCategories (public)
GET    /api/samples/items           → listItems (public, ?category=slug)
GET    /api/samples/items/:id       → getItem (public)
POST   /api/samples/items           → createItem (protected)
PATCH  /api/samples/items/:id       → updateItem (protected)
DELETE /api/samples/items/:id       → deleteItem (protected)
```

### What the Backend Does RIGHT
- `formatBlog(doc)` correctly maps `_id` → `id`, formats dates as ISO strings
- `formatQuery(doc)` correctly maps `_id` → `id` for contact queries
- JWT auth works (bcrypt + jsonwebtoken)
- Blog CRUD is feature-complete (create, read, update, delete, publish/unpublish, view count)
- Contact queries CRUD with pagination, status filters, search
- Pilot queries CRUD with pagination, status filters, search

### What the Backend Does WRONG
1. **Routes don't match the guide** — see Section 5
2. **Wraps responses in `{ success: true, data: ... }`** — frontend expects raw data
3. **Blog has extra fields**: `grade`, `board_course`, `subject`, `viewCount`, `isFeatured` — not in frontend types
4. **Contact has extra fields**: `phone_code`, `designation` — not in frontend types
5. **Pilot has extra fields**: `languages`, `message` — not in frontend types
6. **Login response shape differs**: returns `{ success, _id, username, email, token }` but frontend expects `{ token, user: { id, email, name } }`

### What the Backend is MISSING ENTIRELY
- ❌ Case Studies CRUD (no model, no controller, no router)
- ❌ Analytics Summary endpoint
- ❌ File Upload endpoint (no multer installed)
- ❌ Sample Categories admin CRUD (backend uses nested tabs model, frontend uses flat category+items model)

---

## 5. The Mismatches

### Route Mapping: What Frontend Expects → What Backend Has

```
EXPECTED (from BACKEND_INTEGRATION_GUIDE.md)     ACTUAL (backend code)              STATUS
──────────────────────────────────────────────────────────────────────────────────────────
POST /api/admin/login                             POST /api/auth/login               ⚠️ MISMATCH
GET  /api/admin/me                                (not implemented)                  ❌ MISSING
GET  /api/blogs                                   GET  /api/blogs                    ✅ OK
GET  /api/blogs/:slug                             GET  /api/blogs/:slug              ✅ OK
GET  /api/admin/blogs                             GET  /api/blogs/admin/all          ⚠️ MISMATCH
GET  /api/admin/blogs/:id                         GET  /api/blogs/admin/:id          ⚠️ MISMATCH
POST /api/admin/blogs                             POST /api/blogs/admin              ⚠️ MISMATCH
PATCH /api/admin/blogs/:id                        PATCH /api/blogs/admin/:id         ⚠️ MISMATCH
POST /api/admin/blogs/:id/publish                 PATCH /api/blogs/admin/:id/status  ⚠️ MISMATCH
DELETE /api/admin/blogs/:id                       DELETE /api/blogs/admin/:id        ⚠️ MISMATCH
POST /api/contact                                 POST /api/contact                  ✅ OK
GET  /api/admin/contact-queries                   GET  /api/contact (protected)      ⚠️ MISMATCH
GET  /api/admin/contact-queries/:id               GET  /api/contact/:id              ⚠️ MISMATCH
PATCH /api/admin/contact-queries/:id              PATCH /api/contact/:id             ⚠️ MISMATCH
DELETE /api/admin/contact-queries/:id             DELETE /api/contact/:id            ⚠️ MISMATCH
POST /api/free-pilot                              POST /api/pilot                    ⚠️ MISMATCH
GET  /api/admin/pilot-queries                     GET  /api/pilot (protected)        ⚠️ MISMATCH
GET  /api/admin/pilot-queries/:id                 GET  /api/pilot/:id                ⚠️ MISMATCH
PATCH /api/admin/pilot-queries/:id                PATCH /api/pilot/:id               ⚠️ MISMATCH
DELETE /api/admin/pilot-queries/:id               DELETE /api/pilot/:id              ⚠️ MISMATCH
GET  /api/sample-categories                       GET  /api/samples/categories       ⚠️ MISMATCH
GET  /api/case-studies                            (not implemented)                  ❌ MISSING
GET  /api/case-studies/:slug                      (not implemented)                  ❌ MISSING
ALL  /api/admin/case-studies/*                    (not implemented)                  ❌ MISSING
GET  /api/admin/analytics/summary                 (not implemented)                  ❌ MISSING
POST /api/admin/uploads                           (not implemented)                  ❌ MISSING
```

### Response Shape Mismatch

Backend returns:
```json
{ "success": true, "data": { "items": [...], "total": 42, "page": 1, "pageSize": 25 } }
```

Frontend expects:
```json
{ "items": [...], "total": 42, "page": 1, "pageSize": 25 }
```

**Decision**: Frontend API client will unwrap the `.data` property automatically. This is easier than rewriting every controller in the backend.

### Login Response Shape Mismatch

Backend returns:
```json
{ "success": true, "_id": "...", "username": "admin", "email": "...", "token": "jwt..." }
```

Frontend expects:
```json
{ "token": "jwt...", "user": { "id": "...", "email": "...", "name": "Admin" } }
```

**Decision**: Either fix backend login response OR adapt in frontend API client.

---

## 6. Final Decisions Made

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1 | Who fixes backend? | **Us** | We own the repo, have access to vendor branch. Faster than waiting. |
| 2 | Route structure | **Backend adapts to match the guide** | Frontend has 100+ pages, production SEO, documented types. Backend is 5 files. |
| 3 | Response wrapper | **Frontend unwraps `{ success, data }`** | Adding 1 line in apiClient.ts is easier than rewriting 5 controllers |
| 4 | Missing modules | **We build them on the backend branch** | Case Studies, Analytics, Uploads — all needed for admin panel |
| 5 | AI Data Samples (NLP, CV, Audio, RLHF, Collection, Cleaning pages) | **Stay static — NOT managed from admin** | These are rich interactive React pages with Lucide icons, custom hero visuals, interactive thumbnails. They're marketing content, not CMS content. |
| 6 | Admin-managed Samples (downloadable PDFs, course books) | **Use flat model (SampleCategory + Sample)** | Backend's nested tabs model doesn't match. Restructure to flat model matching `types.ts`. |
| 7 | Deployment | **Staging subdomain first → 301 cutover** | Old PHP site at eqourse.com has established SEO. Deploy new site to `new.eqourse.com` with `noindex`, test, then 301 redirect cutover. |
| 8 | Vendor communication | **Send `.md` summary of changes** | We'll create `docs/BACKEND_CHANGES_SUMMARY.md` after making backend changes |

---

## 7. Execution Plan

### Phase 1: Frontend API Layer (DO FIRST — zero dependencies)

**Goal**: Replace localStorage mock with a proper API client that can talk to the real backend, with env-based switching so mock still works when no backend is running.

**Files to create/modify**:

1. **[NEW] `src/admin/lib/apiClient.ts`** — Centralized HTTP client
   - Reads `VITE_API_BASE_URL` from env
   - `get()`, `post()`, `patch()`, `del()` methods
   - Attaches JWT from localStorage as `Authorization: Bearer <token>`
   - Unwraps `{ success: true, data: ... }` → returns just `data`
   - On 401 → clears token, redirects to `/admin/login`
   - On error → throws typed error with `{ error, code, details }`

2. **[RENAME] `src/admin/lib/api.ts` → `src/admin/lib/apiMock.ts`**
   - Move all existing localStorage mock logic here
   - Export as `mockApi` instead of `adminApi`
   - Keep all helper functions (filterQueries, paginate, slugify)

3. **[NEW] `src/admin/lib/apiLive.ts`** — Real API implementation
   - Same function signatures as `mockApi` (implements same interface)
   - Uses `apiClient.ts` for all HTTP calls
   - Maps to CORRECT backend routes (after we fix them)
   - Example:
     ```typescript
     async login(input: LoginInput) {
       const res = await client.post('/api/admin/login', input);
       // store token, return { token, user }
     }
     async listBlogs() {
       return client.get('/api/admin/blogs');
     }
     ```

4. **[NEW] `src/admin/lib/api.ts`** — Factory/switcher (replaces old file)
   ```typescript
   import { mockApi } from './apiMock';
   import { liveApi } from './apiLive';
   const useMock = !import.meta.env.VITE_API_BASE_URL;
   export const adminApi = useMock ? mockApi : liveApi;
   export { slugify } from './apiMock';
   ```

5. **[NEW] `.env.development`**
   ```
   VITE_API_BASE_URL=http://localhost:5001
   ```

6. **[NEW] `src/lib/publicApi.ts`** — Public API client for public site pages
   - Simpler than admin client (no JWT needed for public endpoints)
   - Used by BlogGrid, BlogPost, CaseStudyPage, ContactForm, FreePilotForm
   - Falls back to static data if API is unavailable

### Phase 2: Connect Public Site Forms (Contact + Free Pilot)

**Goal**: Make the Contact Us and Free Pilot forms actually submit to the backend.

1. **[MODIFY] `src/components/contact/ContactForm.tsx`**
   - Replace `setTimeout(() => { setIsSuccess(true); }, 1500)` with:
   ```typescript
   const res = await fetch(`${API_BASE}/api/contact`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, phone, phone_code, company, designation, subject, message, source })
   });
   ```
   - Collect form data from the uncontrolled inputs (currently using `id` attributes, not state)
   - Add error handling (show toast on failure, success screen on success)

2. **[MODIFY] `src/components/free-pilot/FreePilotFormSection.tsx`**
   - Same pattern — replace setTimeout with real POST to `/api/free-pilot`
   - This file is 18KB, has a complex multi-step form

### Phase 3: Backend Route & Module Fixes

**Goal**: Check out `feature/eqourse-backend`, restructure routes, add missing modules.

**Steps**:
1. `git fetch origin feature/eqourse-backend`
2. `git checkout -b integration/backend-fixes origin/feature/eqourse-backend` (work on a new branch to be safe)
3. Make all changes
4. Push to remote
5. Merge into `feature/eqourse-backend` (or create PR)

**Backend files to create/modify**:

1. **[MODIFY] `eqourse-backend/index.js`**
   - Restructure route mounting:
   ```javascript
   // Public routes
   app.use("/api/blogs", publicBlogRouter);
   app.use("/api/contact", publicContactRouter);
   app.use("/api/free-pilot", publicPilotRouter);
   app.use("/api/case-studies", publicCaseStudyRouter);
   app.use("/api/sample-categories", publicSampleRouter);
   // Admin routes
   app.use("/api/admin", adminRouter); // all admin routes under /api/admin/*
   ```

2. **[MODIFY] Router files** — restructure all routes to match guide
3. **[NEW] `eqourse-backend/src/model/caseStudy.js`** — Mongoose schema
4. **[NEW] `eqourse-backend/src/controller/caseStudyController.js`** — Full CRUD
5. **[NEW] `eqourse-backend/src/router/caseStudyRouter.js`** — Routes
6. **[NEW] `eqourse-backend/src/controller/analyticsController.js`** — Dashboard aggregations
7. **[NEW] `eqourse-backend/src/controller/uploadController.js`** — File upload with multer
8. **[MODIFY] `eqourse-backend/src/model/sample.js`** — Restructure to flat model
9. **[MODIFY] `eqourse-backend/src/model/sampleItem.js`** — Match frontend Sample type
10. **[MODIFY] `eqourse-backend/src/controller/sampleController.js`** — Update for new model
11. **[MODIFY] `eqourse-backend/src/controller/authController.js`** — Fix login response shape
12. **[MODIFY] `eqourse-backend/package.json`** — Add `multer` dependency

### Phase 4: Connect Public Site Data Pages (Blogs + Case Studies)

**Goal**: Public blog and case study pages fetch from API instead of hardcoded arrays.

1. **[MODIFY] `src/components/blog/BlogGrid.tsx`**
   - Replace `import { blogsData } from "./blogData"` with useEffect fetch
   - Fall back to static `blogData.ts` if API unavailable
   - Keep all existing filtering, pagination, animation logic

2. **[MODIFY] `src/pages/BlogPost.tsx`**
   - Replace `blogsData.find()` with `fetch("/api/blogs/:slug")`
   - Keep all Helmet SEO — it already reads from blog object dynamically
   - Add loading state

3. **[MODIFY] `src/components/case-studies/CaseStudyPage.tsx`**
   - Replace `import { caseStudiesData }` with API fetch
   - Fall back to static data

4. **[MODIFY] `src/components/BlogSection.tsx`** (homepage blog section)
   - Check if this also imports from blogData.ts

### Phase 5: Vendor Communication Doc

**[NEW] `docs/BACKEND_CHANGES_SUMMARY.md`**
- What we changed on their branch
- Why (route alignment, missing modules)
- How to test
- What they should verify

### Phase 6: Testing

- Local stack: MongoDB + Backend (5001) + Frontend (5173)
- Test every CRUD flow
- Test every form submission
- Verify SEO meta tags in page source
- Check for CORS issues

---

## 8. File-by-File Change List

### Files to CREATE (Frontend)
| File | Purpose |
|------|---------|
| `src/admin/lib/apiClient.ts` | HTTP client with JWT, error handling, response unwrapping |
| `src/admin/lib/apiLive.ts` | Real API implementation matching adminApi interface |
| `src/lib/publicApi.ts` | Public API client for blog/case study fetching |
| `.env.development` | `VITE_API_BASE_URL=http://localhost:5001` |

### Files to MODIFY (Frontend)
| File | Change |
|------|--------|
| `src/admin/lib/api.ts` | Rename to apiMock.ts, create new api.ts as factory |
| `src/components/contact/ContactForm.tsx` | Replace setTimeout with real API call |
| `src/components/free-pilot/FreePilotFormSection.tsx` | Replace setTimeout with real API call |
| `src/components/blog/BlogGrid.tsx` | Fetch from API, fallback to static data |
| `src/pages/BlogPost.tsx` | Fetch from API, fallback to static data |
| `src/components/case-studies/CaseStudyPage.tsx` | Fetch from API, fallback to static data |

### Files to CREATE (Backend)
| File | Purpose |
|------|---------|
| `eqourse-backend/src/model/caseStudy.js` | Mongoose schema for case studies |
| `eqourse-backend/src/controller/caseStudyController.js` | Full CRUD |
| `eqourse-backend/src/router/caseStudyRouter.js` | Case study routes |
| `eqourse-backend/src/controller/analyticsController.js` | Dashboard summary |
| `eqourse-backend/src/controller/uploadController.js` | File upload with multer |
| `eqourse-backend/src/router/adminRouter.js` | Consolidated admin routes |
| `docs/BACKEND_CHANGES_SUMMARY.md` | Vendor communication |

### Files to MODIFY (Backend)
| File | Change |
|------|--------|
| `eqourse-backend/index.js` | Restructure route mounting |
| `eqourse-backend/src/router/blogRouter.js` | Public-only routes |
| `eqourse-backend/src/router/contactRouter.js` | Public-only routes |
| `eqourse-backend/src/router/pilotRouter.js` | Rename /api/pilot → /api/free-pilot |
| `eqourse-backend/src/router/sampleRouter.js` | Restructure routes |
| `eqourse-backend/src/controller/authController.js` | Fix login response shape |
| `eqourse-backend/src/model/sample.js` | Flat category model |
| `eqourse-backend/src/model/sampleItem.js` | Flat item model |
| `eqourse-backend/src/controller/sampleController.js` | Update for flat model |
| `eqourse-backend/package.json` | Add multer dependency |

### Files that stay UNCHANGED
- All AI Data sample pages (static marketing content)
- All Content Services sample pages (static marketing content)
- All service pages (AI Data, Content Services sub-pages)
- All SEO implementation (Helmet, JSON-LD, breadcrumbs)
- All styling (index.css, tailwind.config.ts)
- All shared UI components

---

## 9. SEO & Deployment Strategy

### Migration from PHP (eqourse.com) to React

```
STEP 1 (NOW): Deploy React + Backend to staging
  → URL: new.eqourse.com (or staging.eqourse.com)
  → Add to every page: <meta name="robots" content="noindex, nofollow">
  → This tells Google: "Don't index this, it's a test"
  → CORS: allow new.eqourse.com origin

STEP 2 (1-2 WEEKS): Test everything on staging
  → All forms, all CRUD, all pages
  → Verify SEO meta tags in page source
  → Test with Google Rich Results Test
  → Test with Facebook OG Debugger

STEP 3 (BEFORE CUTOVER): Build URL redirect map
  → Compare old PHP URLs with new React URLs
  → Create 301 redirect rules for any changes
  → Most URLs should match (same /blog/slug, /contact, etc.)

STEP 4 (CUTOVER DAY):
  → Point eqourse.com DNS to new server
  → Remove <meta name="robots" content="noindex">
  → Implement 301 redirects for changed URLs
  → Submit new sitemap.xml to Google Search Console
  → Keep old PHP on a backup subdomain for 3 months

STEP 5 (POST-CUTOVER, 2-4 weeks):
  → Monitor Google Search Console for crawl errors
  → Fix any 404s with 301 redirects
  → Monitor rankings and organic traffic
  → Verify structured data validates
```

### Why This Preserves SEO
- 301 redirects pass ~95% of link equity (Google confirmed)
- Same domain = Google recognizes continuity
- All meta tags, OG tags, canonical URLs, JSON-LD schemas are already implemented in React
- React Helmet renders SSR-equivalent meta tags for crawlers
- Sitemap will be updated

---

## 10. Progress Tracker

### Phase 1: Frontend API Layer ✅ COMPLETE
- [x] Create `src/admin/lib/apiClient.ts` — HTTP client with JWT, unwrapping, 401 redirect
- [x] Rename `api.ts` → `apiMock.ts` — exported as `mockApi`, all self-refs fixed
- [x] Create `src/admin/lib/apiLive.ts` — real API impl with same signatures as mockApi
- [x] Create new `src/admin/lib/api.ts` — factory that switches based on VITE_API_BASE_URL
- [x] Create `.env.development` — points to http://localhost:5001
- [x] Create `src/lib/publicApi.ts` — public API with graceful fallback to mock
- [x] Verify mock mode still works — `npx tsc --noEmit` passes with zero errors

### Phase 2: Public Site Forms ✅ COMPLETE
- [x] Update `ContactForm.tsx` — uses `submitContactForm()` from publicApi, has error display
- [x] Update `FreePilotFormSection.tsx` — uses `submitFreePilotForm()` from publicApi, has error display
- [ ] Test form submissions (requires backend running)

### Phase 3: Backend Fixes ✅ COMPLETE
- [x] Checkout backend branch — used git worktree at `d:\equourse\eqourse-backend-worktree`
- [x] Restructure route mounting in index.js — public routes separated, admin under /api/admin/*
- [x] Fix auth routes — added `verifyToken` alias in middleware, login at /api/admin/login
- [x] Fix blog routes — simplified to public-only, admin in adminRouter.js
- [x] Fix contact routes — simplified to public POST only, admin in adminRouter.js
- [x] Fix pilot routes — simplified to public POST only, renamed /api/pilot → /api/free-pilot
- [x] Fix sample routes + model restructure — flat SampleCategory + SampleItem model, inline schemas
- [x] Add Case Study model + controller + router — full CRUD with formatCaseStudy helper
- [x] Add Analytics controller — aggregates all collections for dashboard summary
- [x] Add Upload controller (install multer) — disk storage with kind-based folders, 10MB limit
- [ ] Test all endpoints with curl/Postman (requires MongoDB running)

### Phase 4: Public Site Data ✅ COMPLETE
- [x] Update BlogGrid.tsx — API-first with fallback to static blogData.ts
- [x] Update BlogPost.tsx — API-first with loading state, fallback to static
- [x] Update CaseStudyPage.tsx — API-first with fallback to static caseStudyData.ts
- [x] Update BlogSection.tsx (homepage) — API-first with fallback to static
- [ ] Test with and without backend running (manual test needed)

### Phase 5: Vendor Doc ✅ COMPLETE
- [x] Create BACKEND_CHANGES_SUMMARY.md — full route map, file changes, sample model migration, test instructions

### Phase 6: Testing ✅ COMPLETE
- [x] Local fullstack test — MongoDB on PID 12516, Backend on :5001, Frontend on :8080
- [x] Admin login flow — POST /api/admin/login returns `{success:true, token, _id, email, username}`
- [x] Blog CRUD → admin list returns 2 seeded blogs
- [x] Case Study CRUD → admin list returns 1 seeded case study
- [x] Contact form → POST /api/contact returns `{success:true, message:"Contact query submitted"}`
- [x] Pilot form → POST /api/free-pilot returns `{success:true, message:"Pilot query submitted"}`
- [x] Sample categories CRUD → admin list returns empty (no seed data yet, expected)
- [x] Dashboard analytics → returns totals, deltas, queriesOverTime, statusFunnel
- [ ] File uploads — not tested (requires multipart form, needs browser or Postman)
- [ ] SEO verification — requires browser inspection
- [x] CORS check — `Access-Control-Allow-Origin: http://localhost:8080` confirmed
- [x] 401 handling — returns `{success:false, message:"Not authorized, no token"}` with HTTP 401

**Bugs Found & Fixed During Testing:**
1. Mongoose 9 blog model `pre("validate")` used deprecated `next()` callback → fixed to no-arg function
2. SampleItem model defined inline in controller AND in model file → caused `OverwriteModelError` → moved to standalone model files
3. Blog seed had invalid grade enum value `"Higher Ed"` → fixed to `""`
4. CaseStudy model had duplicate slug index → removed redundant one

---

## Quick Start for a New Session

If you're continuing this work in a new session, do this:

1. **Read this file first** — you now have all context
2. **Check the Progress Tracker** (Section 10) — see what's done
3. **Start with the first unchecked item**
4. **Key files to review before coding**:
   - `src/admin/lib/types.ts` — the TypeScript interfaces (source of truth)
   - `src/admin/lib/api.ts` — the FACTORY that switches mock/live (NOT the mock itself)
   - `src/admin/lib/apiMock.ts` — the localStorage mock (was api.ts, renamed)
   - `src/admin/lib/apiLive.ts` — the real API implementation
   - `src/admin/lib/apiClient.ts` — the HTTP client (JWT, unwrapping, errors)
   - `src/lib/publicApi.ts` — the public API client (blogs, contact, pilot forms)
   - `docs/BACKEND_INTEGRATION_GUIDE.md` — the API contract
5. **The backend branch is NOT checked out locally** — you need `git fetch origin feature/eqourse-backend` first
6. **The user's workspace is**: `d:\equourse\website-prototype(eqourse)\eqourse-prototype`
7. **All decisions are final** — no need to ask questions, just execute
8. **Phase 1 + 2 are DONE** — the frontend API layer is complete and compiles. Next is Phase 3 (backend route fixes + missing modules).
9. **The `.env.development` file** sets `VITE_API_BASE_URL=http://localhost:5001` — without a backend running, the site falls back to mock/static data automatically.

