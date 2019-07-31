const { insert } = require('../models/recipes');

module.exports = {
  addRecipes
};

async function addRecipes(req, res) {
  try {
    const recipe = await insert({...req.body, user_id:req.decode.id});
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

