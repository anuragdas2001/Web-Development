const User = require("../models/user");
const fs = require("fs"); //file system
const path = require("path");
const reset_forgot_password_mailer = require('../mailers/Forgot_Password');

const reset_forgot_password_worker = require('../workers/reset_Forgot_password_worker');
const queue = require('../config/kue');
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
module.exports.create_session = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  console.log("You are about to be logged out!");
  req.logout(function (error) {
    if (error) {
      // Handle the error, e.g., by sending an error response
      console.log("Error in logging Out please try again later", error);
    }
    req.flash("warning", "You have Logged Out !");

    return res.redirect("/");
  });
};

module.exports.Update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (error) {
        if (error) {
          console.log("***Multer Error", error);
        }
        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        console.log("Profile Updated Successfully");
        req.flash("success", "Profile Updated Successfully");
        return res.redirect("back");
      });
    } catch (error) {
      console.log("Could not Update Profile", error);
      req.flash("error", error);
      return res.redirect("back");
    }
  }
};

module.exports.submitResetForm = async function(req, res) {
  console.log('Inside submitResetForm');
  const { email } = req.body;
  const user = await User.findOne({email});

  // Create a job to send the reset email
  // const jobData = {
  //   user: {
  //     name: user.name, // User's name
  //     email: user.email, // User's email address
  //   },
  //   // Other data specific to the reset email
  // };

  const job = queue.create('reset', user).save(function (error) {
    if (error) {
      console.log("Error in sending to the Queue", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    console.log('Job enqueued', job.id);
    // return res.redirect("/users/sign-in");
  });
  req.flash('success','check your mail');

  // return res.status(200).json({
  //   message: 'check your mail',
  // });
  return res.render('forgot_password_reset_form', {
    title: 'Reset-Link',
    user: user
});

}

module.exports.Update_Password = async function(req,res){
  if(req.isAuthenticated()) {
    const user = await User.findById(req.params.id);

    if(!user) {
      return res.redirect('/users/signin');
    }

    if(req.body.password == req.body.confirm_password) {
      // user.password = req.body.password;
      await User.findByIdAndUpdate(req.params.id,{
        password:req.body.password
      });
      await user.save();
      return res.redirect('/users/sign-in');
    } 
  } else {
    return res.redirect('/users/sign-in');
  }
}

module.exports.Reset_Form  = function(req,res){

  if(req.isAuthenticated()){
      return res.render("reset_form", {
          title: "Password Reset",
          user:req.user
        });
  }
  return res.redirect("/users/sign-in");
}