const express = require("express");

const router = express.Router();

const friendcontroller = require('../controllers/friends_controller');

console.log('Friends Loaded');


router.post('/addfriend/:id',friendcontroller.addFriend);
router.post('/remove/:id',friendcontroller.remove);


module.exports = router;