const express = require("express");
const router = express.Router();
const {
  submitPilotQuery,
  getAllPilotQueries,
  getPilotQuery,
  updatePilotQuery,
  deletePilotQuery,
} = require("../controller/pilotController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/pilot  — save form data (public)
router.post("/", submitPilotQuery);

// GET /api/pilot   — retrieve all queries with filters (admin)
// Query params: ?status=new&serviceInterest=ai-data&q=search&page=1&pageSize=25&from=YYYY-MM-DD&to=YYYY-MM-DD
router.get("/", protect, getAllPilotQueries);

// GET /api/pilot/:id — get single query (admin)
router.get("/:id", protect, getPilotQuery);

// PATCH /api/pilot/:id — update query status/notes (admin)
router.patch("/:id", protect, updatePilotQuery);

// DELETE /api/pilot/:id — delete query (admin)
router.delete("/:id", protect, deletePilotQuery);

module.exports = router;
