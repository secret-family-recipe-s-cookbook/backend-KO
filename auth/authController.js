const bcrypt = require('bcryptjs');
const { insert } = require('../database/models/users');
module.exports = {
  register
};

async function register(req, res) {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await insert({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword
    });
    
    if (!errors.isEmpty()) {
      
    }

    return res.status(201).json({
      status: 'success',
      message: 'user created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      error: 'could not create user'
    });
  }
}
