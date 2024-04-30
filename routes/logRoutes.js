const express = require("express");
const router = express.Router();
const { Exercise } = require("../models/exerciseModel.js");
const dateFormat = require("../utils/dateFormater.js");

router.route("/api/users/:_id/logs").get(async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    let query = { userId: userId }; // Query exercises by userId

    if (from) {
      const fromDate = new Date(from);
      query.date = { $gte: fromDate };
    }

    if (to) {
      const toDate = new Date(to);
      query.date = { ...query.date, $lte: toDate };
    }

    let exercises = await Exercise.find(query); // Find exercises that match the query

    // If 'limit' is defined, limit the number of logs
    if (limit) {
      exercises = exercises.slice(0, limit);
    }

    // Transform exercises into the desired format
    const logs = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: dateFormat(exercise.date),
    }));

    res.json({
      username: exercises[0]?.username,
      count: exercises.length,
      _id: userId,
      logs: logs,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the logs." });
  }
});

module.exports = router;
