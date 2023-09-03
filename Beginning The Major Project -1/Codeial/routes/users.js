const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/users_controller');

console.log('Users Loaded');

router.get('/profile',usercontroller.profile);
router.get('/Sign-up',usercontroller.signup);
router.get('/Sign-in',usercontroller.signin);


module.exports=router;