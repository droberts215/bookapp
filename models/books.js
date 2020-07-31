// Import modules
var mongoose = require('mongoose');

// Define Book schema
var bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    webLink:{
        type: String
    },
    readCount: {type: Number, default: 0},
    lastReadDate: {type: Date}
    /* readLog:[{
        userId: {type: String, required: true},
        readCount: {type: Number, default: 0},
        lastReadDate: {type: Date}
    }] */
});

// Export book in defined schema
var Book = module.exports = mongoose.model('Book', bookSchema);