var mongoose = require('../config/mongoose');

var emergencySchema = mongoose.Schema({
  callerName: {
    type: String,
    required: true
  },
  callerContact: {
    type: String
  },
  liveAtScene: {
    type: Boolean,
    required: true
  },
  emergencyAddress: {
    type: String,
    required: true
  },
  addressCords: {
    lat: String,
    long: String
  },
  callerIsVictim: {
    type: Boolean
  },
  emergencyType: {
    type: String
  },
  noOfInjured: {
    type: Number,
    required: true
  },
  ambulanceRequired: {
    type: Number
  },
  createdAt: {
    type: String
  },
  lastUpdate: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  note: {
    type: String
  }
});

var Emergency = mongoose.model('emergencys', emergencySchema);
module.exports = Emergency
