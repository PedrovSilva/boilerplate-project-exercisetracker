const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongoose')
const User = require('./models/userModel.js');
const {Exercise} = require('./models/exerciseModel.js')
const bodyParser = require('body-parser');
const dateFormat = require('./models/dateFormater.js')
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

app.route("/api/users/:_id/exercises").post(async (req, res) => {
    const user = await User.findById(req.params._id)
    console.log(user._id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
 
  const newExercise = new Exercise({userId: user._id,
                                    username:  user.name,
                                    description: req.body.description,
                                    duration: req.body.duration,
                                    date: req.body.date})
  
  try {
    const data = await newExercise.save()
    
    res.json({username: data.username,
              description: data.description,
              date: dateFormat(data.date),
              duration: data.duration,
              _id: data.userId})
  }
  catch (err){
    	console.error(err)
      res.status(500).json({error: 'An error occurred while adding the exercise.'})
  }
})







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
