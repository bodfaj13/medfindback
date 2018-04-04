const Admin = require('../models/adminModel');
const Driver = require('../models/driverModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const Ambulance = require('../models/ambulanceModel')
const Emergency = require('../models/emergencyModel')

module.exports = {
  recordCall(req, res, next) {
    var callerName = req.body.callerName;
    var callerContact = req.body.callerContact;
    var liveAtScene = req.body.liveAtScene;
    var emergencyAddress = req.body.emergencyAddress;
    var callerIsVictim = req.body.callerIsVictim;
    var emergencyType = req.body.emergencyType;
    var noOfInjured = req.body.noOfInjured;
    var ambulanceRequired = req.body.ambulanceRequired;
    var note = req.body.note;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    
    var emergencyDetails = {
      callerName: callerName,
      callerContact: callerContact,
      liveAtScene: liveAtScene,
      emergencyAddress: emergencyAddress,
      callerIsVictim: callerIsVictim,
      noOfInjured: noOfInjured,
      emergencyType: emergencyType,
      note: note,
      createdAt: createdAt
    };

    var emergencyCase = new Emergency(emergencyDetails);
    emergencyCase
      .save()
      .then(function(data) {
      console.log(data);
      res.send({
        success: true,
        entity: 'Emergency Call',
        callDetails: data
      });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  callToCase(req, res, next) {
    
  }
};
