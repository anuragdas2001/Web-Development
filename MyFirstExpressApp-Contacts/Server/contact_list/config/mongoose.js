//require the library
const mongoose = require("mongoose");

//connect the database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db', {useNewUrlParser: true, useUnifiedTopology: true});

//acquire the connection to check if it is succesful
const db = mongoose.connection;

//error
// db.on("error", console.error.bind(console, "error connecting to db"));
db.on('error', err => console.error('Connection error:', err));

//up and running then print the message
db.once("open", function () {
  console.log("Successfully Connected to the Database");
});

