// Import modules
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_FACTOR = 14;

// Define User schema
var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    displayName:{
        type: String
    },
});

// Return display name if set, username otherwise
userSchema.methods.name = function() {
    return this.displayName || this.username;
};

// Password encryption code - Credit: "Express In Action" by Evan M. Hahn
var noop = function() {};
userSchema.pre("save", function(done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop,
            function(err, hashedPassword) {
                if (err) {return done(err); }
                user.password = hashedPassword;
                done();
        });
    })
});

// Password verification code - Credit: "Express In Action" by Evan M. Hahn
userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

// Export User in defined schema
var User = module.exports = mongoose.model('User', userSchema);