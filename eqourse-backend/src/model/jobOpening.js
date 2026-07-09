const mongoose = require("mongoose");

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: [
        "ai-data",
        "content-services",
        "operations",
        "marketing",
        "technology",
        "hr",
        "other",
      ],
    },
    location: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    experienceRange: { type: String, trim: true, default: "" },
    description: { type: String, required: true },
    responsibilities: [{ type: String, trim: true }],
    requirements: {
      type: [String],
      default: [],
    },
    niceToHave: {
      type: [String],
      default: [],
    },
    customQuestions: [{
      label: { type: String, required: true },
      type: { type: String, enum: ["text", "textarea", "select", "checkbox", "radio", "url"], required: true },
      required: { type: Boolean, default: false },
      options: { type: [String], default: [] } // Used for select, checkbox, radio
    }],
    salaryRange: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["active", "paused", "closed"],
      default: "active",
    },
    applicationCount: { type: Number, default: 0 },
    postedAt: { type: Date, default: Date.now },
    closingDate: { type: Date },
  },
  { timestamps: true }
);

// Text index for search
jobOpeningSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model("JobOpening", jobOpeningSchema);
