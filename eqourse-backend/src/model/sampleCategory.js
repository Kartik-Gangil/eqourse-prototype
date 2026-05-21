const mongoose = require("mongoose");

const sampleCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

sampleCategorySchema.index({ order: 1 });

module.exports = mongoose.model("SampleCategory", sampleCategorySchema);
