const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ── Routers ──────────────────────────────────────────────────────────────────
// Public routers (no auth required)
const contactRouter = require("./src/router/contactRouter");
const pilotRouter = require("./src/router/pilotRouter");
const blogRouter = require("./src/router/blogRouter");
const caseStudyRouter = require("./src/router/caseStudyRouter");
const sampleRouter = require("./src/router/sampleRouter");

// Admin router (JWT auth on all sub-routes except /login)
const adminRouter = require("./src/router/adminRouter");

// Upload directory for static file serving
const { UPLOAD_DIR } = require("./src/controller/uploadController");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174",
    // Add staging/production domains here when ready
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve uploaded files
app.use("/uploads", express.static(UPLOAD_DIR));

// ── Public Routes ────────────────────────────────────────────────────────────
app.use("/api/contact", contactRouter);       // POST /api/contact (public submit)
app.use("/api/free-pilot", pilotRouter);       // POST /api/free-pilot (public submit)
app.use("/api/blogs", blogRouter);             // GET /api/blogs, GET /api/blogs/:slug
app.use("/api/case-studies", caseStudyRouter); // GET /api/case-studies, GET /api/case-studies/:slug
app.use("/api/sample-categories", sampleRouter); // GET /api/sample-categories
app.use("/api/samples", sampleRouter);           // GET /api/samples, GET /api/samples/files

// ── Admin Routes ─────────────────────────────────────────────────────────────
app.use("/api/admin", adminRouter);            // All admin routes under /api/admin/*

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ status: "eQOURSE backend is running", version: "2.0.0" }));

// ── DB + Start ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected:", MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
