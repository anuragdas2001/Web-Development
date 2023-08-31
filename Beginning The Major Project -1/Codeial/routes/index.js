const express=require('express');

const router = express.Router();
const homeController=require('../controllers/home_controller');
console.log('Router Loaded');


router.get('/',homeController.home);


//exports the router object from a Node.js module
module.exports=router;