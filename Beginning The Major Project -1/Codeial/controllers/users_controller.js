const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("users", {
    title: "Users",
  });
};

//render the sign up page
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
  // return res.redirect('/users/sign-in');
};

//render the sign in page
module.exports.signin = function (req, res) {
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
        return User.create(req.body);
        //User already exists
      } else {
        return Promise.reject("User already exists");
      }
    })
    //if User created then redirect to sign in page
    .then(() => {
      return res.redirect("/users/sign-in");
    })
    .catch((error) => {
      console.error("Error in signing up:", error);
      return res.redirect("back");
    });
};

//sign in and create a session for the user
module.exports.create_session = function (req, res) {
  //find the user

  User.findOne({ email: req.body.email })
    .then((user) => {
      //handle user found
      if (user) {
        if (req.body.password != user.password) {
          return res.redirect("back");
        }

        //handle session creation
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      }

      //handle user not found
      else {
        return res.redirect("/users/sign-up");
      }
    })
    .catch((error) => {
      console.error("Error in signing in:", error);
      return res.redirect("back");
    });

  //handle password which don't match
};
