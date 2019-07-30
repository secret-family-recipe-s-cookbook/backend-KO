const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./auth/authRouter');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.status(200).send('Welcome to Family Recipe CookBook');
});

module.exports = server;
