/*
 * Create the models and setup the database connection.
 */

const config = require('./../config');
const UserModel = require('./user');

// Create sqlite database connection.
const path = require('path');
const dbPath = path.join(__dirname, `../../${config.databasePath}`);
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
    let model = require(`./${configModel.model}`);
    // Instantiate a new model.
    models[configModel.name] = model(configModel.name, sequelize, Sequelize);
}

// sequelize is also exported because it is used in app.js to instantiate the database tables.
module.exports = {
    sequelize, models, User
};