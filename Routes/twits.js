const router = require('express').Router();
const Tweet = require('../models/tweet-model');
const User = require('../models/auth-model');

//Create a new tweet
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
        tweet:req.body.newTweet
    })

    try{
        const twit = await newTweet.save();
        res.send(user.username + " tweeted with this id:  " +twit._id);
    }
    catch{
        res.send('Error Occured! Try again!');
    }
});

//Update an existing tweet
router.post('/updateTweet/:userId/:tweetId',async(req,res) => {
    //check if user exists
    const user = await User.findById(req.params.userId,(err) => {
        if(err){
            if(err.name === "CastError"){
                return res.send('User cannot be found!');
            }
            else{
                res.status(401).send('Access Denied!');
            }
        }
    });

    //Check if tweet exists
    const tweet = await Tweet.findById(req.params.tweetId,(err) => {
        if(err){
            if(err.name === "CastError"){
                return res.send('Tweet cannot be found! Either deleted or never existed!');
            }
            else{
                res.status(401).send('Access Denied!');
            }
        }
        
    });

    //Update the tweet
    Tweet.updateOne({_id:req.params.tweetId},{tweet:req.body.updatedTweet},(err) => {
        if(err){
            res.send('Error Occured, try again later!');
        }
        else{
            res.status(200).send('Tweet updated.');
        }
    })

})

module.exports = router;