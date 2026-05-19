const express = require("express");
const router = express.Router();
const {
  listPublishedBlogs,
  getPublishedBlogBySlug,
  adminListBlogs,
  adminGetBlogById,
  createBlog,
  updateBlog,
  setBlogStatus,
  deleteBlog,
} = require("../controller/blogController");
const { protect } = require("../middleware/authMiddleware");

// ── Public Routes ───────────────────────────────────────────
// GET  /api/blogs        → list all published blog posts
router.get("/", listPublishedBlogs);

// GET  /api/blogs/:slug  → get a published blog post details by slug
router.get("/:slug", getPublishedBlogBySlug);

// ── Admin Routes (Protected) ────────────────────────────────
// GET    /api/blogs/admin       → admin list all blogs (any status)
router.get("/admin/all", protect, adminListBlogs);

// GET    /api/blogs/admin/:id   → admin get single blog post by ID
router.get("/admin/:id", protect, adminGetBlogById);

// POST   /api/blogs/admin       → admin create blog post
router.post("/admin", protect, createBlog);

// PATCH  /api/blogs/admin/:id   → admin update blog post
router.patch("/admin/:id", protect, updateBlog);

// PATCH  /api/blogs/admin/:id/status → admin update publish status
router.patch("/admin/:id/status", protect, setBlogStatus);

// DELETE /api/blogs/admin/:id   → admin delete blog post
router.delete("/admin/:id", protect, deleteBlog);

module.exports = router;
