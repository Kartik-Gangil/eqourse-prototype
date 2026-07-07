const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getActiveJobOpenings,
  getJobOpeningBySlug,
  submitApplication,
} = require("../controller/careerController");

// ─── Multer config for resume uploads ────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const resumeDir = path.join(UPLOAD_DIR, "resumes");
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Word documents are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ─── Public Routes ───────────────────────────────────────────────────────
router.get("/", getActiveJobOpenings);
router.get("/:slug", getJobOpeningBySlug);
router.post("/:jobId/apply", upload.single("resume"), submitApplication);

module.exports = router;
