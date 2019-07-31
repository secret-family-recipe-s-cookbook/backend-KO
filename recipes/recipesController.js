const { insert, get, getById } = require('../models/recipes');

module.exports = {
  addRecipes,
  getRecipes,
  getRecipesbyId
};

async function addRecipes(req, res) {
  try {
    const recipe = await insert({ ...req.body, user_id: req.decode.id });
    return res.status(201).json({
      message: 'recipe created successfully',
      recipe
    });
  } catch (error) {
    res.status(500).json({
      error: 'could not add recipe to the database, please try again later'
    });
  }
}

async function getRecipes(req, res) {
  try {
    const recipes = await get();
    if (recipes.length === 0)
      return res.status(404).json('No recipe has been created yet');
    return res.status(200).json({ data: recipes });
  } catch (error) {
    res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}

async function getRecipesbyId(req, res) {
  try {
    const recipe = await getById(req.params.id);
    if (recipe.length === 0)
      return res.status(404).json('could not find this recipe');
    return res.status(200).json({ data: recipe });
  } catch (error) {
    res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}
