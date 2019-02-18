const express = require('express');
const path = require('path');
const config = require('./config');

const passport = require('./auth/passport');
///const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var flash = require('connect-flash');

var {isAdmin} = require('./auth/auth');


// Models
const {Doc, Article, Event, User} = require('./models');
const crudRouter = require('./routes/crud');
const {sequelize} = require('./models');

// Express server
const app = express();
const port = config.serverPort;
const instantiateDB = config.instantiateDB;

// Authentication
// All needed to setup passport:
//app.use(cookieParser()); // Not needed anymore?? See: https://github.com/expressjs/session
app.use(flash());
app.use(bodyParser());
app.use(session({ secret: 'something_so_secret' }));
app.use(passport.initialize());
app.use(passport.session());

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

// Docs CRUD operations route
app.use('/docs', crudRouter(Doc));
app.use('/articles', crudRouter(Article));
app.use('/events', crudRouter(Event));
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



