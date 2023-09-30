const { Error } = require("mongoose");
const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.params.id).then((user) => {
      return res.render("users_profile", {
        title: "Users",
        profile_user: user,
      });
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

//render the sign up page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
  // return res.redirect('/users/sign-in');
};

//render the sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  //check if the provided email holds a User
  User.findOne({ email: req.body.email })
    .then((user) => {
      //if no User exists then create one
      if (!user) {
        User.create(req.body);
        return res.redirect("/users/sign-in");
      } //User already exists
      else {
        return Promise.reject("User already exists");
      }
    })
    .catch((error) => {
      console.error("Error in signing up:", error);
      return res.redirect("back");
    });
};

//sign in and create a session for the user
// module.exports.create_session = function (req, res) {
//   //find the user

//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       //handle user found
//       if (user) {
//         if (req.body.password != user.password) {
//           return res.redirect("back");
//         }

//         //handle session creation
//         res.cookie("user_id", user.id);
//         return res.redirect("/users/profile");
//       }

//       //handle user not found
//       else {
//         return res.redirect("/users/sign-up");
//       }
//     })
//     .catch((error) => {
//       console.error("Error in signing in:", error);
//       return res.redirect("back");
//     });

//   //handle password which don't match
// };

module.exports.create_session = function (req, res) {
  req.flash('success','Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  console.log("You are about to be logged out!");
  req.logout(function (error) {
    if (error) {
      // Handle the error, e.g., by sending an error response
      console.log("Error in logging Out please try again later", error);
    }
    req.flash('warning','You have Logged Out !');

    return res.redirect("/");
  });
};

module.exports.Update = function(req,res){
  if(req.user.id == req.params.id){
 
    User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
      console.log('Profile Updated Successfully');
      return res.redirect('back');
    })
    .catch((error)=>{
      console.log('Could not Update Profile',error);
      return res.status(401).send('Unauthorized')
    })


  }
}