//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data

var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
