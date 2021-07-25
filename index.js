const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

//import routes
const authPage = require('./Routes/auth-page');
const tweetsPage = require('./Routes/tweets');

env.config();
const app = express();
//Set body parser using express feature
app.use(express.json());

//Routes
app.use('/api/auth',authPage);
app.use('/api/tweet',tweetsPage);

//Connect to Database
mongoose.connect(process.env.CONNECT_DATABASE,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to Database...");
    }
})

// Start to listening the server at 3000
app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('Server up and running! Listening from localhost:3000/');
    }
})