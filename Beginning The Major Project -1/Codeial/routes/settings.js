const express = require('express');

const router = express.Router(); 

const settings = require('../controllers/settings_controller');

console.log('Settings Loaded !');


router.get('/settings',settings.settings);

module.exports = router;