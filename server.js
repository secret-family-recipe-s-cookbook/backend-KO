
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const authRouter = require('./auth/authRouter');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/auth', authRouter);


module.exports = server;