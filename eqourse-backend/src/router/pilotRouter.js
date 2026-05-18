const express = require("express");
const router = express.Router();
const { submitPilotQuery, getAllPilotQueries, updatePilotQuery, deletePilotQuery } = require("../controller/pilotController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/pilot  — save form data (public)
router.post("/", submitPilotQuery);

// GET /api/pilot   — retrieve all queries (protected admin)
router.get("/", protect, getAllPilotQueries);

// PATCH /api/pilot/:id — update query status/notes (protected admin)
router.patch("/:id", protect, updatePilotQuery);

// DELETE /api/pilot/:id — delete query (protected admin)
router.delete("/:id", protect, deletePilotQuery);

module.exports = router;
