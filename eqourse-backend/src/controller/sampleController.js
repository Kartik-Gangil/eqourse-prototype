const SampleItem = require("../model/sampleItem");

// ─────────────────────────────────────────────
// CATEGORY HELPERS
// ─────────────────────────────────────────────

/**
 * GET /api/samples/categories
 * Public — returns all unique category names from the database
 */
const listCategories = async (req, res) => {
  try {
    const categories = await SampleItem.distinct("category");
    return res.json({ success: true, data: categories });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// SAMPLE ITEM CRUD (One document per Category)
// ─────────────────────────────────────────────

/**
 * GET /api/samples/items
 * Public — list all category documents or filter by category name
 * Query params: ?category=articulate-storyline-video-samples
 */
const listItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category.toLowerCase().trim();
    }

    const items = await SampleItem.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/samples/items/:id
 * Public — get a single category document by ID
 */
const getItem = async (req, res) => {
  try {
    const item = await SampleItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Category samples not found" });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/samples/items
 * Admin — create a new category sample document
 * Body: { category, tabs: [ { tab_name, order, text, boolean_points, samples: [ { name, url, desc, format } ] } ] }
 */
const createItem = async (req, res) => {
  try {
    const { category, tabs } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category name is required",
      });
    }

    // Optional: Check if category already exists if you want 1 doc per category
    const existing = await SampleItem.findOne({ category: category.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists. Use PATCH to update it.",
      });
    }

    const item = await SampleItem.create({
      category: category.toLowerCase().trim(),
      tabs: tabs || [],
    });

    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/samples/items/:id
 * Admin — update a category sample document
 */
const updateItem = async (req, res) => {
  try {
    if (req.body.category) {
      req.body.category = req.body.category.toLowerCase().trim();
    }

    const item = await SampleItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/samples/items/:id
 * Admin — delete a category sample document
 */
const deleteItem = async (req, res) => {
  try {
    const item = await SampleItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    return res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  listCategories,
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
