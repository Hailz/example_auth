var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback){
  callback(null, user.id); //error null, return info
});

passport.deserializeUser(function(id, cb){
  db.user.findById(id).then(function(user){
    cb(null, user);
  }).catch("Callback error: " + cb);
});

passport.use(new localStrategy({
  usernameField: 'email', //uses email for username
  passwordField: 'password'
}, function(email, password, cb){
  db.user.findOne({
    where: {email: email} //where email == email
  }).then(function(user){
    if(!user || !user.isValidPassword(password)){
      cb(null, false);
    }else{
      cb(null, user);
    }
  }).catch(cb); //send null, null
}));

module.exports = passport;
