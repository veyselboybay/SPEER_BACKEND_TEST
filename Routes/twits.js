const router = require('express').Router();
const Tweet = require('../models/tweet-model');
const User = require('../models/auth-model');

router.post('/newTweet/:id',async(req,res) => {
    //find the user
    const user = await User.findById(req.params.id,(err) => {
        if(err){
            if(err.name === "CastError"){
                return res.send('User cannot be found!');
            }
        }
    });

    //Create the twit
    const newTweet = new Tweet({
        userID:req.params.id,
        twit:req.body.newTweet
    })

    try{
        const twit = await newTweet.save();
        res.send(user.username + " tweeted with this id:  " +twit._id);
    }
    catch{
        res.send('Error Occured! Try again!');
    }
});



module.exports = router;