
const express = require('express');
const auth = require('./auth/authRoute');
const server = express();

server.use(express.json());


module.exports = server;