const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: String,
  description: String,
  date: String,
  points: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  points: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema],
});

module.exports = mongoose.model("User", userSchema);
