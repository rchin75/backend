/*
 * Create the models and setup the database connection.
 */

const DocModel = require('./doc');

// Create sqlite database connection.
const path = require('path');
const dbPath = path.join(__dirname, '../../db.sqlite');
const sqlite = require('sqlite3');
const db = new sqlite.Database(dbPath);
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database','username','password', {
    dialect: 'sqlite',
    storage: dbPath
});

// Create the models.
const Doc = DocModel(sequelize, Sequelize);

// sequelize is also exported because it is used in app.js to instantiate the database tables.
module.exports = {
    sequelize, Doc
};