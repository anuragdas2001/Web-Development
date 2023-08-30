const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const { name } = require("ejs");
const port = 8000;

const db = require("./config/mongoose");
const Contact=require("./models/contact");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true })); //parser or middleware
// app.use(express.urlencoded());
app.use(express.static("assets"));

//middleware1
app.use(function (req, res, next) {
  req.myName = "Anurag";
  // console.log('middleware 1 called');
  next();
});

//middleware2
app.use(function (req, res, next) {
  // console.log('My Name is ',req.myName);
  // console.log('middleware 2 called');
  next();
});

var contactList = [
  {
    name: "Anurag",
    phoneno: "111111111",
  },
  {
    name: "Tony Stark",
    phoneno: "123456789",
  },
  {
    name: "Rohan",
    phoneno: "3456789012",
  },
];

app.get("/",async  (req,res)=> {
  //   console.log(__dirname);
  // res.send("Cool,it is running! or is it");

  // try{

  //   // const contacts = await Contact.find({name: "aa"});
  //   Contact.find({name:"New"});
  //   return res.render("home", {
  //     title: "Contacts List",
  //     contact_List: contactList,
  //   });

  // }

  try {
    const contacts = await Contact.find({});
    res.render('home',{
      title: 'Contacts List',
      contact_List: contacts
    });
  } catch(err) {
    console.error(err);
    return res.redirect('/');
  }
});




app.get("/h", function (req, res) {
  return res.render("practice", { title: "practice" });
});

app.get("/delete-contact", function (req, res) {

  //get the id from query in the url



  // console.log(req.query);

  //find the contact in the database using id and delete it




  let id = req.query.id; //get the query from the url

  Contact.findByIdAndDelete(id)
  .then((deletedCon)=>{
    console.log("Delete Sucessfully",deletedCon);
    return res.redirect("/");
      
  })
  .catch((error)=>{
    console.log("Cannot be Deleted",error);
    return res.redirect("/");
  });

  // const newCon = contactList.filter(function (contactList) {
  //   return contactList.id !== phone;
  // });
  // contactList = newCon;
  // return res.render("home",{
  //     title: "Contacts List",
  //     contact_List:newCon
  // });

  // return res.redirect("/");
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phoneno: req.body.phone,
  // });

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    })
    .then((newContact)=>{
        console.log(newContact);
        contactList.push({
          name:req.body.name,
          phoneno:req.body.phone,
        });
        res.render('home', {
          title: 'Contacts List',
          contact_List: contactList
        });
        // return res.redirect("/");
       
    })
    .catch((error)=>{
        console.log('Error in Creating a contact',error);
        return res.redirect("/");
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