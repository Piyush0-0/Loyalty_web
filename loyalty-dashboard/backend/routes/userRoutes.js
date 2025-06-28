const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET user by email
router.get("/:email", async (req, res) => {
  try {
    const decodedEmail = decodeURIComponent(req.params.email);  // Important fix
    const user = await User.findOne({ email: decodedEmail });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST claim a reward
router.post("/claim", async (req, res) => {
  const { email, reward } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.points < reward.cost) {
      return res.status(400).json({ message: "Not enough points" });
    }

    user.points -= reward.cost;

    user.transactions.push({
      type: "Redeemed",
      description: reward.title,
      date: new Date().toLocaleDateString("en-IN", {
        month: "long",
        day: "2-digit"
      }),
      points: reward.cost  // Keep this positive
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
