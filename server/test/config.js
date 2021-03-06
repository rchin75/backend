/*
 * A configuration to be used for testing purposes.
 */
const path = require('path');

module.exports = {
    serverPort: 8081,
    cors: true,

    // If true then the existing database tables will be dropped and replaced.
    // Also a default admin user will be created.
    instantiateDB: true,

    // Database path. Provide an absolute path here.
    databasePath: path.join(__dirname, '../../db.sqlite'),

    // Database settings
    databaseName: 'database',
    databaseType: 'sqlite',
    databaseUsername: 'username',
    databasePassword: 'password',

    // Default admin user
    adminUsername: 'admin',
    adminPassword: 'admin',
    adminRealName: 'Admin',
    adminEmail: 'admin@nothing',

    // General security
    // True to protect all static routes under /
    // False to let anyone open routes under /
    mustBeLoggedIn: true,

    // Paths for static routes
    // The directory path for the root /
    clientPath: path.join(__dirname, '../../client'),
    // The directory path for the login page /login
    loginPath: path.join(__dirname, '../../login-client'),

    // CRUD models
    // name: The name of the model and its underlying table name. Each name must be unique and in camel-case.
    // path: The URL path for CRUD operations.
    // model: The sequelize model file (without .js extension) to use as specified in the models-folder.
    // role: the role needed to access this CRUD model. Possible values the role name, null (= anyone), any (= any role), none (= logged in, but no role required)
    models: [
        {name: 'doc', path: '/docs', model: 'doc', role: null},
        {name: 'article', path: '/articles', model: 'article', role: 'user'},
        {name: 'event', path: '/events', model: 'event', role: 'user'},
    ]
};