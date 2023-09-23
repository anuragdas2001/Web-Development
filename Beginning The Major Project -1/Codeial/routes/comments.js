const express = require('express');
const router = express.Router();
const passport = require('passport');
const Commentscontroller = require('../controllers/comments_controller');


router.post('/create',passport.checkAuthentication,Commentscontroller.create);    


module.exports=router;