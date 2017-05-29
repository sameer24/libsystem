var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LoginSchema = Schema({
  username: { type: String, required: true, min: 3, max: 30 }, //reference to the associated book
  password: { type: String, required: true, min: 3, max: 30 }, //reference to the associated book

}, { collection: 'userInfos' });

// Virtual for Genre's URL
LoginSchema
  .virtual('url')
  .get(function () {
    return '/login/' + this._id;
  });

LoginSchema.methods.validPassword = function (p) {
  return this.password == p;
}
//Export model
module.exports = mongoose.model('userInfo', LoginSchema);