# eQOURSE — Full API Integration Handover Document

> **Date**: 2026-05-22
> **Author**: eQOURSE Project Owner
> **Status**: All integration work complete — ready for vendor merge & staging deployment

---

## Background & Context

### The Starting Point
The eQOURSE website frontend (React + Vite + TypeScript) was fully built and deployed on the `main` branch. The vendor (Prilient) was building the backend (Express + MongoDB) on a separate branch: `feature/eqourse-backend`.

**The vendor's request to us:**
> *"Frontend is already on main, so before I merge backend into it, can you first complete the API integration from the frontend side? Please connect the frontend with the actual backend endpoints instead of mock/localStorage data, and push the latest changes to main. Once that's done, I'll pull the latest code, test the fullstack integration locally, and then finalize the merge/testing flow."*

### What We Did
We completed the **full API integration** — both frontend AND backend sides — across 7 phases:
1. Built the frontend API layer (replacing all localStorage mocks with real HTTP calls)
2. Connected public site forms (Contact Us, Free Pilot)
3. Restructured the backend routes, added missing modules (Case Studies, Analytics, File Uploads)
4. Connected public site data pages (Blogs, Case Studies) to the API
5. Created vendor communication docs
6. Tested the full stack end-to-end locally
7. Added Case Study Related Service Links customization + Fixed Free Pilot file upload bug

---

## Phase 1: Frontend API Layer

**Problem**: The entire admin panel ran on localStorage mocks (`src/admin/lib/api.ts`). No real HTTP calls existed.

**What We Built**:

| File | Purpose |
|------|---------|
| `src/admin/lib/apiClient.ts` | Centralized HTTP client — JWT auth headers, automatic `{ success, data }` envelope unwrapping, 401 redirect to login |
| `src/admin/lib/apiLive.ts` | Real API implementation — same function signatures as the mock, calls actual backend endpoints |
| `src/admin/lib/apiMock.ts` | Renamed from old `api.ts` — all existing localStorage mock logic preserved |
| `src/admin/lib/api.ts` | Factory/switcher — checks `VITE_API_BASE_URL` env var, uses `apiLive` if set, `apiMock` if not |
| `src/lib/publicApi.ts` | Public API client — handles blog fetching, contact/pilot form submissions, case study fetching |
| `.env.development` | Sets `VITE_API_BASE_URL=http://localhost:5001` |

**Key Design Decision**: If no backend is running (or `VITE_API_BASE_URL` is not set), the site automatically falls back to mock/static data. Nothing breaks.

---

## Phase 2: Public Site Forms Connected

**Problem**: `ContactForm.tsx` and `FreePilotFormSection.tsx` used `setTimeout(() => success, 1500)` — fake submissions.

**What We Changed**:

| File | Change |
|------|--------|
| `src/components/contact/ContactForm.tsx` | Replaced setTimeout with `submitContactForm()` from `publicApi.ts`. Sends real POST to `/api/contact`. Shows error UI on failure. |
| `src/components/free-pilot/FreePilotFormSection.tsx` | Replaced setTimeout with `submitFreePilotForm()` from `publicApi.ts`. Sends real POST to `/api/free-pilot` as `FormData` (supports file upload). Shows error UI on failure. |

---

## Phase 3: Backend Restructuring (Major)

**Problem**: The vendor's backend routes didn't match the frontend's expected API contract. Several critical modules were missing entirely:
- ❌ Case Studies CRUD (no model, controller, or router)
- ❌ Dashboard Analytics endpoint
- ❌ File Upload endpoint (no multer)
- ❌ Sample model was nested tabs — frontend uses flat SampleCategory + SampleItem

**What We Did**:

We used a `git worktree` at `d:\equourse\eqourse-backend-worktree` to work on the `feature/eqourse-backend` branch without disrupting the frontend workspace.

### New Route Structure

