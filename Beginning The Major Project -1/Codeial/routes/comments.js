const express = require('express');
const router = express.Router();
const passport = require('passport');
const Commentscontroller = require('../controllers/comments_controller');


router.post('/create',passport.checkAuthentication,Commentscontroller.create);    
router.get('/delete/:id',passport.checkAuthentication,Commentscontroller.delete);

module.exports=router;