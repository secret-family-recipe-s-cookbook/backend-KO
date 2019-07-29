const db = require('../dbConfig');

module.exports = {
    insert
}

function insert(user) {
  return db('users')
    .insert(user)
    .returning(['id', 'firstname', 'lastname', 'username', 'email'])
}