**Public Routes (No Auth):**
```
POST   /api/contact                          → Submit contact form
POST   /api/free-pilot                       → Submit free pilot request (was /api/pilot)
GET    /api/blogs                            → List published blogs
GET    /api/blogs/:slug                      → Get published blog by slug
GET    /api/case-studies                     → List published case studies [NEW]
GET    /api/case-studies/:slug               → Get published case study by slug [NEW]
GET    /api/sample-categories                → List all sample categories [CHANGED]
GET    /api/sample-categories/:slug/samples  → List samples in a category [CHANGED]
```

**Admin Routes (JWT Required — all under `/api/admin/*`):**
```
POST   /api/admin/login                      → Admin login (was /api/auth/login)
GET    /api/admin/analytics/summary          → Dashboard analytics [NEW]
POST   /api/admin/uploads                    → File upload (multipart) [NEW]

# Blogs
GET    /api/admin/blogs                      → List all blogs
GET    /api/admin/blogs/:id                  → Get blog by ID
POST   /api/admin/blogs                      → Create blog
PATCH  /api/admin/blogs/:id                  → Update blog
PATCH  /api/admin/blogs/:id/status           → Change publish status
DELETE /api/admin/blogs/:id                  → Delete blog

# Case Studies [ALL NEW]
GET    /api/admin/case-studies               → List all case studies
GET    /api/admin/case-studies/:id           → Get case study by ID
POST   /api/admin/case-studies               → Create case study
PATCH  /api/admin/case-studies/:id           → Update case study
PATCH  /api/admin/case-studies/:id/status    → Change publish status
DELETE /api/admin/case-studies/:id           → Delete case study

# Contact Queries
GET    /api/admin/contact-queries            → List queries (was /api/contact GET)
GET    /api/admin/contact-queries/:id        → Get query
PATCH  /api/admin/contact-queries/:id        → Update query status/notes
DELETE /api/admin/contact-queries/:id        → Delete query

# Pilot Queries
GET    /api/admin/pilot-queries              → List queries (was /api/pilot GET)
GET    /api/admin/pilot-queries/:id          → Get query
PATCH  /api/admin/pilot-queries/:id          → Update query status/notes
DELETE /api/admin/pilot-queries/:id          → Delete query

# Sample Categories & Items [RESTRUCTURED]
GET    /api/admin/sample-categories          → List categories
GET    /api/admin/sample-categories/:id      → Get category
POST   /api/admin/sample-categories          → Create category
PATCH  /api/admin/sample-categories/:id      → Update category
DELETE /api/admin/sample-categories/:id      → Delete category
GET    /api/admin/sample-categories/:categoryId/samples  → List samples in category
GET    /api/admin/samples/:id                → Get sample
POST   /api/admin/sample-categories/:categoryId/samples  → Create sample
PATCH  /api/admin/samples/:id                → Update sample
DELETE /api/admin/samples/:id                → Delete sample
```

### Backend Files Created
| File | Purpose |
|------|---------|
| `src/router/adminRouter.js` | Consolidated admin router — ALL admin routes with JWT middleware |
| `src/router/caseStudyRouter.js` | Public case study routes |
| `src/model/caseStudy.js` | Mongoose schema for case studies |
| `src/controller/caseStudyController.js` | Full CRUD for case studies |
| `src/controller/analyticsController.js` | Dashboard summary (totals, deltas, charts) |
| `src/controller/uploadController.js` | File upload with multer (10MB limit, kind-based folders) |

### Backend Files Modified
| File | What Changed |
|------|-------------|
| `index.js` | Complete route mounting restructure. Added `/api/admin` mount, `/uploads` static serving, renamed `/api/pilot` → `/api/free-pilot` |
| `src/router/blogRouter.js` | Simplified to public-only (admin routes moved to adminRouter) |
| `src/router/contactRouter.js` | Simplified to public POST only |
| `src/router/pilotRouter.js` | Simplified to public POST only, added `uploadMiddleware` for file attachments |
| `src/router/sampleRouter.js` | Restructured for flat model |
| `src/controller/sampleController.js` | Complete rewrite for flat SampleCategory + SampleItem model |
| `src/controller/pilotController.js` | Added `req.file` handling to save file attachments to MongoDB |
| `src/middleware/authMiddleware.js` | Added `verifyToken` export alias |
| `package.json` | Added `multer` dependency |

