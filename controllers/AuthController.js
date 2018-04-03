const Admin = require('../models/adminModel');
const Driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  registerAdmin(req, res, next){
    var fullname = req.body.fullname;
    var email = req.body.email;
    var password = req.body.password;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var adminDetails = { 
      fullName: fullname, 
      email: email, 
      password: password, 
      createdAt: createdAt 
    };

    bcrypt.hash(adminDetails.password, 10, function(err, hash){
        if(err)throw err;
        adminDetails.password = hash;
        
        Admin.findOne({ email: adminDetails.email })
        .then(function(data) {
          if (!data) {
            var admin = new Admin(adminDetails);
            admin
              .save()
              .then(function(data) {
              res.send({
                success: "Registration done successfully",
                entity: 'admin'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  registerDriver(req, res, next) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var contact = req.body.contact;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var driverDetails = { 
      fullname: fullname, 
      email: email, 
      password: password, 
      createdAt: createdAt,
      contact: contact,
      address: address
    };

    bcrypt.hash(driverDetails.password, 10, function(err, hash){
        if(err)throw err;
        driverDetails.password = hash;
        
        Driver.findOne({ email: driverDetails.email })
        .then(function(data) {
          if (!data) {
            var driver = new Driver(driverDetails);
            driver
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: "Registration done successfully",
                entity: 'driver'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  adminLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var adminDetails = {
      email: email,
      password: password
    };

    Admin.findOne({ email: adminDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email Address not found"
          });
        } else {
          bcrypt.compare(adminDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Admin Authentication Successfull",
                adminDetails: data
              });
            } else {
              res.status(403).send({
                error_Password: "Incorrect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  },
  driverLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var driverDetails = {
      email: email,
      password: password
    };

    Driver.findOne({ email: driverDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email not found"
          });
        } else {
          bcrypt.compare(driverDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Driver Authentication Successfull"
              });
            } else {
              res.status(403).send({
                error_Password: "Incorect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  }
};