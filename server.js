const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
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




app.get("/",(req,res)=>{
    res.render("./home")
})

//routing 





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



app.get("/form",(req,res)=>{
    res.send("Login is ready")
})

//listen port

let port = 5000;

app.listen(port,(err)=>{
    if (err) throw err
    console.log("Express Server is created and is running on port "+port)
})