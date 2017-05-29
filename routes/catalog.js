var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Require controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');
var book_upload_controller = require('../controllers/bookuploadController');

//file Upload
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
    putSingleFilesInArray: true
})

var path = require('path');

var upload = multer({
    storage: storage, 
    putSingleFilesInArray: true,
    fileFilter: function (req, file, callback) {
        console.log(file);
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' ) {
            //return callback(new Error('Only images are allowed'));
            req.Ext_Error = 'Unsupported File Format. Please Retry';
            req.flash('error', 'Flash-Unsupported File Format. Please Retry')
            callback(null, false)    
        } 
        console.log('-----');
        callback(null, true)
    },
});

router.use(isLoggedIn);

/* GET catalog home page. */
router.get('/', function (req, res, next) { console.log(req.session, req.isAuthenticated); next() }, book_controller.index);

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/book/create', book_controller.book_create_get);

/* POST request for creating Book. */
router.post('/book/create', book_controller.book_create_post);

/* GET request to delete Book. */
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);

/* GET request to update Book. */
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);

/* GET request for one Book. */
router.get('/book/:id', book_controller.book_detail);

/* GET request for list of all Book items. */
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

/* GET request for creating Author. NOTE This must come before route for id (i.e. display author) */
router.get('/author/create', author_controller.author_create_get);

/* POST request for creating Author. */
router.post('/author/create', author_controller.author_create_post);

/* GET request to delete Author. */
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);

/* GET request to update Author. */
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author
router.post('/author/:id/update', author_controller.author_update_post);

/* GET request for one Author. */
router.get('/author/:id', author_controller.author_detail);

/* GET request for list of all Authors. */
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

/* GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id) */
router.get('/genre/create', genre_controller.genre_create_get);

/* POST request for creating Genre. */
router.post('/genre/create', genre_controller.genre_create_post);

/* GET request to delete Genre. */
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

/* GET request to update Genre. */
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre
router.post('/genre/:id/update', genre_controller.genre_update_post);

/* GET request for one Genre. */
router.get('/genre/:id', genre_controller.genre_detail);

/* GET request for list of all Genre. */
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

/* GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id) */
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

/* POST request for creating BookInstance. */
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

/* GET request to delete BookInstance. */
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

/* GET request to update BookInstance. */
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

/* GET request for one BookInstance. */
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

/* GET request for list of all BookInstance. */
router.get('/bookinstances', book_instance_controller.bookinstance_list);


/* GET request for creating Book Upload. NOTE This must come before route that displays BookUpload (uses id) */
router.get('/bookupload/create', book_upload_controller.bookupload_create_get);

/* POST request for creating Book upload. */
router.post('/bookupload/create', upload.any() , book_upload_controller.bookupload_create_post );

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        console.log(req.session+passport.session);
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;