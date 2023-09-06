const express = require("express");
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const DB=require('./config/mongoose');

app.use(bodyParser.urlencoded({ extended: true })); //parser or middleware


app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);


//extract style & scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index.js'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(error){
    if(error){
        console.log(`Error in running the Server ${error}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})