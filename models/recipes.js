const db = require('../database/dbConfig');

module.exports = {
  insert, get
};

function insert(recipes) {
  return db('recipes')
    .insert(recipes)
    .returning('*');
}

function get() {
  return db('recipes');
}
