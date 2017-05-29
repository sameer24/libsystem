var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var login_controller = require('../controllers/loginController');

/// BOOK ROUTES ///

/* GET catalog home page. */
router.get('/', login_controller.login);

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/catalog', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
/*
router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});
*/
router.get('/logout', function (req, res, next) {
  console.log('Logout done with client Action loginroute.js line 28');
  req.logout();
  res.redirect('/');
});

module.exports = router;