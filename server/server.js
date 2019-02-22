//Runs the server.

const server = require('./app');

console.log("Starting server.");

const config = require('./test/config');
console.log(config);
server(config).start().then(()=>{
    console.log('server started.')
});