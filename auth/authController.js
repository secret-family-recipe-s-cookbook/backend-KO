const bcrypt = require('bcryptjs');
const { insert } = require('../database/models/users');
module.exports = {
  register
};

async function register(req, res) {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const [user] = await insert({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword
    });
    return res.status(201).json({
      message: 'user created successfully',
      user
    });
  } catch (error) {
    console.log(error.message)
    if (error.code === '23505' && error.detail.includes('email')) {
      return res
        .status(400)
        .json({ error: 'email has already been registered' });
    }
    res.status(500).json({
      error: 'could not create user'
    });
  }
}
