module.exports = {
    serverPort: 8081,
    cors: true,

    // If true then the existing database tables will be dropped and replaced.
    // Also a default admin user will be created.
    instantiateDB: true,

    // Database path relative to the project root folder.
    databasePath: 'db.sqlite',

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

    // CRUD models
    // name: The name of the model and its underlying table name. Each name must be unique and in camel-case.
    // path: The URL path for CRUD operations.
    // model: The sequelize model file (without .js extension) to use as specified in the models-folder.
    models: [
        {name: 'doc', path: '/docs', model: 'doc', role: null},
        {name: 'article', path: '/articles', model: 'article', role: 'user'},
        {name: 'event', path: '/events', model: 'event', role: 'user'},
    ]
};