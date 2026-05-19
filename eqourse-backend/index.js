const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRouter = require("./src/router/contactRouter");
const authRouter = require("./src/router/authRouter");
const pilotRouter = require("./src/router/pilotRouter");
const sampleRouter = require("./src/router/sampleRouter");
const blogRouter = require("./src/router/blogRouter");

const app = express()

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/pilot", pilotRouter);
app.use("/api/samples", sampleRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => res.json({ status: "eQOURSE backend is running" }));

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
