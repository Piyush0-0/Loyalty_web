const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Claim reward (Earn points)
router.post("/claim", async (req, res) => {
  const { email, reward } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.points += reward.cost;

    user.transactions.push({
      type: "Earned",
      description: reward.title,
      points: reward.cost,
      date: new Date(),
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error claiming reward:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Spend points
router.post("/spend", async (req, res) => {
  const { email, item } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.points < item.cost) {
      return res.status(400).json({ error: "Not enough points" });
    }

    user.points -= item.cost;

    user.transactions.push({
      type: "Spent",
      description: item.title,
      points: -item.cost,
      date: new Date(),
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error spending points:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
