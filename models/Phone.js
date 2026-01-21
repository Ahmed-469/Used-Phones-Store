const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  phoneName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  usageDuration: {
    type: String, 
    enum: ["Less than 6 months", "6-12 months", "1-2 years", "More than 2 years"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
  },
 
  description: String,
  available: Boolean,

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone