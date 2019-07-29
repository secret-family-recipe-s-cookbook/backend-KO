const db = require('../dbConfig');

exports.up = function(knex) {
  return db.schema.createTable('users', table => {
    table.increments();
    table.varchar('firstname', 128).notNullable();
    table.varchar('lastname', 128).notNullable();
    table.varchar('username', 128).notNullable();
    table.varchar('password', 128).notNullable();
    table
      .varchar('email', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
