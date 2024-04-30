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

  const newExerciseData = {
    userId: user._id,
    username: user.name,
    description: req.body.description,
    duration: parseInt(req.body.duration),
  };

  if (req.body.date) {
    newExerciseData.date = req.body.date;
  }

  const newExercise = new Exercise(newExerciseData);

  try {
    const data = await newExercise.save();
    console.log(data)
    res.json({
      _id: data.userId,
      username: data.username,
      date: dateFormat(data.date),
      duration: parseInt(data.duration),
      description: data.description,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the exercise." });
  }
});

module.exports = router;
