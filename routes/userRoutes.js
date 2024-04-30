const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

router.post("/api/users", async (req, res) => {
  const newUsername = req.body.username;
  const newUser = new User({ name: newUsername });

  try {
    const data = await newUser.save();
    res.json({ username: data.name, _id: data._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while saving the user." });
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ username: users.name, _id: users._id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the users." });
  }
});

module.exports = router;
