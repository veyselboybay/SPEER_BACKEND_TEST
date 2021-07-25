const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    "username":String,
    "email":String,
    "password":String,
    "created":{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userModel);
