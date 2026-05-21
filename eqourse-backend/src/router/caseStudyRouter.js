/**
 * Public Case Study Router
 *
 * GET /api/case-studies         → list published case studies
 * GET /api/case-studies/:slug   → get published case study by slug
 */

const express = require("express");
const router = express.Router();
const {
  listPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} = require("../controller/caseStudyController");

router.get("/", listPublishedCaseStudies);
router.get("/:slug", getPublishedCaseStudyBySlug);

module.exports = router;
