const mongoose = require("mongoose");

const pilotQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    // serviceInterest: what area of service they want a pilot for
    serviceInterest: {
      type: String,
      enum: ["ai-data", "edtech", "localization", "content-services", "other"],
      required: true,
    },
    // projectScope: detailed description of the project/scope
    projectScope: {
      type: String,
      required: true,
      trim: true,
    },
    // timeline: e.g. "2 weeks", "1 month"
    timeline: {
      type: String,
      trim: true,
      default: "",
    },
    languages: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    attachment: {
      url: String,
      originalName: String,
      size: Number,
      mimeType: String,
    },
    internal_notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PilotQuery", pilotQuerySchema);
