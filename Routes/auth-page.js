const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation} = require('./validation');


//Registeration page route
router.post('/register',async(req,res) => {

    //check if the inputs are valid
    const { error } = await registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user already exists!
    const user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already exists!');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Create new user

    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    try{
        const savedUser = await newUser.save();
        return res.status(200).send('User created with id: '+savedUser._id);
    }catch(err){
        res.send(err);
    }
})


//Login page route
router.post('/login',async(req,res) => {

    //Check if user inputs are validated
    const { error } = await loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(401).send('User does not exists! Please register.');

    //If user exists, check if password is correct
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(401).send('Email/Password is not correct, check and try again!');

    //Provide a jwt token for login credientials
    const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:'6h'});
    res.header('auth-token',token);

    res.send(token);
})

module.exports = router;