const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('moongose')
require('dotenv').config()

mongo.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const userSchema = new mongo.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    auto:true
  },
  name:{
    type: String,
    require:true
  }
})

const User = mongo.Model("User", userSchema)

app.route("/api/users").post((req, res, done) => {
  const newUser = req.body

  newUser.Save((err, data) => {
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
    res.json({username: data.name, _id: data._id})
    done(null, data)
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
