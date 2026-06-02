/**
 * Public Contact Router
 *
 * POST /api/contact  → submit contact form (public)
 *
 * Admin routes are in adminRouter.js under /api/admin/contact-queries/*
 */

const express = require("express");
const router = express.Router();
const { submitContactQuery } = require("../controller/contactController");

router.post("/", submitContactQuery);

module.exports = router;
