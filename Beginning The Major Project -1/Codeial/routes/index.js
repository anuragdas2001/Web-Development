const express=require('express');

const router = express.Router();
const homeController=require('../controllers/home_controller');
console.log('Router Loaded');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/settings',require('./settings'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/friends',require('./friends'));
router.use('/api',require('./api'));


//exports the router object from a Node.js module
module.exports=router;