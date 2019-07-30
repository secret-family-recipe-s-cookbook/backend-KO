const db = require('../database/dbConfig');

module.exports = {
  insert,
  findUsernameoremail
};

function insert(user) {
  return db('users')
    .insert(user)
    .returning(['id', 'firstname', 'lastname', 'username', 'email']);
}

function findUsernameoremail(usernameoremail) {
  return db('users')
    .where({ username: usernameoremail })
    .orWhere({ email: usernameoremail });
}
