/*
 & REST CRUD operations on a document.
 */

const express = require('express');

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
    async function extractModelAttributeValues(doc) {
        // Loop through all attributes of the sequelize Doc model.
        let result = {};
        const minPasswordLength = 5;
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
        Doc.findByPk(parseInt(req.params.id)).then(doc =>{
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
        if (data && !data.hasOwnProperty('contents') && Doc.rawAttributes.hasOwnProperty('contents')) {
            // Only the contents was provided.
            doc = {contents: data};
        } else if (data) {
            // data was provided.
            doc = data;
        } else {
            // 400: bad request.
            res.status(400).send('Invalid body');
            return;
        }
        // Extracting attribute values is async so we need to await the result inside an async function call.
        (async ()=>{
            doc = await extractModelAttributeValues(doc);
            if (req.user &&  (Doc.tableName !== 'users')) {
                doc.owner = req.user.username;
                doc.editor = req.user.username;
            }
            Doc.create(doc).then(doc => {
                if (doc.password) {
                    doc.password = null;
                }
                res.send(doc);
            }).catch(err => {
                res.status(400).send('Failed to save new doc');
            });
        })();
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
        } else {
            // Extracting attribute values is async so we need to await the result inside an async function call.
            (async ()=>{
                let update = await extractModelAttributeValues(data);
                if (req.user && (Doc.tableName !== 'users')) {
                    update.editor = req.user.username;
                }
                //console.log('update = ', update);
                Doc.findByPk(parseInt(req.params.id)).then(doc =>{
                    doc.update(update).then(() => {
                        if (doc.password) {
                            doc.password = null;
                        }
                        //console.log('updated =', doc);
                        res.send(doc);
                    })
                }).catch(err =>{
                    res.status(400).send(err);
                });
            })();
        }
    });

    // Get all docs.
    router.get('/all', (req, res) => {

        let options = {};
        // Ordering. Note: sequelize will escape the column name and the ASC,DESC values.
        if (req.query.orderBy) {
            options.order = [[req.query.orderBy, req.query.order === 'DESC' ? 'DESC': 'ASC']];
        }
        // Paging or limiting
        if (req.query.limit) {
            options.limit = parseInt(req.query.limit);
        } else {
            // By default limit to max 1000 records.
            options.limit = 1000;
        }
        if (req.query.offset) {
            options.offset = parseInt(req.query.offset)
        }

        console.log("options: ", options);

        Doc.findAll(options).then(docs =>{
            // Make sure passwords are not send to the client.
            for(let i=0; i<docs.length; i++) {
                if (docs[i].password) {
                    docs[i].password = null;
                } else {
                    break;
                }
            }

            res.send(docs);
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    // Get a specific doc.
    router.get('/:id', (req, res) => {
        Doc.findByPk(parseInt(req.params.id)).then(doc =>{
            // Make sure passwords are not send to the client.
            if (doc.password) {
                doc.password = null;
            }

            res.send(doc);
        }).catch(err =>{
            res.status(400).send(err);
        });
    });

    return router;
};
