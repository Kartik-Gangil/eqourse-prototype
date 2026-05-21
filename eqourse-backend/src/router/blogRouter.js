/**
 * Public Blog Router
 *
 * GET /api/blogs         → list published blogs
 * GET /api/blogs/:slug   → get published blog by slug
 *
 * Admin routes are in adminRouter.js under /api/admin/blogs/*
 */

const express = require("express");
const router = express.Router();
const { listPublishedBlogs, getPublishedBlogBySlug } = require("../controller/blogController");

router.get("/", listPublishedBlogs);
router.get("/:slug", getPublishedBlogBySlug);

module.exports = router;
