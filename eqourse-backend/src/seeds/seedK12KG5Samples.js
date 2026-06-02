/**
 * Seed: K12 Grade (KG-5) Sample Items (New Nested Schema)
 * Category: kindergarten-to-k5-samples
 * Structure: 1 Document per Category with nested Tabs and Samples
 *
 * Run: node src/seeds/seedK12KG5Samples.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const SampleItem = require("../model/sampleItem");

const CATEGORY = "kindergarten-to-k5-samples";

const categoryData = {
  category: CATEGORY,
  tabs: [
    {
      tab_name: "Course Book",
      order: 1,
      text: "Curated Course Book samples from our k12 grade (kg-5) library — production-ready, curriculum-aligned, and ready to customize for your platform.",
      boolean_points: [
        "Curriculum-aligned content",
        "Ready for LMS integration",
        "Engaging visual design"
      ],
      samples: [
        {
          name: "Mathematics Course Book – Grade 1",
          url: "https://example.com/samples/kg5/course-book-math-grade1.pdf",
          desc: "CBSE/NCERT aligned numbers, addition, subtraction.",
          format: "PDF"
        },
        {
          name: "Environmental Studies – Grade 3",
          url: "https://example.com/samples/kg5/course-book-evs-grade3.pdf",
          desc: "Family, plants, animals, and environment modules.",
          format: "PDF"
        }
      ]
    },
    {
      tab_name: "Lesson Plan",
      order: 2,
      text: "Detailed pedagogical structures for teachers, ensuring clear learning objectives and engagement strategies.",
      boolean_points: [
        "Structured learning objectives",
        "Warm-up and practice activities",
        "Assessment rubrics included"
      ],
      samples: [
        {
          name: "Intro to Fractions (Grade 4)",
          url: "https://example.com/samples/kg5/lesson-plan-fractions-grade4.pdf",
          desc: "45-minute structured lesson with assessment.",
          format: "PDF"
        },
        {
          name: "Plants & Their Parts (Grade 2)",
          url: "https://example.com/samples/kg5/lesson-plan-plants-grade2.pdf",
          desc: "Science lesson with hands-on activities.",
          format: "PDF"
        }
      ]
    },
    {
      tab_name: "Work Book",
      order: 3,
      text: "Comprehensive practice materials designed to reinforce learning through varied exercises.",
      boolean_points: [
        "50+ practice exercises per book",
        "Graded difficulty levels",
        "Answer keys provided"
      ],
      samples: [
        {
          name: "Maths Practice Workbook – Grade 2",
          url: "https://example.com/samples/kg5/workbook-math-grade2.pdf",
          desc: "Addition, subtraction, and time exercises.",
          format: "PDF"
        }
      ]
    }
  ]
};

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";
    await mongoose.connect(mongoUri);
    console.log("✅  Connected to MongoDB:", mongoUri);

    // Remove existing items for this category
    const deleted = await SampleItem.deleteMany({ category: CATEGORY });
    console.log(`\uD83D\uDDD1\uFE0F  Removed ${deleted.deletedCount} existing documents for "${CATEGORY}"`);

    const inserted = await SampleItem.create(categoryData);
    console.log(`\u2728  Inserted new category document for "${CATEGORY}":`);
    console.log(`   - Tabs: ${inserted.tabs.length}`);
    inserted.tabs.forEach(t => {
       console.log(`     \u2022 [${t.tab_name}] - ${t.samples.length} samples`);
    });

    await mongoose.disconnect();
    console.log("🔌  Disconnected. Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
