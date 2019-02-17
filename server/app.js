const express = require('express');
const path = require('path');

const {Doc, Article} = require('./models');
const DocsRouter = require('./routes/docs');

const {sequelize} = require('./models');

const app = express();
const port = 8081;

// Support JSON encoded bodies.
app.use(express.json());
// Support URL-encoded bodies;
app.use(express.urlencoded({extended: true}));

// Docs CRUD operations route
app.use('/docs', DocsRouter(Doc));
app.use('/articles', DocsRouter(Article));

// Serve the static files in the client folder.
app.use('/', express.static( path.join(__dirname, '../client') ));

async function startServer() {
    // Wait for the server to setup.
    // force: true means existing tables will be dropped.
    await sequelize.sync({force:true});

    // Start listening for requests.
    app.listen(port, () => console.log(`Backend running on port ${port}.`));
}
startServer();



