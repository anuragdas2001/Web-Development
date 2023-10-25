const express = require('express');

const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/users_controller');

console.log('Users Loaded');

router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.get('/sign-up',usercontroller.signup);
router.get('/sign-in',usercontroller.signin);

router.post('/Update/:id',passport.checkAuthentication,usercontroller.Update);
router.post('/create',usercontroller.create);
// router.post('/create-session',usercontroller.create_session);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
    failureRedirect: '/users/sign-in'},
    // failureFlash: true, // Enable flash messages for failures
    ),usercontroller.create_session);


router.get('/sign-out',usercontroller.destroySession);
router.get('/forgot_password',usercontroller.forgot_password);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usercontroller.create_session);
router.get('/reset-password',passport.checkAuthentication,usercontroller.reset);
router.post('/reset-password/:id',passport.checkAuthentication,usercontroller.Update_Password);
module.exports=router;
