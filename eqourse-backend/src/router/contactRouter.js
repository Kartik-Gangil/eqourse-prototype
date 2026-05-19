const express = require("express");
const router = express.Router();
const {
  submitContactQuery,
  getAllContactQueries,
  getContactQuery,
  updateContactQuery,
  deleteContactQuery,
} = require("../controller/contactController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/contact  — save form data (public)
router.post("/", submitContactQuery);

// GET /api/contact   — retrieve all queries with filters (admin)
// Query params: ?status=new&q=search&page=1&pageSize=25&from=YYYY-MM-DD&to=YYYY-MM-DD
router.get("/", protect, getAllContactQueries);

// GET /api/contact/:id — get single query (admin)
router.get("/:id", protect, getContactQuery);

// PATCH /api/contact/:id — update query status/notes (admin)
router.patch("/:id", protect, updateContactQuery);

// DELETE /api/contact/:id — delete query (admin)
router.delete("/:id", protect, deleteContactQuery);

module.exports = router;
