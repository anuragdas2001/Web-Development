const { modelName } = require("../models/user");

module.exports.profile = function(req,res){
    return res.render("users",{
        title:"Users",
    });
}

//render the sign up page
module.exports.signup=function(req,res){
    return res.render("user_sign_up",{
        title: "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signin=function(req,res){
    return res.render("user_sign_in",{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create=function(req,res){

}

//sign in and create a session for the user
module.exports.create_session=function(req,res){

}