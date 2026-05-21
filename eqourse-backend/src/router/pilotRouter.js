/**
 * Public Free Pilot Router
 *
 * POST /api/free-pilot  → submit free pilot form (public)
 *
 * Admin routes are in adminRouter.js under /api/admin/pilot-queries/*
 */

const express = require("express");
const router = express.Router();
const { submitPilotQuery } = require("../controller/pilotController");
const { uploadMiddleware } = require("../controller/uploadController");

// The frontend will send a multipart/form-data request with an optional "file" field.
router.post("/", uploadMiddleware, submitPilotQuery);

module.exports = router;
