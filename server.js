const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

env.config();
const app = express();
//Set body parser using express feature
app.use(express.json());



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