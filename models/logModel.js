const mongo = require('mongoose')
const User = require('../models/userModel.js');
const {exerciseSchema} = require('../models/exerciseModel')

const logSchema = mongo.Schema({
    _id: {
        type: mongo.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    userId: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    log: {
        type: [],
        required: true
    }
})

const LogUser = mongo.model('LogUser', logSchema)

module.exports = LogUser