//Runs the server.

const server = require('./app');

console.log("Starting server.");

const config = {};
server(config).start().then(()=>{
    console.log('server started.')
});