const { insert, get, getById, remove, update } = require('../models/recipes');

module.exports = {
  addRecipes,
  getRecipes,
  getRecipesbyId,
  deleteRecipe,
  updateRecipe
};

async function addRecipes(req, res) {
  try {
    const [recipe] = await insert({ ...req.body, user_id: req.decode.id });
    return res.status(201).json({
      message: 'recipe created successfully',
      recipe
    });
  } catch (error) {
    return res.status(500).json({
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
    return res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}

async function getRecipesbyId(req, res) {
  try {
    const recipe = await getById(req.params.id);
    if (!recipe) return res.status(404).json('could not find this recipe');
    return res.status(200).json({ data: recipe });
  } catch (error) {
    return res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}

async function deleteRecipe(req, res) {
  try {
    let recipe = await getById(req.params.id);
    if (!recipe) return res.status(404).json('could not find this recipe');
    if (req.decode.id !== recipe.user_id) {
      return res.status(403).json({ error: 'You cannot delete this recipe' });
    }
    recipe = await remove(req.params.id);
    return res.status(200).json({
      message: 'recipe has been deleted',
      data: recipe
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}

async function updateRecipe(req, res) {
  try {
    let recipe = await getById(req.params.id);
    if (!recipe) return res.status(404).json('could not find this recipe');
    if (req.decode.id !== recipe.user_id) {
      return res.status(403).json({ error: 'You cannot edit this recipe' });
    }
    recipe = await update(req.body, req.params.id);
    const updatedrecipe = await getById(req.params.id);
    return res.status(200).json({
      message: 'recipe has been updated',
      data: updatedrecipe
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: 'could not get recipes  please try again later'
    });
  }
}
