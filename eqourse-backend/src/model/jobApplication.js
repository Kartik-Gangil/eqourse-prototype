const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobOpening",
      required: true,
      index: true,
    },
    receiptId: { type: String, unique: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    experience: { type: String, trim: true, default: "" },
    currentRole: { type: String, trim: true, default: "" },
    qualification: { type: String, trim: true, default: "" },
    portfolioLink: { type: String, trim: true, default: "" },
    resumeDriveLink: { type: String, trim: true, default: "" },
    resumeFile: {
      url: String,
      originalName: String,
      size: Number,
      mimeType: String,
    },
    coverLetter: { type: String, trim: true, default: "" },
    skills: [{ type: String, trim: true }],

    // Dynamic answers mapped from JobOpening customQuestions
    customAnswers: [{
      questionLabel: { type: String, required: true },
      answerValue: { type: mongoose.Schema.Types.Mixed, required: true }
    }],

    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
    internalNotes: { type: String, default: "" },
    statusChangedAt: { type: Date },
  },
  { timestamps: true }
);

// Prevent duplicate applications: same email + same job
jobApplicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

// Auto-generate receipt ID before save
jobApplicationSchema.pre("save", async function () {
  if (!this.receiptId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("JobApplication").countDocuments();
    this.receiptId = `EQ-${year}-${String(count + 1).padStart(4, "0")}`;
  }
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
