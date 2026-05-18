const express = require("express");
const router = express.Router();
const {
  listCategories,
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/sampleController");
const { protect } = require("../middleware/authMiddleware");

// ── Categories ──────────────────────────────────────────────
// GET  /api/samples/categories
// Public — returns the predefined list of category slugs (no DB, matches frontend pages)
router.get("/categories", listCategories);

// ── Items ───────────────────────────────────────────────────
// GET  /api/samples/items               → public
// Query params: ?category=articulate-storyline-video-samples&tab=Interactive+Modules&status=published
router.get("/items", listItems);

// GET  /api/samples/items/:id           → public
router.get("/items/:id", getItem);

// POST /api/samples/items               → admin only
router.post("/items", protect, createItem);

// PATCH /api/samples/items/:id          → admin only
router.patch("/items/:id", protect, updateItem);

// DELETE /api/samples/items/:id         → admin only
router.delete("/items/:id", protect, deleteItem);

module.exports = router;
