var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_death_F')
.get(function () {
  return this.date_of_death?moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('date_of_birth_F')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var a= this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
  var b = this.date_of_death?moment(this.date_of_death).format('YYYY-MM-DD') : '';
  
  return a+' - '+ b;
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);