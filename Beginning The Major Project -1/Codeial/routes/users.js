const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/users_controller');

console.log('Users Loaded');

router.get('/profile',usercontroller.profile);
router.get('/sign-up',usercontroller.signup);
router.get('/sign-in',usercontroller.signin);


router.post('/create',usercontroller.create);
router.post('/create-session',usercontroller.create_session);

module.exports=router;