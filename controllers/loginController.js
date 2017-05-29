var Login = require('../models/login');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var async = require('async');

exports.login = function(req, res) {
	res.render('login',{ message: req.flash('loginMessage') });
}

/*
exports.loginValidate = function(req, res) { 	
	passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
}
  
  

*/