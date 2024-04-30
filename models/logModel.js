const mongo = require('mongoose')
const User = require('./models/userModel');
const Exercise = require('./models/exerciseModel')

const logSchema = mongo.Schema({
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    _id: {
        type: mongo.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    log: {
        type: [Exercise],
        required: true
    }
})

const LogUser = mongo.model('LogUser', logSchema)

module.exports = LogUser