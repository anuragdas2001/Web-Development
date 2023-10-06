const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID:"502665739610-06qo6n62h8484ief284ttvmebu4rj9ru.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({ email:profile.emails[0].value}).exec().then((user)=> {
        
        console.log(profile);
        if(user){
            //if found set this user as req.user
            return done(null, user);
        }
        else{
            //if not found then create one as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                return done(null,user);
            })
            .catch((error)=>{
                return done(error,false);
            })
        }
       
        
      })
      .catch((error)=>{
        console.log('Error in Google Auth2',error);

        return done(error,false);
    })

}
));

module.exports = passport;

