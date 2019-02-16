const DocModel = require('./doc');

const path = require('path');

const dbPath = path.join(__dirname, '../../db.sqlite');
const sqlite = require('sqlite3');
const db = new sqlite.Database(dbPath);
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database','username','password', {
    dialect: 'sqlite',
    storage: dbPath
});

const Doc = DocModel(sequelize, Sequelize);

module.exports = {
    sequelize, Doc
};