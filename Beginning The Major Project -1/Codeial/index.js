const express = require("express");
const app=express();
const port=8000;



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