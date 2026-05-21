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
const Blog = require("../src/model/blog");
const CaseStudy = require("../src/model/caseStudy");
const ContactQuery = require("../src/model/contact_us_queries");
const Pilot = require("../src/model/pilot");
const SampleCategory = require("../src/model/sampleCategory");
const SampleItem = require("../src/model/sampleItem");

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
      password: "Admin@123",
    });
    console.log("👤 Admin user created: admin@eqourse.com / Admin@123");
  }

  // ── 2. Seed Blog Posts ──────────────────────────────────
  const blogCount = await Blog.countDocuments();
  if (blogCount > 0) {
    console.log(`📝 ${blogCount} blog posts already exist, skipping...`);
  } else {
    const blogs = [
      {
        title: "EmSAT Content Solutions: Scalable Test Prep for UAE",
        slug: "emsat-content-solutions-scalable-test-prep-for-uae",
        excerpt: "Explore insights on EmSAT Content Solutions: Scalable Test Prep for UAE and how it impacts the future of education.",
        body: "<h2>Scalable Test Prep</h2><p>EmSAT is the standardized test used across the UAE for university admission. eQOURSE delivers comprehensive test prep content that scales across multiple institutions.</p><h3>Our Approach</h3><p>We partnered with leading UAE universities to develop curriculum-aligned content covering Mathematics, English, Physics, and Computer Science.</p><h3>Results</h3><p>Over 50,000 students benefited from our EmSAT prep content across 200+ institutions.</p>",
        bodyFormat: "html",
        coverImageUrl: "",
        author: { name: "eQOURSE Team", avatarUrl: "" },
        tags: ["Content Services", "Education", "UAE"],
        grade: "",
        subject: "Multiple",
        seo: { title: "EmSAT Content Solutions | eQOURSE", description: "Scalable test prep solutions for UAE education." },
        status: "published",
        publishedAt: new Date("2026-04-10"),
        is_featured: true,
      },
      {
        title: "AI Data Collection for NLP: Multilingual Challenges",
        slug: "ai-data-collection-for-nlp-multilingual-challenges",
        excerpt: "How eQOURSE handles multilingual data collection for training NLP models across 30+ languages.",
        body: "<h2>The Multilingual Challenge</h2><p>Building NLP models that work across languages requires diverse, high-quality training data. eQOURSE specializes in collecting and annotating text data across 30+ languages.</p><h3>Data Quality</h3><p>Our annotation teams are native speakers with domain expertise, ensuring cultural nuance and accuracy.</p>",
        bodyFormat: "html",
        author: { name: "eQOURSE Team", avatarUrl: "" },
        tags: ["AI Data", "NLP", "Multilingual"],
        subject: "AI/ML",
        seo: { title: "AI Data Collection for NLP | eQOURSE", description: "Multilingual data collection challenges and solutions." },
        status: "published",
        publishedAt: new Date("2026-04-15"),
        is_featured: false,
      },
    ];
    for (const blogData of blogs) {
      await Blog.create(blogData);
    }
    console.log("📝 2 blog posts seeded");
  }

  // ── 3. Seed Case Studies ────────────────────────────────
  const csCount = await CaseStudy.countDocuments();
  if (csCount > 0) {
    console.log(`📊 ${csCount} case studies already exist, skipping...`);
  } else {
    const caseStudies = [
      {
        title: "K-12 Worksheets & PPT Solutions for 2,000+ Schools",
        slug: "k12-worksheets-ppt-solutions-2000-schools",
        client: "Pan-India Education Company",
        industry: "K-12 Education",
        summary: "High-level worksheets and PPT solutions for 2,000+ schools across multiple state boards.",
        challenge: "A company with 2000+ Schools needed high-quality worksheets and PPT solutions for classes 1 to 10.",
        solution: "We created worksheets exceeding NCERT+ level with detailed PPT solutions for multiple state boards.",
        results: "Worksheets improved student performance. We became their trusted partner for quality content.",
        metrics: [
          { label: "Schools Served", value: "2,000+" },
          { label: "Classes Covered", value: "1–10" },
          { label: "State Boards", value: "Multiple" },
        ],
        tags: ["Content Service", "K12", "Worksheets"],
        status: "published",
        publishedAt: new Date("2026-03-01"),
      },
    ];
    await CaseStudy.insertMany(caseStudies);
    console.log("📊 1 case study seeded");
  }

  // ── 4. Seed Sample Contact Query ───────────────────────
  const contactCount = await ContactQuery.countDocuments();
  if (contactCount > 0) {
    console.log(`📬 ${contactCount} contact queries already exist, skipping...`);
  } else {
    await ContactQuery.create({
      name: "Test User",
      email: "test@example.com",
      phone: "+91-9876543210",
      company: "Test Corp",
      subject: "Content Development Inquiry",
      message: "We need K-12 content development for our platform. Can you help?",
      source: "website-contact-form",
    });
    console.log("📬 1 sample contact query seeded");
  }

  // ── 5. Seed Sample Pilot Query ─────────────────────────
  const pilotCount = await Pilot.countDocuments();
  if (pilotCount > 0) {
    console.log(`🚀 ${pilotCount} pilot queries already exist, skipping...`);
  } else {
    await Pilot.create({
      name: "Demo Client",
      email: "demo@example.com",
      phone: "+1-555-0100",
      company: "Demo AI Corp",
      role: "Product Manager",
      serviceInterest: "ai-data",
      projectScope: "We need 10,000 annotated images for our computer vision model.",
      timeline: "2-3 months",
      languages: "English, Hindi",
      message: "Looking for a free pilot to test your annotation quality.",
      source: "website-pilot-form",
    });
    console.log("🚀 1 sample pilot query seeded");
  }

  // ── 6. Seed Sample Categories & Items ───────────────────
  const catCount = await SampleCategory.countDocuments();
  if (catCount > 0) {
    console.log(`📂 ${catCount} sample categories already exist, skipping...`);
  } else {
    // K-12 Grade KG-5 Category
    const k5Category = await SampleCategory.create({
      name: "K12 Grade (KG-5)",
      slug: "kindergarten-to-k5-samples",
      description: "Age-appropriate content for early learners with interactive activities.",
      thumbnailUrl: "",
      order: 1,
    });

    // NLP Annotation Category
    const nlpCategory = await SampleCategory.create({
      name: "NLP Annotation",
      slug: "nlp-annotation",
      description: "Gold standard entity annotation, sentiment parsing and relationship extraction.",
      thumbnailUrl: "",
      order: 2,
    });

    console.log("📂 2 sample categories seeded");

    // Seed Sample Items
    await SampleItem.create({
      categoryId: k5Category._id,
      title: "KG-5 Environmental Studies Chapter 1",
      type: "Course Book",
      description: "Sample course book chapter on flora and fauna for grade 3.",
      thumbnailUrl: "",
      fileUrl: "/uploads/samples/evs-grade-3-ch1.pdf",
      fileSize: 120456,
      order: 1,
      pageSlug: "kindergarten-to-k5-samples",
      tabName: "Course Book",
      fileType: "PDF",
      isExternal: false,
    });

    await SampleItem.create({
      categoryId: nlpCategory._id,
      title: "CoNLL Named Entity Recognition Core Dataset",
      type: "Named Entity Recognition (NER)",
      description: "Subset of 500 English news articles tagged with PERSON, ORG, LOC.",
      thumbnailUrl: "",
      fileUrl: "https://github.com/eQOURSE/sample-datasets/raw/main/conll_ner.json",
      fileSize: 450900,
      order: 1,
      pageSlug: "nlp-annotation",
      tabName: "Named Entity Recognition (NER)",
      fileType: "JSON",
      isExternal: true,
    });

    console.log("📄 2 sample items seeded");
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
