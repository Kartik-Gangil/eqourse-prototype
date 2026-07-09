/**
 * Quick seed script — registers an admin user and creates sample data.
 * Run once after setting up MongoDB:
 *   node scripts/seed.js
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

// ── Import models ────────────────────────────────────────
const Admin = require("../src/model/admin");

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected:", MONGO_URI);

  // ── 1. Create Admin User ────────────────────────────────
  const existingAdmin = await Admin.findOne({ email: "admin@eqourse.com" });
  if (existingAdmin) {
    console.log("👤 Admin user already exists, skipping...");
  } else {
    await Admin.create({
      username: "eqourseadmin",
      email: "admin@eqourse.com",
      password: "AdminEquorse@123",
    });
    console.log("👤 Admin user created: admin@eqourse.com / Admin@123");
  }

  console.log("\n✅ Seed complete!");
  console.log("   Admin login: admin@eqourse.com / Admin@123");
  console.log("   Backend URL: http://localhost:5001");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
