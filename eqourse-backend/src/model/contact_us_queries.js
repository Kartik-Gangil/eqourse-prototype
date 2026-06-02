const mongoose = require("mongoose");

const contactQuerySchema = new mongoose.Schema(
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
    phone_code: {
      type: String,
      default: "+91",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    subject: {
      type: String,
      required: true,
      trim: true,
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
