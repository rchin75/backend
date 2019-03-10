const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Express server
const app = express();

module.exports = (configuration) => {
    // Note: the config us used to setup the sequelize models, so must we set before all else.
    const config = require('./config')(configuration);

    // Server settings
    const port = config.serverPort;
    const instantiateDB = config.instantiateDB;

    // Authentication
    const passport = require('./auth/passport');
    const {mustBeLoggedIn, isAdmin, hasRole} = require('./auth/auth');
    const {hashPassword} = require('./auth/hash');
    const authRouter = require('./routes/auth');

    // Models
    const crudRouter = require('./routes/crud');
    const {sequelize, models, User} = require('./models');

    // Authentication
    // All needed to setup passport:
    //app.use(cookieParser()); // Not needed anymore?? See: https://github.com/expressjs/session
    app.use(flash());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'something_so_secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Allow CORS.
    if (config.cors === true) {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    app.use('/login', express.static( config.loginPath ));
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login?failed=1',
            failureFlash: true })
    );
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    // Replaced by bodyParser (above):
    ///app.use(express.json());
    ///app.use(express.urlencoded({extended: true}));

    // CRUD operations routes are dynamically generated from the config.
    for (let i=0; i<config.models.length; i++) {
        let model = config.models[i];
        app.use(model.path, hasRole(model.role), crudRouter(models[model.name]));
    }

    // Note: must be protected, only for admins
    app.use('/users', isAdmin, crudRouter(User));
    app.use('/auth', authRouter);

    // Serve the static files in the client folder.
    app.use('/', mustBeLoggedIn(config.mustBeLoggedIn), express.static( config.clientPath ));

    if (config.adminPath) {
        // Serve the static files in the admin folder.
        app.use('/admin', mustBeLoggedIn(true), isAdmin, express.static( config.adminPath ));
    }

    async function startServer() {
        if (instantiateDB) {
            // Wait for the server to setup.
            // force: true means existing tables will be dropped.
            await sequelize.sync({force:true});

            // Create default admin user.
            await User.create({
                username: config.adminUsername,
                password: config.adminPassword,
                realName: config.adminRealName,
                email: config.adminEmail,
                roles: ['admin','user']
            });
        }

        // Start listening for requests.
        app.listen(port, () => console.log(`Backend running on port ${port}.`));
    }
    //startServer();

    return {start: startServer, app};
};





