const express = require('express');

const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/users_controller');

console.log('Users Loaded');

router.get('/profile',passport.checkAuthentication,usercontroller.profile);
router.get('/sign-up',usercontroller.signup);
router.get('/sign-in',usercontroller.signin);
router.post('/sign-out',usercontroller.signout);

router.post('/create',usercontroller.create);
// router.post('/create-session',usercontroller.create_session);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
    failureRedirect: '/users/sign-in'},
    // failureFlash: true, // Enable flash messages for failures
    ),usercontroller.create_session);

module.exports=router;