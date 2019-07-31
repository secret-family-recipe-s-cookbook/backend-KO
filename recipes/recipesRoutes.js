const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const { addRecipes, getRecipes } = require('./recipesController');
const validateRecipes = require('../middleware/validateRecipes');

router.post('/', authentication, validateRecipes, addRecipes);
router.get('/', authentication, getRecipes);


module.exports = router;
