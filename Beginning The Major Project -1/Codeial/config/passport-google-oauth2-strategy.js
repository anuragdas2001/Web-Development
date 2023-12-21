const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto');
const env = require('./environment');
const User = require('../models/user');

//tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_client_ID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
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

