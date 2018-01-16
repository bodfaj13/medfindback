const mongoose = require('../config/mongoose');

var userMsgModelSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  }
});

const UserMsg = mongoose.model('usermessages', userMsgModelSchema);
module.exports = UserMsg;