### Backend Files NOT Changed (vendor code untouched)
- `src/controller/authController.js` — login/register logic
- `src/controller/blogController.js` — all blog CRUD
- `src/controller/contactController.js` — all contact CRUD
- `src/model/admin.js`, `src/model/blog.js`, `src/model/contact_us_queries.js`, `src/model/pilot.js`

### Sample Model Migration (Breaking Change)
The old nested tabs model was replaced with a flat model:
```js
// OLD: Nested tabs inside one document
{ category: "k12-sample", tabs: [{ tab_name: "...", samples: [...] }] }

// NEW: Separate collections
SampleCategory: { name, slug, description, thumbnailUrl, order }
SampleItem:     { categoryId: ObjectId, title, type, description, thumbnailUrl, fileUrl, fileSize, order }
```
**Existing sample data will need re-seeding after merge.**

---

## Phase 4: Public Site Data Pages Connected

**Problem**: Blog listing, blog detail, and case study pages used hardcoded static arrays (`blogData.ts` with 34 entries, `caseStudyData.ts` with 14 entries).

**What We Changed**:

| File | Change |
|------|--------|
| `src/components/blog/BlogGrid.tsx` | Fetches from `GET /api/blogs` first; falls back to static `blogData.ts` if API unavailable |
| `src/pages/BlogPost.tsx` | Fetches from `GET /api/blogs/:slug` first; falls back to static data |
| `src/components/case-studies/CaseStudyPage.tsx` | Fetches from `GET /api/case-studies` first; falls back to static `caseStudyData.ts` |
| `src/components/BlogSection.tsx` | Homepage blog section — fetches from API, falls back to static |

**Key Point**: All SEO (Helmet, JSON-LD, OG tags) was already dynamic — it reads from whatever data object is passed. No SEO changes needed.

---

## Phase 5: Vendor Communication

Created `docs/BACKEND_CHANGES_SUMMARY.md` — detailed documentation of every backend change, new route structure, test instructions, and questions for vendor.

---

## Phase 6: Full-Stack Testing

### Local Stack Tested
- MongoDB running locally
- Backend on `http://localhost:5001`
- Frontend on `http://localhost:8080`

### Test Results
| Test | Result |
|------|--------|
| Admin login (JWT) | ✅ Pass |
| Blog CRUD (create, edit, publish, delete) | ✅ Pass |
| Blog public listing & detail pages | ✅ Pass |
| Case Study CRUD | ✅ Pass |
| Case Study public listing & modal | ✅ Pass |
| Contact form submission → Admin panel | ✅ Pass |
| Free Pilot form submission → Admin panel | ✅ Pass |
| Sample categories CRUD | ✅ Pass |
| Dashboard analytics (live metrics) | ✅ Pass |
| CORS configuration | ✅ Pass |
| 401 unauthorized handling | ✅ Pass |
| File uploads (cover images via admin) | ✅ Pass |

### Bugs Found & Fixed During Testing
1. Mongoose 9 `pre("validate")` hook used deprecated `next()` callback → fixed
2. SampleItem model defined in both controller and model file → caused `OverwriteModelError` → fixed
3. Blog seed had invalid grade enum `"Higher Ed"` → fixed to `""`
4. CaseStudy model had duplicate slug index → removed

---

## Phase 7: Post-Testing Enhancements

### 7a. Case Study Related Service Links
**Problem**: The "Services Used" sidebar in case study modals was hardcoded from tags. Admins couldn't control which services appeared.

**What We Built**:
- Added `relatedLinks` field to backend schema (`caseStudy.js`)
- Built checklist UI in Admin Editor with grouped AI Data Services and Content Services checkboxes
- Added dynamic custom link inputs (arbitrary label + URL)
- Public site prioritizes explicit DB links, falls back to tag mapping for legacy data

