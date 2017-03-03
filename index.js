//require express and other global variables
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var isLoggedin = require('./middleware/isLoggedin');

require('dotenv').config();

var app = express();

//set and use statements
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize()); //session must come before passport
app.use(passport.session());

app.use(function(req, res, next){ //custom middleware
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//routes
app.get('/', function(req, res){
  res.render('home');

});

app.get('/profile', isLoggedin, function(req, res){
  res.render("profile");

});

app.use('/auth', require('./controllers/auth'));

//controllers


//listen
app.listen(3000);
