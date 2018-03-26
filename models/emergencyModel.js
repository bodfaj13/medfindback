var mongoose = require('../config/mongoose');

var emergencySchema = mongoose.Schema({
  callername: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  liveAtScene: {
    type: Boolean
  }
  currentLocation: {
    type: String,
    required: true
  },
  callerIsVictim: {
    type: Boolean,
    required: false
  },
  emergencyType: {
    type: String,
    required: true
  },
  numberOfInjured: {
    type: number,
    required: true
  },
  ambulanceRequired: {
    type: number,
    required: true,
    default: 1
  },
  createdAt: {
    type: String
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

var emergency = mongoose.model('emergencys', emergencySchema);
module.exports = Emergency
