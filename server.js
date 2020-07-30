const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
// create top level function 
const app = express();



//middleware

//template engine middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//template engine ends 

// serve static assets 

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/node_modules"));

//static assets ends 
//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//basic route
app.get("/",(req,res)=>{
    
    //fetch data from database 
    Profile.find({}).lean().then(profile=>{
        res.render("./home",{profile})
    }).catch(err=>console.log);
})

//routing 

//import profile schema
require("./Model/Profile");
let Profile = mongoose.model("profile");



// create express webserver

//connect database 

let mongodb = "mongodb+srv://Arun:1234567890@cluster0.rnsru.mongodb.net/DB1?retryWrites=true&w=majority";
mongoose.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if (err) throw err 
    console.log("Mongoose is conneted")
})
//basic route
app.get("/",(req,res)=>{
    res.send("App is ready")
})

//routing 
app.get("/login",(req,res)=>{
    res.render("./auth/login")
})

app.get("/register",(req,res)=>{
    res.render("./auth/register")
})

app.get("/addprofile",(req,res)=>{
    res.render("./profiles/addprofile-form")
})

//store in database

//request code 
app.post("/create-profile",(req,res)=>{
    const {firstname,lastname,phone} = req.body;
    let errors = [];
    if(!firstname){
        errors.push({text:"first name is required"})
    }
    if(!lastname){
        errors.push({text:"last name is required"})
    }
    if(!phone){
        errors.push({text:"Phone number is required"})
    }
    if(errors.length>0){
        res.render("./profiles/addprofile-form",{
            errors,
            firstname ,
            lastname,
            phone,
        })
        
    }
    else{
        let newProfile = {
            firstname,
            lastname,
            phone,
        };
        //store to database
        new Profile(newProfile).save().then(profile =>{
            res.redirect("/",{profile})
        }).catch(err=>{
            console.log(err)
        })
        res.send("Data added successfully")
    }



})



app.get("/form",(req,res)=>{
    res.send("Login is ready");
    
})

//listen port

let port = 5000;

app.listen(port,(err)=>{
    if (err) throw err
    console.log("Express Server is created and is running on port "+port)
})