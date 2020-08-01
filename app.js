/**
 * BookApp - app.js
 * 
 * @author Dalton Roberts
 * @since 08.1.20
 */

// Import modules
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');

// Initialize the application and define port number
const port = process.env.SERVER_PORT;
var app = express();

// Connect to database
mongoose.connect(process.env.DB, { useNewUrlParser: true });

// Add middleware
app.use(cors());
app.use(bodyparser.json());
app.use(logger('dev'));

// Database connection success
mongoose.connection.on('connected', ()=>{
    console.log('Database connected successfully.');
});
// Database connection error
mongoose.connection.on('error', (err)=>{
    console.error('Database connection error: ' + err);
});

// Direct access to public html directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Define route mapping
var route = require('./routes/route');
app.use('/api', route);

// Bind application with defined port and note results 
app.listen(port, function(){
    console.log(`Server started successfully.`);
}).on('error', function(err) { console.error('Server connection error: ' + err); });