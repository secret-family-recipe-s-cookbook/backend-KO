const server = require('./server');

const port = process.env.PORT || 4200

server.listen(port, () => console.log(`server is alive on ${port}!!`));