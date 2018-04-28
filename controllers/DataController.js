const Admin = require('../models/adminModel');
const Driver = require('../models/driverModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const Ambulance = require('../models/ambulanceModel');
const Emergency = require('../models/emergencyModel')

module.exports = {
  getDriversNo(req, res, next){
    Driver.count({}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDriverDetails(req, res, next){
    Driver.find().then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getAmbulanceNo(req, res, next){
    Ambulance.count({}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getAmbulanceDetails(req, res, next){
    Ambulance.find().then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getTotalCallsNo(req, res, next){
    Emergency.count({active: false}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getTotalCasesNo(req, res, next){
    Emergency.count({active: true}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getAvailableAmbulanceNo(req, res, next){
    Ambulance.count({isAvailable: true}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getActiveEmergencyNo(req, res, next){
    Emergency.count({inSession: true}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }
};