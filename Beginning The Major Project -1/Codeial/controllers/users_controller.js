const User = require('../models/user');
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
    // return res.redirect('/users/sign-in');
}

//render the sign in page
module.exports.signin=function(req,res){
    return res.render("user_sign_in",{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

   
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return User.create(req.body);
            } else {
                return Promise.reject('User already exists');
            }
        })
        .then(() => {
            return res.redirect('/users/sign-in');
        })
        .catch(error => {
            console.error('Error in signing up:', error);
            return res.redirect('back');
        });
};

//sign in and create a session for the user
module.exports.create_session=function(req,res){

}