const express = require('express');
const app = express();
const port = 8081;

app.get('/', (req, res) => res.send('Hi there'));

app.listen(port, () => console.log(`Backend running on port ${port}.`));