const express = require('express');
const router = express.Router();

let count = 0;
let docs = [];

function findDoc(id) {
    let result = null;
    for (let i=0; i<docs.length; i++) {
        let doc = docs[i];
        // Note the id param is a string!
        if (doc.id === parseInt(id)) {
            result = doc;
            break;
        }
    }
    return result;
}

// Delete all docs.
router.delete('/all', (req, res) => {
    docs.length = 0;
    res.send(docs);
});

// Delete a doc.
router.delete('/:id', (req, res) => {
    let doc = findDoc(req.params.id);
    if (doc) {
        let index = docs.indexOf(doc);
        if (index > -1) {
            docs.splice(index, 1);
        }
        res.send(doc);
    } else {
        res.status(404).send(`Doc ${req.params.id} not found`);
    }
});

// Create a new doc.
router.post('/', (req, res) => {
    let id = count + 1;
    count ++;

    // Make sure the POST body is json encoded.
    let data = req.body;

    let doc = null;
    if (data && data.hasOwnProperty('contents')) {
        // A full doc was provided.
        doc = data;
        // Set the ID.
        doc.id = id;
    } else if (data) {
        // Only the contents was provided.
        doc = {id, contents: data};
    } else {
        // 400: bad request.
        res.status(400).send('Invalid body');
    }

    // Store the new doc.
    docs.push(doc);

    //Return the saved document.
    res.send(doc);
});

// Save a doc.
router.put('/:id', (req, res) => {

    // Make sure the POST body is json encoded.
    let data = req.body;
    if (!data) {
        // 400: bad request.
        res.status(400).send('Invalid body');
    } else if (!data.hasOwnProperty('id')) {
        // 400: bad request.
        res.status(400).send('Invalid body: no ID');
    } else if (!data.hasOwnProperty('contents')) {
        // 400: bad request.
        res.status(400).send('Invalid body: no contents');
    } else {
        let doc = findDoc(req.params.id);
        if (!doc) {
            res.status(404).send(`Doc ${req.params.id} not found`);
        } else {
            // Update the doc.
            doc.contents = data.contents;
            res.send(doc);
        }
    }
});

// Get all docs.
router.get('/all', (req, res) => {
   res.send(docs);
});

// Get a specific doc.
router.get('/:id?', (req, res) => {
    let doc = findDoc(req.params.id);
    res.send(doc);
});





module.exports = router;