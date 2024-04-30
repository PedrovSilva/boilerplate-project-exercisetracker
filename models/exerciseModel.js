const mongo = require('mongoose')
const User = require('./models/userModel');

const exerciseSchema = new mongo.Schema({
    _id:{
        type: mongo.Schema.Types.ObjectId,
        ref: User
    },
    username: String,
    description: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        Default: Date.now
    }
})

const Exercise = mongo.model("Exercise", exerciseSchema)

module.exports = Exercise