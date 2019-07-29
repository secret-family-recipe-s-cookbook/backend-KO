const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser')
const { register } = require('./authController');

router.post('/register', validateUser, register);

module.exports = router;