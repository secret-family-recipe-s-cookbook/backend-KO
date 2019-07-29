const express = require('express');
const route = express.Router();
const { register } = require('./authController');

router.post('/auth/register', register);
