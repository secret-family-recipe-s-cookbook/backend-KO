const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const {
  addRecipes,
  getRecipes,
  getRecipesbyId,
  deleteRecipe
} = require('./recipesController');
const validateRecipes = require('../middleware/validateRecipes');

router.post('/', authentication, validateRecipes, addRecipes);
router.get('/', authentication, getRecipes);
router.get('/:id', authentication, getRecipesbyId);
router.delete('/:id', authentication, deleteRecipe);

module.exports = router;
