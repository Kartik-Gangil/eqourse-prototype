const mongoose = require("mongoose");

const pilotQuerySchema = new mongoose.Schema(
  {
    full_name: {
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
    company: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    pilot_type: {
      type: String,
      required: true,
    },
    service_detail: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
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
