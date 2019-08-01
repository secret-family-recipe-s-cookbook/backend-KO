const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          firstname: 'kelechi',
          lastname: 'ogbonna',
          username: 'kayss',
          email: 'kellsy1@example.com',
          password: bcrypt.hashSync('1234', 10)
        },
        {
          id: 2,
          firstname: 'kelechi',
          lastname: 'ogbonna',
          username: 'kelly',
          email: 'kellsy12@example.com',
          password: bcrypt.hashSync('1234', 10)
        }
      ]);
    });
};
