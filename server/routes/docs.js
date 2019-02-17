/*
 & REST CRUD operations on a document.
 */

const express = require('express');
//const {Doc} = require('./../models');

/**
 * Creates a new route instance for CRUD operations on the provided Doc-model.
 * @param Doc A Doc-model must at least contain a contents attribute.
 * @return {*} Router instance.
 */
module.exports = (Doc) => {
    const router = express.Router();

    /**
     * Extracts the model attribute values from the doc.
     * @param doc The provided doc.
     * @return {{}} Object with extracted values to use.
     */
    function extractModelAttributeValues(doc) {
        // Loop through all attributes of the sequelize Doc model.
        let result = {};
        for (let attribute in Doc.rawAttributes) {
            if ((attribute !== 'id') && (attribute !== 'createdAt') && (attribute !== 'updatedAt')) {
                // Extract the values and assign these to the doc.
                if (doc.hasOwnProperty(attribute)) {
                    result[attribute] = doc[attribute];
                }
            }
        }
        return result;
    }

    // Delete all docs.
    router.delete('/all', (req, res) => {
        Doc.destroy({truncate: true}).then(()=>{
            res.send([]);
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    // Delete a doc.
    router.delete('/:id', (req, res) => {
        Doc.findById(parseInt(req.params.id)).then(doc =>{
            doc.destroy().then(() => {
                res.send(doc);
            })
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    // Create a new doc.
    router.post('/', (req, res) => {
        // Make sure the POST body is json encoded.
        let data = req.body;

        let doc = null;
        if (data && data.hasOwnProperty('contents')) {
            // A full doc was provided.
            doc = data;
        } else if (data) {
            // Only the contents was provided.
            doc = {contents: data};
        } else {
            // 400: bad request.
            res.status(400).send('Invalid body');
            return;
        }

        doc = extractModelAttributeValues(doc);

        Doc.create(data).then(doc => {
            res.send(doc);
        }).catch(err => {
            res.status(400).send('Failed to save new doc');
        });

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
            let update = extractModelAttributeValues(data);
            Doc.findById(parseInt(req.params.id)).then(doc =>{
                doc.update(update).then(() => {
                    res.send(doc);
                })
            }).catch(err =>{
                res.status(400).send(err);
            });
        }
    });

    // Get all docs.
    router.get('/all', (req, res) => {
        Doc.findAll().then(docs =>{
            res.send(docs);
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    // Get a specific doc.
    router.get('/:id?', (req, res) => {
        Doc.findById(parseInt(req.params.id)).then(doc =>{
            res.send(doc);
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    return router;
};
