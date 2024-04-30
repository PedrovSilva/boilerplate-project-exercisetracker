const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongoose')
const User = require('./models/userModel');
const bodyParser = require('body-parser');
require('dotenv').config()

mongo.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.route("/api/users").post((req, res, done) => {
  const newUsername = req.body.username

  console.log(newUsername)
  const newUser = new User({name: newUsername})

  newUser.save((err, data) => {
    if (err){
      return done(err)
    }
    res.json({username: data.name, _id: data._id})
    done(null, data)
  })
}).get((req, res, done) => {
  User.find((err, users) => {
    if(err){
      return done(err)
    }
    res.json({username: users.name, _id: users._id})
    done(null, users)
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
