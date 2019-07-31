const db = require('../database/dbConfig');

module.exports = {
  insert, get, getById
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
  return db('recipes').where({id}).first();
}
