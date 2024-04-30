const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongoose')
const User = require('./models/userModel');
const bodyParser = require('body-parser');
require('dotenv').config()

mongo.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.route("/api/users").post(async (req, res) => {
  const newUsername = req.body.username

  console.log(newUsername)
  const newUser = new User({name: newUsername})

  try {
    const data = await newUser.save();
    res.json({username: data.name, _id: data._id})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the user.' });
  }
}).get(async (req, res) => {
  try {
    const users = await User.find();
    res.json({username: users.name, _id: users._id})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving the users.' });
  }
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
