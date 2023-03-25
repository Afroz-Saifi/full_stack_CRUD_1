const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    subject: String,
    tags: Array,
    caption: String,
    userId: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const storyModel = mongoose.model("stories", storySchema);

module.exports = { storyModel };
