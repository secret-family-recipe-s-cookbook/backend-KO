const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const { addRecipes } = require('./recipesController');
const validateRecipes = require('../middleware/validateRecipes');

router.post('/', authentication, validateRecipes, addRecipes);

module.exports = router;
