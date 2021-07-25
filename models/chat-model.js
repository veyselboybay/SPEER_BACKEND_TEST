const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    "fromId":String,
    "toId":String,
    "message":String,
    "created":{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Chats',chatModel);