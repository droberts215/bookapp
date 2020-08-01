// Import modules
var express = require('express');
var router = express.Router();

// Grab book and user schemas defined in models
var Book = require('../models/books');
//var User = require('../models/users');

// Render home page - shows my book list and gives description of the app
router.get('/', function(req,res) {
    res.json({message: "hello!"});
});

// User login
router.post("/login", function(req, res) {
    // TODO
});
// User logout
router.get("/logout", function(req, res) {
    // TODO
});

// User signup
router.post('/register', function(req, res, next) {
    //var username = req.body.username;
    //var password = req.body.password;
});

// Retrieve book list and order by time since last read
router.get('/booklist', function(req, res, next) {
    Book.find(function(err, books) {
        if (err) {
            res.json(err);
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
            res.json(err);
        } else {
            res.json({message: `${req.body.name} has been added!`});
        }
    });
});

// Retrieve specific book from list
router.get('/book/:id', function(req, res) {
    Book.findOne({_id: req.params.id}, function(err, book) {
        if (err) {
            res.json(err);
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

// Delete book from list - after users added: change to delete user's readLog only, then only if readLog null delete book
router.post('/delbook/:id', function(req, res) {
    Book.remove({_id: req.params.id}, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Error handler if route is undefined
router.use(function(req,res) {
    res.statusCode = 404;
    res.end("404 Error");
});

// Export router
module.exports = router;