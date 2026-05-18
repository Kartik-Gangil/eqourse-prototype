const express = require("express");
const router = express.Router();
const { submitContactQuery, getAllContactQueries, updateContactQuery, deleteContactQuery } = require("../controller/contactController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/contact  — save form data (public)
router.post("/", submitContactQuery);

// GET /api/contact   — retrieve all queries (protected admin)
router.get("/", protect, getAllContactQueries);

// PATCH /api/contact/:id — update query status/notes (protected admin)
router.patch("/:id", protect, updateContactQuery);

// DELETE /api/contact/:id — delete query (protected admin)
router.delete("/:id", protect, deleteContactQuery);

module.exports = router;
