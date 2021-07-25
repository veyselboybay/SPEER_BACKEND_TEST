const mongoose = require('mongoose');
const User = require('./auth-model');

const tweetModel = new mongoose.Schema({

    "userID":String,
    "tweet":String,
    "created":{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Tweets',tweetModel);