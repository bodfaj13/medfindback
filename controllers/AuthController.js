const User = require('../models/usersModel');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  registerUser (req, res, next) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var contact = req.body.contact;
    var createdAt =  moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var userDetails = {
      fullname: fullname,
      email: email,
      contact: contact,
      createdAt: createdAt
    };

    User.findOne({email: userDetails.email})
    .then(function (data){
      if(!data){
        var user = new User(userDetails);
        user.save()
        .then(function (data) {
          console.log(data)
          res.send({
            success: 'You have been registered successfully'
          })
        })
        .catch(function (error) {
          console.log(error.message)
          res.status(400).send({
            error: error
          })
        });
      }else{
        res.status(400).send({
          error_Email: 'Email is already taken'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
      res.status(400).send(error)
    });
  },
  adminLogin (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var adminDetails = {
      email: email,
      password: password
    }

    Admin.findOne({ email: adminDetails.email})
    .then(function (data) {
      if(!data){
        res.status(403).send({
          error: 'Email not found'
        })
      }else{
        bcrypt.compare(adminDetails.password, data.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
          var tokendata = JSON.stringify(data);
          var token = jwt.sign(tokendata, appdetails.jwtSecret);
          console.log(token)
          res.send({ 
            token: token
          })
          }else{
            res.status(403).send({
              error: 'Incorect password'
            })
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error)
      res.status(400).send(error)
    });

  }
}