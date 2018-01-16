const UserMsg = require('../models/userMsgModel');
const moment = require('moment');

module.exports = {
  sendMsg (req, res, next) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var message = req.body.message;
    var createdAt =  moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var userMessage = {
      fullname: fullname,
      email: email,
      message: message,
      createdAt: createdAt
    };

    
  }
}