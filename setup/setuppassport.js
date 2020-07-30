// Import modules
var passport = require('passport');
var User = require('../models/users');
const users = require('../models/users');
var LocalStrategy = require("passport-local").Strategy;

passport.use("login", new LocalStrategy(
    function(username,password, done) {
        users.findOne({ username: username}, function(err, user) {
            if (err) { return done(err);}
            if (!user) {
                return done(null, false, {message: "No user found with that username"});
            }
            user.checkPassword(password, function(err, isMatch) {
                if (err) { return done(err);}
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Invalid password"});
                }
            });
        });
    }
));
// Passport setup - Credit: "Express In Action" by Evan M. Hahn
module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};