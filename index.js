const server = require('./server');

require('dotenv').config();

const port = process.env.PORT || 4200

server.listen(port, () => console.log(`server is alive on ${port}!!`));