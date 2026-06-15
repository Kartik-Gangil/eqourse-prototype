/**
 * Script to fix blog cover image paths.
 * Updates `/uploads/` to `/api/uploads/` in every blog's `coverImageUrl`.
 *
 * Run it with:
 *   node scripts/imgfix.js
 */

const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";
const Blog = require("../src/model/blog");

async function run() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected:", MONGO_URI);

  console.log("🔍 Fetching all blogs...");
  const blogs = await Blog.find({});
  console.log(`Found ${blogs.length} blogs.`);

  let updatedCount = 0;

  for (const blog of blogs) {
    const oldUrl = blog.coverImageUrl;
    if (oldUrl && oldUrl.includes("/uploads/") && !oldUrl.includes("/api/uploads/")) {
      const newUrl = oldUrl.replace("/uploads/", "/api/uploads/");
      blog.coverImageUrl = newUrl;
      await blog.save();
      console.log(`✏️ Updated blog: "${blog.title}"`);
      console.log(`   Before: ${oldUrl}`);
      console.log(`   After:  ${newUrl}\n`);
      updatedCount++;
    }
  }

  console.log(`\n✅ Done! Updated ${updatedCount} blogs.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
