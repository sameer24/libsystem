var BookUpload = require('../models/bookupload');
var Book = require('../models/book');

// Display BookUpload create form on GET
exports.bookupload_create_get = function (req, res, next) {
    //if (err) { return next(err);}
    //res.render('bookupload_form',{title:'Create BookUpload'});
    console.log(req.Ext_Error);
    Book.find({}, 'title')
        .exec(function (err, books) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('bookupload_form', { title: 'Create BookUpload', books: books, messages: req.flash('error')  });
        });
};

// Display BookUpload create form on POST

exports.bookupload_create_post = function (req, res, next) {
    //if (err) { return next(err);}
    console.log('#############ASASA@@@@@@@@@@');
    console.log(req.Ext_Error);
    console.log(req.files);

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    if (req.Ext_Error) {
         res.redirect('/catalog/bookupload/create');
        //res.redirect('/catalog');
    } else {

        var bookuploadArray = new Array();
        for (var i = 0; i < req.files.length; i++) {
            for (var attributename in req.files[i]) {
                // console.log(attributename + ": " + req.files[i][attributename]);
            }
            bookuploadArray[req.files[i]['fieldname']] = req.files[i];
        }


        bookfrontpage = typeof bookuploadArray['bookfrontpage']['filename'] !== "undefined" ? bookuploadArray['bookfrontpage']['filename'] : '';
        booklastpage = typeof bookuploadArray['booklastpage']['filename'] !== "undefined" ? bookuploadArray['booklastpage']['filename'] : '';
        bookpdf = typeof bookuploadArray['bookpdf']['filename'] !== "undefined" ? bookuploadArray['bookpdf']['filename'] : '';

        // req.checkBody('bookfrontpage', 'Restaurant Logo - Please upload an image Jpeg, Png or Gif').isImage(bookfrontpage);

        // return res.send('DONE');
        //console.log('This is line no 17'+req.files[0]['filename']+req.files);
        var bookuploadschema = new BookUpload({
            book: req.body.book,
            bookfrontpage: bookuploadArray['bookfrontpage']['filename'],
            booklastpage: bookuploadArray['booklastpage']['filename'],
            bookpdf: bookuploadArray['bookpdf']['filename'],
            bookpath: req.files[0]['path']
        });

        console.log('This is line no 22' + req.files.length);
        console.log(bookuploadschema);
        //res.send(req.files);

        var errors = req.validationErrors();

        if (errors) {
            console.log('Display Error' + errors);
        } else {
            bookuploadschema.save(function (err) {
                if (err) { return next(err); }
                //successful - redirect to new book-instance record.
                res.redirect(bookuploadschema.url);
            });
        }
    }
};



/*exports.bookupload_create_post = function (req, res, next) {
 console.log('---------%%%%%%%%%%%%%%%%%%%%%%%%%%---------')
     console.log(req.files);
}
*/