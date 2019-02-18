module.exports = {
    serverPort: 8081,
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
    adminEmail: 'admin@nothing'
};