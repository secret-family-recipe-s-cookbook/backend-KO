const db = require('../database/dbConfig');

module.exports = {
  insert
};

function insert(recipes) {
  return db('recipes')
    .insert(recipes)
    .returning('*');
}
