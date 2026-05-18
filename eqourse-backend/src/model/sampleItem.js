const mongoose = require("mongoose");

const sampleItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tabs: [{
      tab_name: {
        type: String,
        required: true,
        trim: true,
      },
      order: {
        type: Number,
      },
      text:{
        type: String,
        trim: true,
      },
      boolean_points:{
        type: [String],
        trim: true,
      },
      samples:[{
        name:{
          type:String
        },
        url:{
          type:String
        },
        desc:{
          type:String
        },
        format:{
          type:String
        }
      }]
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SampleItem", sampleItemSchema);
