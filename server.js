/*********************************************************************************

WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Gitansh nagpal
Student ID: 170721211
Date: 6/9/2023

********************************************************************************/ 

const express= require("express");
const path=require('path');
const store=require("./store-service");
const app = express();
app.use(express.static("public"));

app.get('/', function(req,res){
    res.redirect('/about');
});

app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname,'./views/about.html'));
});

app.get('/shop',function(req,res){
    //res.send("TODO: get all items who have published==true");
    store.getPublishedItems().then((value)=>{
        res.send(value);
    })
    .catch((error)=>{
        res.send(error);
    });
});

app.get('/items',function(req,res){
    store.getAllItems().then((value)=>{
        res.send(value);
    })
    .catch((error)=>{
        res.send(error);
    });
});

app.get('/categories',function(req,res){
    store.getCategories().then((value)=>{
        res.send(value);
    })
    .catch((error)=>{
        res.send(error);
    });
});

// no matching route
app.use((req,res,next)=>{
    res.status(404).send("Page Not Found. Oops you look lost! try /about this time.");
});

var port= process.env.PORT||8080;
store.initialize().then((value)=>{
    app.listen(port,()=>{
        console.log('Express http server listening on '+port)
    });
    console.log(value);
}).catch((error)=>{
    console.log(error);
});