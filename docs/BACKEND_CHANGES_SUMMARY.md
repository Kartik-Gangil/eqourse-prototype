# Backend Changes Summary — For Vendor Review

> **Date**: 2026-05-21  
> **Changed by**: eQOURSE project owner  
> **Branch**: Changes made in git worktree from `feature/eqourse-backend`  
> **Purpose**: Restructure backend routes to match frontend API contract, add missing modules

---

## Why These Changes Were Made

The frontend React application (on `main` branch) expects specific API routes and response formats. The original backend routes didn't match, and several modules were missing entirely. We restructured the backend so that:

1. All admin routes are consolidated under `/api/admin/*`
2. Public routes remain at their original paths
3. Missing modules (Case Studies, Analytics, File Uploads) are now implemented
4. Sample model is restructured from nested tabs to flat SampleCategory + SampleItem

---

## New Route Structure

### Public Routes (No Authentication)

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

### Admin Routes (JWT Required — all under `/api/admin/*`)

```
POST   /api/admin/login                      → Admin login (was /api/auth/login)

GET    /api/admin/analytics/summary          → Dashboard analytics [NEW]

GET    /api/admin/blogs                      → List all blogs (was /api/blogs/admin/all)
GET    /api/admin/blogs/:id                  → Get blog by ID (was /api/blogs/admin/:id)
POST   /api/admin/blogs                      → Create blog (was /api/blogs/admin)
PATCH  /api/admin/blogs/:id                  → Update blog
PATCH  /api/admin/blogs/:id/status           → Change publish status
DELETE /api/admin/blogs/:id                  → Delete blog

GET    /api/admin/case-studies               → List all case studies [NEW]
GET    /api/admin/case-studies/:id           → Get case study by ID [NEW]
POST   /api/admin/case-studies               → Create case study [NEW]
PATCH  /api/admin/case-studies/:id           → Update case study [NEW]
PATCH  /api/admin/case-studies/:id/status    → Change publish status [NEW]
DELETE /api/admin/case-studies/:id           → Delete case study [NEW]

GET    /api/admin/contact-queries            → List queries (was /api/contact GET)
GET    /api/admin/contact-queries/:id        → Get query (was /api/contact/:id)
PATCH  /api/admin/contact-queries/:id        → Update query
DELETE /api/admin/contact-queries/:id        → Delete query

GET    /api/admin/pilot-queries              → List queries (was /api/pilot GET)
GET    /api/admin/pilot-queries/:id          → Get query (was /api/pilot/:id)
PATCH  /api/admin/pilot-queries/:id          → Update query
DELETE /api/admin/pilot-queries/:id          → Delete query

GET    /api/admin/sample-categories          → List categories [CHANGED]
GET    /api/admin/sample-categories/:id      → Get category [CHANGED]
POST   /api/admin/sample-categories          → Create category [CHANGED]
PATCH  /api/admin/sample-categories/:id      → Update category [CHANGED]
DELETE /api/admin/sample-categories/:id      → Delete category [CHANGED]

GET    /api/admin/sample-categories/:categoryId/samples  → List samples in category [CHANGED]
GET    /api/admin/samples/:id                → Get sample [CHANGED]
POST   /api/admin/sample-categories/:categoryId/samples  → Create sample [CHANGED]
PATCH  /api/admin/samples/:id                → Update sample [CHANGED]
DELETE /api/admin/samples/:id                → Delete sample [CHANGED]

POST   /api/admin/uploads                    → Upload file (multipart) [NEW]
```

---

## Files Changed

### New Files Created

| File | Purpose |
|------|---------|
| `src/router/adminRouter.js` | Consolidated admin router — ALL admin routes in one file with JWT middleware |
| `src/router/caseStudyRouter.js` | Public case study routes |
| `src/model/caseStudy.js` | Mongoose schema for case studies |
| `src/controller/caseStudyController.js` | Full CRUD for case studies |
| `src/controller/analyticsController.js` | Dashboard summary endpoint |
| `src/controller/uploadController.js` | File upload with multer |

### Modified Files

| File | What Changed |
|------|-------------|
| `index.js` | Route mounting restructured. Pilot renamed `/api/pilot` → `/api/free-pilot`. Added `/api/admin` mount. Added static file serving for uploads. |
| `src/router/blogRouter.js` | Simplified to public-only routes (admin routes moved to adminRouter.js) |
| `src/router/contactRouter.js` | Simplified to public POST only |
| `src/router/pilotRouter.js` | Simplified to public POST only |
| `src/router/sampleRouter.js` | Simplified to public routes with new flat model |
| `src/controller/sampleController.js` | **Complete rewrite** — flat SampleCategory + SampleItem model replaces nested tabs |
| `src/middleware/authMiddleware.js` | Added `verifyToken` export alias (same as `protect`) |
| `package.json` | Added `multer` dependency |

### Files NOT Changed (your code is safe)

- `src/controller/authController.js` — login/register logic unchanged
- `src/controller/blogController.js` — all blog CRUD unchanged
- `src/controller/contactController.js` — all contact CRUD unchanged
- `src/controller/pilotController.js` — all pilot CRUD unchanged
- `src/model/admin.js` — admin schema unchanged
- `src/model/blog.js` — blog schema unchanged
- `src/model/contact_us_queries.js` — contact schema unchanged
- `src/model/pilot.js` — pilot schema unchanged

---

## Sample Model Change (Important!)

The old sample model used a **nested tabs structure**:
```js
// OLD: One document per category with nested tabs
{
  category: "k12-sample",
  tabs: [
    { tab_name: "Interactive Modules", samples: [{ name, url, desc }] }
  ]
}
```

The new model uses a **flat structure** matching the frontend TypeScript types:
```js
// NEW: Separate SampleCategory and SampleItem collections
// SampleCategory:
{ name, slug, description, thumbnailUrl, order }

// SampleItem:
{ categoryId: ObjectId, title, type, description, thumbnailUrl, fileUrl, fileSize, order }
```

**This means existing sample data will NOT be compatible.** You'll need to re-seed sample data after this change.

---

## New Dependency

```
multer: ^1.4.5-lts.2
```

Run `npm install` after pulling these changes.

---

## How to Test

1. Pull the updated code
2. Run `npm install` (for multer)
3. Start MongoDB: `mongod`
4. Create `.env` file:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/eqourse
   JWT_SECRET=your_secret_key
   ```
5. Run `npm run dev`
6. Register an admin user using `scratch/register-admin.js`
7. Test endpoints with Postman or curl:

```bash
# Health check
curl http://localhost:5001/

# Admin login
curl -X POST http://localhost:5001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eqourse.com","password":"admin123"}'

# Use the returned token for admin requests:
curl http://localhost:5001/api/admin/blogs \
  -H "Authorization: Bearer YOUR_TOKEN"

# Submit contact form (public)
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test inquiry"}'
```

---

## Questions for Vendor

1. Do you have any existing sample data that needs to be migrated to the new flat model?
2. Are there any other routes or endpoints you've added that aren't documented here?
3. Please confirm the MongoDB database name you're using (we assume `eqourse`).
