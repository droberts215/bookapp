// Import modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Grab book and user schemas defined in models
var Book = require('../models/books');
var User = require('../models/users'); // ****************************************** DELETE?

// Set local User variables  - Credit: "Express In Action" by Evan M. Hahn // ****************************************** DELETE?
router.use(function(req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

// Render home page - shows my book list and gives description of the app
router.get('/', function(req,res) {
    res.json({message: "hello!"});
});

// User login/logout  - Credit: "Express In Action" by Evan M. Hahn // ****************************************** DELETE?
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/logout", function(req, res) { // ****************************************** DELETE?
    req.logout();
    res.redirect("/");
});

// User signup  - Credit: "Express In Action" by Evan M. Hahn // ****************************************** DELETE?
router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // Check if user already exists before creating a new one
    User.findOne({ username: username}, function(err, user) {
        if (err) {return next(err)};
        if (user) {
            res.json({message: "User already exists"});
        }
        // Create new user
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

// Retrieve book list and order by time since last read
router.get('/booklist', function(req, res, next) {
    Book.find(function(err, books) {
        if (err) {
            res.json({message: 'Can\'t seem to find that list'});
        } else {
            res.json(books);
        }
    }).sort( { lastReadDate: -1});
});

// Add book to list
router.post('/addbook', function(req, res) {
    let newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        webLink: req.body.webLink,
        readCount: req.body.readCount,
        lastReadDate: req.body.lastReadDate
        /* readLog: [{
            userId: req.locals.currentUser,
            readCount: req.body.readCount,
            lastReadDate: req.body.lastReadDate
        }] */
    });

    newBook.save(function(err, book) {
        if (err) {
            res.json({message: 'Failed to add book'});
        } else {
            res.json({message: `${req.body.name} has been added!`});
        }
    });
});

// Retrieve specific book from list
router.get('/book/:id', function(req, res) {
    Book.findOne({_id: req.params.id}, function(err, book) {
        if (err) {
            res.json({message: 'Failed to locate that book'});
        } else {
            res.json(book);
        }
    });
});

// Update book in database
router.post('/updatebook/:id', function(req, res) {
    Book.update({_id: req.params.id}, { "$set": { 'webLink': req.body.webLink, 'readCount': req.body.readCount, 'lastReadDate': req.body.lastReadDate }}, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Delete book from list
router.post('/delbook/:id', function(req, res) {
    Book.remove({_id: req.params.id}, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.flash("info", "Book deleted!");
            res.json(result);
        }
    });
});

// Error handler if route is undefined
router.use(function(req,res) {
    res.statusCode = 404;
    res.end("404 Error");
});

// Check authentication - Credit: "Express In Action" by Evan M. Hahn // ****************************************** DELETE?
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in first");
        res.redirect('/login');
    }
};

// Export router
module.exports = router;