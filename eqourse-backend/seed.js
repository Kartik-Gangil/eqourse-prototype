require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./src/model/blog");
const CaseStudy = require("./src/model/caseStudy");
const SampleCategory = require("./src/model/sampleCategory");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Seed dummy blog
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.create({
        title: "The Future of E-Learning: AI and Beyond",
        slug: "the-future-of-elearning-ai",
        category: "EdTech Trends",
        author: { name: "Sarah Jenkins" },
        content: "<p>E-learning is evolving rapidly with AI...</p>",
        excerpt: "Discover how AI is changing education.",
        status: "published"
      });
      console.log("Seeded dummy blog.");
    }

    // Seed dummy case study
    const caseCount = await CaseStudy.countDocuments();
    if (caseCount === 0) {
      await CaseStudy.create({
        title: "How We Increased Engagement by 40% for XYZ Corp",
        slug: "xyz-corp-engagement",
        clientName: "XYZ Corp",
        category: "Corporate Training",
        content: "<p>We implemented microlearning modules...</p>",
        excerpt: "A deep dive into corporate training success.",
        status: "published"
      });
      console.log("Seeded dummy case study.");
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
