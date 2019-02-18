const express = require('express');
const path = require('path');
const config = require('./config');

const passport = require('./auth/passport');
///const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const {isAdmin, hasRole} = require('./auth/auth');


// Models
const crudRouter = require('./routes/crud');
const {sequelize, models, User} = require('./models');

// Express server
const app = express();
const port = config.serverPort;
const instantiateDB = config.instantiateDB;

// Authentication
// All needed to setup passport:
//app.use(cookieParser()); // Not needed anymore?? See: https://github.com/expressjs/session
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'something_so_secret' }));
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

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);


// Support JSON encoded bodies.
app.use(express.json());
// Support URL-encoded bodies;
app.use(express.urlencoded({extended: true}));

// CRUD operations routes are dynamically generated from the config.
for (let i=0; i<config.models.length; i++) {
    let model = config.models[i];
    app.use(model.path, hasRole(model.role), crudRouter(models[model.name]));
}

// Note: must be protected, only for admins
app.use('/users', isAdmin, crudRouter(User));

// Serve the static files in the client folder.
app.use('/', express.static( path.join(__dirname, '../client') ));

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
startServer();



