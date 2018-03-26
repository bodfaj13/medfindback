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
    type: String
  }
});

var Ambulance = mongoose.model("ambulances", ambulanceSchema);
module.exports = Ambulance;