// Import modules
var express = require('express');
var router = express.Router();

// Grab book schema defined in models
var Book = require('../models/books');

// Retrieve book list
router.get('/booklist', (req, res, next)=>{
    Book.find(function(err, books) {
        if (err) {
            res.json({msg: 'Can\'t seem to find that list..'});
        } else {
            res.json(books);
        }
    });
});

// Retrieve specific book from list
router.get('/book/:id', (req, res, next)=>{
    Book.find({_id: req.params.id}, function(err, book) {
        if (err) {
            res.json({msg: 'Failed to locate that book'});
        } else {
            res.json(book);
        }
    });
});

// Add book to list
router.post('/addbook', (req, res, next)=>{
    let newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        webLink: req.body.webLink,
        readCount: req.body.readCount,
        lastReadDate: req.body.lastReadDate
    });

    newBook.save((err, book)=>{
        if (err) {
            res.json({msg: 'Failed to add book'});
        } else {
            res.json({msg: `${req.body.name} has been added!`});
        }
    });
});

// Update a book's last-read time as current time
router.post('/updatelastread/:id', (req, res, next)=>{
    Book.updateOne({_id: req.params.id}, { lastReadDate: Date.now(), $inc: {readCount: 1} }, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Delete book from list
router.post('/delbook/:id', (req, res, next)=>{
    Book.remove({_id: req.params.id}, function(err, result){
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Export router
module.exports = router;