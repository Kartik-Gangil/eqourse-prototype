const mongoose = require("mongoose");

const contactQuerySchema = new mongoose.Schema(
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
    phone_code: {
      type: String,
      default: "+91",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    preferred_date: {
      type: String, // stored as YYYY-MM-DD string
      default: null,
    },
    preferred_time: {
      type: String, // e.g. "10:30"
      default: null,
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

module.exports = mongoose.model("ContactQuery", contactQuerySchema);
