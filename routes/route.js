// Import modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Grab book and user schemas defined in models
var Book = require('../models/books');
var User = require('../models/users');

// Set local User variables  - Credit: "Express In Action" by Evan M. Hahn
router.use(function(req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

// Render home page - shows my book list and gives description of the app
router.get('/', function(req,res) {
    // User search  - Credit: "Express In Action" by Evan M. Hahn
    User.find()
    .sort({ username: "descending"})
    .exec(function(err, users) {
        if (err) {return next(err); }
        res.render("index", {users: users});
    });
});

// User login/logout  - Credit: "Express In Action" by Evan M. Hahn
router.get("/login", function(req, res) {
    res.render("login");
});
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// User signup  - Credit: "Express In Action" by Evan M. Hahn
router.get('/signup', function(req, res) {
    res.render("signup");
});
router.post('/signup', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // Check if user already exists before creating a new one
    User.findOne({ username: username}, function(err, user) {
        if (err) {return next(err)};
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
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

// Admin page to edit book list
router.get('/editlist', ensureAuthenticated, function(req, res) {
    res.render("editlist");
})

// Retrieve book list
router.get('/api/booklist', function(req, res, next) {
    Book.find(function(err, books) {
        if (err) {
            res.json({message: 'Can\'t seem to find that list'});
        } else {
            res.json(books);
        }
    });
});

// Retrieve specific book from list
router.get('/api/book/:id', function(req, res) {
    Book.find({_id: req.params.id}, function(err, book) {
        if (err) {
            res.json({message: 'Failed to locate that book'});
        } else {
            res.json(book);
        }
    });
});

// Add book to list
router.post('/api/addbook', ensureAuthenticated, function(req, res) {
    let newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        webLink: req.body.webLink,
        readLog: [{
            userId: req.locals.currentUser,
            readCount: req.body.readCount,
            lastReadDate: req.body.lastReadDate
        }]
    });

    newBook.save(function(err, book) {
        if (err) {
            res.json({message: 'Failed to add book'});
        } else {
            res.json({message: `${req.body.name} has been added!`});
        }
    });
});

// Update a book's last-read time as current time
router.post('/api/updatelastread/:id', ensureAuthenticated, function(req, res) {
    Book.updateOne({_id: req.params.id}, { lastReadDate: Date.now(), $inc: {readCount: 1} }, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.flash("info", "Read time updated!");
            res.json(result);
        }
    });
});

// Delete book from list
router.post('/api/delbook/:id', ensureAuthenticated, function(req, res) {
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

// Check authentication - Credit: "Express In Action" by Evan M. Hahn
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