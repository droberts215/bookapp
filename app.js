/**
 * BookApp - app.js
 * 
 * @author Dalton Roberts
 * @since 07.27.20
 */

// Import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

// Initialize the application and define port number
const port = 3000;
var app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/bookapp');
// Database connection success
mongoose.connection.on('connected', ()=>{
    console.log('Database connected successfully at port 27017');
});
// Database connection error
mongoose.connection.on('error', (err)=>{
    console.err('Database connection error: ' + err);
});

// Add middleware
app.use(cors());
app.use(bodyparser.json());

// Define route mapping and direct API calls to this file
var route = require('./routes/route');
app.use('/api', route);

// Direct access to public html directory
app.use(express.static(path.join(__dirname, 'public')));

// Bind application with defined port and note results 
app.listen(port, function(){
    console.log(`Server started successfully at port:${port}`);
}).on('error', function(err) { console.error(err); });