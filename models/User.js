const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10000000,
    max: 90000000,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
