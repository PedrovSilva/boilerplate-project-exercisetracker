const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

router
  .route("/api/users")
  .post(async (req, res) => {
    const newUsername = req.body.username;
    if (!newUsername) {
      console.error(err);
    res
      .status(500)
      .json({ error: "username required." });
    }
    const newUser = new User({ name: newUsername });

    try {
      const data = await newUser.save();
      res.json({ username: data.name, _id: data._id });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the user." });
    }
  })
  .get(async (req, res) => {
    try {
      const users = await User.find();
      const usersFormatted = users.map((user) => ({
        username: user.name,
        _id: user._id,
      }));
      res.json(usersFormatted);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the users." });
    }
  });

module.exports = router;
