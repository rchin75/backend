/*
 * Configures the passport library to use a local login strategy.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./../models');

passport.use(new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
    User.findOne({where: {username:username} }).then(user =>{
        if (!user) {
            console.log("Invalid username");
            return done(null, false, { message: 'Incorrect username.'});
        }
        if (user.password !== password) {
            console.log("Invalid password");
            return done(null, false, { message: 'Incorrect password.'})
        }
        console.log("User is granted access.");
        return done(null, user);
    }).catch(err =>{
        console.log("error loading user.");
        done(err);
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(user =>{
        done(null, user);
    }).catch(err =>{
        done(err);
    });
});

module.exports = passport;