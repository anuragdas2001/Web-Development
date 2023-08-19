const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { name } = require("ejs");
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true })); //parser or middleware
// app.use(express.urlencoded()); 


//middleware1
app.use(function(req,res,next){
    req.myName="Anurag";
    // console.log('middleware 1 called');
    next();
});

//middleware2
app.use(function(req,res,next){
    console.log('My Name is ',req.myName);
    // console.log('middleware 2 called');
    next();
}); 



var contactList=[
    {
        name:"Anurag",
        phoneno:"111111111"
    },
    {
        name:"Tony Stark",
        phoneno:"123456789"
    },
    {
        name:"Rohan",
        phoneno:"3456789012"
    }
];


app.get("/", function (req, res) {
  //   console.log(__dirname);
  // res.send("Cool,it is running! or is it");
  return res.render("home", { 
    title: "Contacts List",
    contact_List:contactList
});

});


app.get("/h", function (req, res) {
  return res.render("practice", { title: "practice" });
});


app.post('/create-contact',function(req,res){

    contactList.push({
        name:req.body.name,
        phoneno:req.body.phone,
    });
    // return res.redirect('/h');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    return res.redirect("/"); //or use '/' instead of back
});




app.listen(port, function (error) {
  if (error) {
    console.log("error", error);
    return;
  }
  console.log("Yup! My ExpressServer is running on port:", port);
});
