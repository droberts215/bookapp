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
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var setUpPassport = require('./setup/setuppassport');

// Initialize the application and define port number
const port = 3000;
var app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/bookapp');

// Initialize user
setUpPassport();

// Add middleware
app.use(cors());
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(flash());
// Cookie & session code - Credit: "Express In Action" by Evan M. Hahn
app.use(cookieParser());
app.use(session({
    secret: "DKZv0LJs-HYqrvawQ#&!@!%V]Ww/4UiBp$s,<<MN",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection success
mongoose.connection.on('connected', ()=>{
    console.log('Database connected successfully at port 27017');
});
// Database connection error
mongoose.connection.on('error', (err)=>{
    console.err('Database connection error: ' + err);
});

// Direct access to public html directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Define route mapping and direct all calls to this file
var route = require('./routes/route');
app.use(route);

// Bind application with defined port and note results 
app.listen(port, function(){
    console.log(`Server started successfully at port:${port}`);
}).on('error', function(err) { console.error(err); });