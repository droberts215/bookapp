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
    readCount:{
        type: Number,
        required: true
    },
    lastReadDate: [{
        userId: {type: String, required: true},
        date: {type: Date, required:true}
    }]
});

// Export book in defined schema
var Book = module.exports = mongoose.model('Book', bookSchema);