const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: String,
  points: Number,
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  points: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

module.exports = mongoose.model("User", userSchema);
