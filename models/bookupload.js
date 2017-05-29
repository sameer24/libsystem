var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var BookUploadSchema = Schema({
  book: { type: Schema.ObjectId, ref: 'Book', required: true },
  bookfrontpage: { type: String, required: true },
  booklastpage: { type: String, required: true },
  bookpdf: { type: String, required: true },
  bookpath: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookUploadSchema
  .virtual('url')
  .get(function () {
    //  return '/catalog/bookupload/' + this._id;
    return '/catalog';
  });

BookUploadSchema
  .virtual('upload_date_formatted')
  .get(function () {
    return moment(this.upload_date).format('MMMM Do, YYYY');
  });

//Export model
module.exports = mongoose.model('BookUpload', BookUploadSchema);