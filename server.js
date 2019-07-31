const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const authRouter = require('./auth/authRouter');
const recipesRouter = require('./recipes/recipesRoutes');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api/auth', authRouter);
server.use('/api/recipes', recipesRouter);

server.get('/', (req, res) => {
  res.status(200).send('Welcome to Family Recipe CookBook');
});

module.exports = server;
