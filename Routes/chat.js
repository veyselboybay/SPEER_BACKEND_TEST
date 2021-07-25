const router = require('express').Router();
const User = require('../models/auth-model');
const Chat = require('../models/chat-model');

router.post('/:fromID/:toID',async(req,res) => {
    
    //Check if the receiving user exists
    const userSender = await User.findById(req.params.toID,(err) => {
        if(err){
            if(err.name === "CastError"){
                return res.send('Receiving user cannot be found!');
            }
            else{
                res.status(401).send('Access Denied!');
            }
        }
    });

    //Check if sender exists
    const userReceiver = await User.findById(req.params.fromID,(err) => {
        if(err){
            if(err.name === "CastError"){
                return res.send('Sending user cannot be found!');
            }
            else{
                res.status(401).send('Access Denied!');
            }
        }
    });

    //Create new message
    const newMessage = new Chat({
        fromId:req.params.fromID,
        toId:req.params.toID,
        message:req.body.message
    })

    //send the message
    try{
        const text = await newMessage.save();
        res.status(200).send('Message sent!');
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;