### 7b. Free Pilot File Upload Bug Fix
**Problem**: Files uploaded via the Free Pilot form were NOT appearing in the Admin Panel. The frontend was sending pure JSON, ignoring the file entirely.

**What We Fixed**:
- Frontend now sends `FormData` (not JSON) when a file is attached
- Backend `POST /api/free-pilot` route now uses `multer` middleware
- `pilotController.js` extracts `req.file` and saves attachment metadata to MongoDB
- Admin panel already had the UI to display/download attachments — now it actually receives them

---

## Phase 8: Admin-Managed Samples Workflow

**Problem**: The website has complex interactive sample showcase pages (e.g. `kindergarten-to-k5-samples` and `nlp-annotation`) that render custom preview modals on the public site, but their files were hardcoded or dummy. The client requested a workflow where admins can upload real sample files or specify external URLs for each page/tab combination directly from the Admin Panel, supporting any format (.pdf, .zip, .scorm, .mp4, etc.) while preserving the complex interactive layout of these pages.

**What We Did**:

### 8a. Backend Schema & Controller
- Added `pageSlug`, `tabName`, `fileType`, and `isExternal` fields to the `SampleItem` mongoose schema in [sampleItem.js](file:///d:/equourse/eqourse-backend-worktree/eqourse-backend/src/model/sampleItem.js).
- Added a public endpoint `GET /api/samples/files?pageSlug=X&tab=Y` to fetch preview files dynamically, mounted in [index.js](file:///d:/equourse/eqourse-backend-worktree/eqourse-backend/index.js) and handled in [sampleController.js](file:///d:/equourse/eqourse-backend-worktree/eqourse-backend/src/controller/sampleController.js).

### 8b. Premium Admin Panel Editor UI
- Rewrote [SampleEditor.tsx](file:///d:/equourse/website-prototype(eqourse)/eqourse-prototype/src/admin/pages/SampleEditor.tsx) completely to provide:
  - **Mapped Page Selector**: Dropdown showing user-friendly labels (e.g., *K12 Grade (KG-5)*, *NLP Annotation*, etc.) instead of raw slugs.
  - **Dynamic Tab Selector**: Automatically populates with the actual tabs configured for the selected page.
  - **External URL Switch**: Toggle switch to easily switch between file upload and external link URL.
  - **Extension Auto-detection**: Automatically parses file extensions (`.scorm`/`.zip` -> `HTML5`, `.mp4` -> `MP4`, `.pdf` -> `PDF`, etc.) on upload and populates the type.

### 8c. Dynamic Frontend Integration
- Integrated dynamic API fetching via `fetchSampleFiles` from [publicApi.ts](file:///d:/equourse/website-prototype(eqourse)/eqourse-prototype/src/lib/publicApi.ts).
- Connected [InteractiveSampleTabs.tsx](file:///d:/equourse/website-prototype(eqourse)/eqourse-prototype/src/components/samples/content-services/shared/InteractiveSampleTabs.tsx) (Content Services) and [SampleShowcaseGrid.tsx](file:///d:/equourse/website-prototype(eqourse)/eqourse-prototype/src/components/samples/ai-data/shared/SampleShowcaseGrid.tsx) (AI Data Services) to pull uploaded files from the API.
- Maintained a seamless static/dummy data fallback if no custom items have been uploaded in the admin panel for that tab.

---

## What the Vendor Needs to Do Next

### Step 1: Pull Latest `main`
```bash
git checkout feature/eqourse-backend
git pull origin main
# Resolve any merge conflicts
```

### Step 2: Install Dependencies
```bash
cd eqourse-backend
npm install   # This will install multer
```

### Step 3: Set Up Environment
Create/verify `.env` file:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/eqourse
JWT_SECRET=your_secret_key
```

### Step 4: Seed Database
```bash
node scripts/seed.js
```
*Note: The seed script has been updated to automatically register the admin user, seed blog posts, case studies, pilot queries, and set up 2 default Sample Categories (K12 Grade KG-5 and NLP Annotation) along with sample files.*

### Step 5: Test Full Stack
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
npm run dev

# Terminal 3: Start Frontend
cd ../eqourse-prototype
npm run dev
```

### Step 6: Verify
- Open `http://localhost:8080` — public site should load with live data.
- Open `http://localhost:8080/admin` — admin panel should connect to backend.
- Go to **Samples** in admin, select/edit a sample and verify the page and tab mapping dropdowns.
- Go to the public samples page (e.g. `http://localhost:8080/kindergarten-to-k5-samples`), click "Preview Sample" and verify that your uploaded/seeded files appear.

---

## Deployment Notes

1. **File Uploads**: Backend saves files to local `uploads/` directory. For production, either:
   - Ensure this directory is persistent across deployments, OR
   - Switch multer storage to S3/CloudFront.
2. **CORS**: Update `index.js` to include the production domain in the `origin` array.
3. **Static File Serving**: Express serves `/uploads` via `express.static()`. Ensure reverse proxy (Nginx) doesn't block `/uploads/*` requests.
4. **Environment Variables**: Set `VITE_API_BASE_URL` to the production backend URL in the frontend build.
5. **SEO Migration**: Follow the staging → 301 redirect → cutover plan documented in `INTEGRATION_MASTER_PLAN.md`.

---

## File Inventory — All Changes Made

### Frontend Files Changed (push to `main`)
```
CREATED:
  src/admin/lib/apiClient.ts          — HTTP client
  src/admin/lib/apiLive.ts            — Real API implementation
  src/lib/publicApi.ts                — Public API client
  .env.development                    — API base URL config

MODIFIED:
  src/admin/lib/api.ts                — Factory (was mock, now switches mock/live)
  src/admin/lib/apiMock.ts            — Renamed from api.ts
  src/admin/lib/types.ts              — Added relatedLinks to CaseStudy, pageSlug/tabName/fileType/isExternal to Sample
  src/admin/pages/CaseStudyEditor.tsx — Added service links checklist + custom links UI
  src/admin/pages/SampleEditor.tsx    — Rewritten Sample editor with page/tab dropdowns and isExternal switch
  src/components/contact/ContactForm.tsx             — Real API submission
  src/components/free-pilot/FreePilotFormSection.tsx — Real API + file upload via FormData
  src/components/blog/BlogGrid.tsx                   — API-first with static fallback
  src/components/blog/BlogSection.tsx                — API-first with static fallback
  src/components/case-studies/CaseStudyPage.tsx      — API-first with static fallback + relatedLinks
  src/components/samples/content-services/shared/InteractiveSampleTabs.tsx — API-first files mapping
  src/components/samples/ai-data/shared/SampleShowcaseGrid.tsx             — API-first files mapping
  src/pages/BlogPost.tsx                             — API-first with static fallback

UNCHANGED:
  All service pages, sample showcase pages, SEO implementation, styling, shared UI
```

### Backend Files Changed (on `feature/eqourse-backend`)
```
CREATED:
  src/router/adminRouter.js             — Consolidated admin routes
  src/router/caseStudyRouter.js         — Public case study routes
  src/model/caseStudy.js                — Case study schema
  src/controller/caseStudyController.js — Case study CRUD
  src/controller/analyticsController.js — Dashboard analytics
  src/controller/uploadController.js     — File upload (multer)

MODIFIED:
  index.js                              — Route restructuring, mounted /api/samples and /uploads
  src/router/blogRouter.js              — Public-only
  src/router/contactRouter.js           — Public POST only
  src/router/pilotRouter.js             — Public POST + file upload middleware
  src/router/sampleRouter.js            — Flat model routes (added GET /files)
  src/controller/sampleController.js    — Complete rewrite (added listFilesByPage)
  src/controller/pilotController.js     — File attachment handling
  src/middleware/authMiddleware.js       — verifyToken alias
  package.json                          — Added multer
  scripts/seed.js                       — Seed admin, blogs, case studies, pilots, sample categories & sample items

UNTOUCHED:
  src/controller/authController.js, blogController.js, contactController.js
  src/model/admin.js, blog.js, contact_us_queries.js, pilot.js
```
