const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user by email
router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Claim points (earn points)
router.post("/claim", async (req, res) => {
  const { email, reward } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Add points instead of deducting
    user.points += reward.cost;

    // Add transaction history
    user.transactions.push({
      type: "Earned",
      description: reward.title,
      points: reward.cost,
      date: new Date().toLocaleDateString("en-IN", {
        month: "long",
        day: "2-digit",
      }),
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("Error claiming reward:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
