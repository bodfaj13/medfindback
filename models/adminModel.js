var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');

var adminSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true,
      bcrypt: true
  },
  privilege: {
      type: String,
      required: true
  }
});

var Admin = mongoose.model('admins', adminSchema);
module.exports = Admin

