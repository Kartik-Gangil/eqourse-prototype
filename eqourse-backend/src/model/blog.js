const { number } = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    headline: { type: String, required: true },
    author: {
        type: String,
        trim: true,
    },
    content: { type: String, required: true },
    featured_image: { type: String },
    grade: {
        type: String,
        enum: ['4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    board_course: {
      type: String,
    },
    subject: {
        type: String,
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "approved", "rejected"],
            message: '{VALUE} is not a valid status. Use "pending", "approved", or "rejected"'
        },
        default: 'pending',
    },
    reject_reason: {
        type: String,
        trim: true,
    },
    meta: {
        description: String,
        keywords: [String],
        title: String,
    },
    view_count: {
        type: Number,
        default: 0,
    },
    is_featured: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("blog", blogSchema);
