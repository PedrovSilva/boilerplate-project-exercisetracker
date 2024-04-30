const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const { Exercise } = require("../models/exerciseModel.js");
const dateFormat = require("../utils/dateFormater.js");

router.route("/api/users/:_id/exercises").post(async (req, res) => {
  const user = await User.findById(req.params._id);
  console.log(user._id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newExercise = new Exercise({
    userId: user._id,
    username: user.name,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  });

  try {
    const data = await newExercise.save();

    res.json({
      username: data.username,
      description: data.description,
      date: dateFormat(data.date),
      duration: data.duration,
      _id: data.userId,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the exercise." });
  }
});

module.exports = router;
