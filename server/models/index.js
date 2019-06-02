/*
 * Create the models and setup the database connection.
 */

const config = require('./../config')();
const UserModel = require('./user');

// Create sqlite database connection.
const dbPath = config.databasePath;
const sqlite = require('sqlite3');
const db = new sqlite.Database(dbPath);
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.databaseName, config.databaseUsername, config.databasePassword, {
    dialect: config.databaseType,
    storage: dbPath
});

// Create the models.
const User = UserModel(sequelize, Sequelize);

// Dynamically create the CRUD models from the config.
const models = {};
for (let i = 0; i < config.models.length; i++) {
    let configModel = config.models[i];
    // Load the sequelize model file.
    let model = null;
    if (typeof configModel.model === 'string' || configModel.model instanceof String) {
        // Use a pre-defined model from this backend.
        model = require(`./${configModel.model}`);
    } else {
        // A custom model instance was provided.
        model = configModel.model;
    }

    // Instantiate a new model.
    models[configModel.name] = model(configModel.name, sequelize, Sequelize);
}

// sequelize is also exported because it is used in app.js to instantiate the database tables.
module.exports = {
    sequelize, models, User
};