const db = require('../database/dbConfig');

module.exports = {
  insert,
  get,
  getById,
  remove,
  update
};

function insert(recipes) {
  return db('recipes')
    .insert(recipes)
    .returning('*');
}

function get() {
  return db('recipes');
}

function getById(id) {
  return db('recipes')
    .where({ id })
    .first();
}

function remove(id) {
  return db('recipes')
    .delete()
    .where({ id });
}

function update(recipe, id) {
  return db('recipes')
    .update(recipe)
    .where({ id });
}
