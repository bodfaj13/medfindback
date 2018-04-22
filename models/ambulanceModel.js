var mongoose = require("../config/mongoose");

var ambulanceSchema = mongoose.Schema({
  isAvailable: {
    type: String,
    required: true,
    default: true
  },
  assignedCases: [{
    type: String
  }],
  assignedDriver: {
    type: String,
    required: true
  },
  plateNmber: {
    type: String
  },
  engineNumber: {
    type: String
  },
  vechileName: {
    type: String
  },
  vechileModel: {
    type: String
  },
  vechilePapers: [{
    name: String,
    file: String
  }],
  createAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  paramedic: [{
    type: String
  }]
});

var Ambulance = mongoose.model("ambulances", ambulanceSchema);
module.exports = Ambulance;