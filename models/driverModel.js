var mongoose = require("../config/mongoose");
var bcrypt = require("bcrypt");

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var driverSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  isAvailable: {
    type: String,
    default: true
  },
  createdBy: {
    type: ObjectId
  },
  createdAt: {
    type: String
  },
  assignedAmbulance: {
    type: String
  },
  address: {
    type: String
  },
  contact: {
    type: String
  }
});

var Driver = mongoose.model("drivers", driverSchema);
module.exports = Driver;