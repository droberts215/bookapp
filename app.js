/**
 * BookApp - app.js
 * 
 * @author Dalton Roberts
 * @since 07.31.20
 */

// Import modules
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // ****************************************** DELETE?
var session = require('express-session'); // ****************************************** DELETE?
var flash = require('connect-flash'); // ****************************************** DELETE?
var passport = require('passport'); // ****************************************** DELETE?
var setUpPassport = require('./setup/setuppassport'); // ****************************************** DELETE?

// Initialize the application and define port number
const port = process.env.SERVER_PORT;
var app = express();

// Connect to database
mongoose.connect(process.env.DB, { useNewUrlParser: true });

// Initialize user // ****************************************** DELETE?
setUpPassport();

// Add middleware
app.use(cors());
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(flash()); // ****************************************** DELETE?
// Cookie & session code - Credit: "Express In Action" by Evan M. Hahn
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
}).on('error', function(err) { console.error(err); });