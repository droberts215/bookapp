// Import modules
var mongoose = require('mongoose');
const { Number } = require('mongoose');

// Define Book schema
const BookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    webLink:{
        type: String,
        required: false
    },
    readCount:{
        type: Number,
        required: true
    },
    lastReadDate:{
        type: Date,
        required: false
    }
});

// Export book in defined schema
const Book = module.exports = mongoose.model('Book', BookSchema);