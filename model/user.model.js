const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    age: Number,
    email: { type: String, unique: true },
    password: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
