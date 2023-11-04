const User = require("../models/user");
const fs = require("fs"); //file system
const path = require("path");
const nodeMailer = require("../config/nodemailer");
const randomstring = require("randomstring");
const queue = require("../config/kue");
const Friendship = require('../models/friendship');
const Forgot_Password_Mailer = require("../mailers/Forgot_Password");

const reset_email_worker = require("../workers/reset_email_worker");
module.exports.profile = function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.params.id).then((user) => {
      return res.render("users_profile", {
        title: "Users",
        profile_user: user,
      });
    })
    .catch((error)=>{
      console.log(error);
      return res.redirect('back');
    })
  } 
};


// module.exports.profile = async function (req, res) {

//   if (!req.isAuthenticated()) {
//     return res.redirect("/users/sign-in");
//   }

//   try {

//     let user = await User.findById(req.params.id);

//     let friendship1 = await Friendship.findOne({
//       from_user: req.user.id,
//       to_user: req.params.id  
//     });

//     let friendship2 = await Friendship.findOne({
//       from_user: req.params.id, 
//       to_user: req.user.id
//     });

//     let friendslist = await User.findById(req.user).populate('friends');

//     return res.render("users_profile", {
//       title: "Users",
//       profile_user: user,
//       friendslist: friendslist
//     });

//   } catch (error) {
//     console.log(error);
//     return res.redirect("/users/sign-in"); 
//   }

// };

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

module.exports.reset = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("reset_form", {
      title: "Password Reset",
      user: req.user,
    });
  }
  return res.redirect("/users/sign-in");
};
module.exports.Update_Password = async function (req, res) {
  if (req.isAuthenticated()) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.redirect("/users/signin");
    }

    if (req.body.password == req.body.confirm_password) {
      // user.password = req.body.password;
      await User.findByIdAndUpdate(req.params.id, {
        password: req.body.password,
      });
      await user.save();
      return res.redirect("/users/sign-out");
    }
  } else {
    return res.redirect("/users/signin");
  }
};

module.exports.ForgotPassword = async function(req, res) {

  try {

    const email = req.body.email;

    console.log("hello");

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "User does not exist",
        success: true
      });
    }

    const randomString = randomstring.generate();
    const token = randomString;
    const name = user.name;

    await User.updateOne({ email }, { $set: { token }});

     Forgot_Password_Mailer.reset_Password(token,name,email);


    req.flash("success", "Email has been sent");

    return res.status(200).json({
      message: "Email has been sent",
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false
    });

  }

};

module.exports.Reset_Password = function (req, res) {
  console.log("Reset_Password");
  return res.render("reset_form", {
    title: "Password Reset",
    user: req.user.email,
    token: token
  });
};

module.exports.UpdateForgotPassword = async function(req,res){
  // const user = await User.findone({token:})
  // console.log(user);
  const token = req.params.token
  console.log(token);
  console.log('Inside UpdateForgotPassword');
  const user = await User.findOne({token:token});
  if (!user) {
    return res.redirect("/users/signin");
  }

  if (req.body.password == req.body.confirm_password) {
    // user.password = req.body.password;
    await User.findOneAndUpdate({token:token}, {
      password: req.body.password,
    });
    await user.save();
    return res.redirect("/users/sign-in");

  }
  else {
    console.log('ELSE BLOCK');
    return res.redirect("/users/sign-in");
  }
}
