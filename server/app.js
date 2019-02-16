const express = require('express');
const path = require('path');
const docs = require('./routes/docs');

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

// Start the server.
app.listen(port, () => console.log(`Backend running on port ${port}.`));