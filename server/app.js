const express = require('express');
const path = require('path');
const docs = require('./routes/docs');

const {sequelize, Doc} = require('./models');




/*
Doc.create({
    contents: {
        name: 'Roy'
    }
}).then(doc => {
    console.log("doc", doc.dataValues);
});
*/



const app = express();
const port = 8081;

// Support JSON encoded bodies.
app.use(express.json());
// Support URL-encoded bodies;
app.use(express.urlencoded({extended: true}));

app.get('/api', (req, res) => res.send('Hi there!!!'));

app.use('/docs', docs);

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



