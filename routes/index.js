const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserMsgController = require("../controllers/UserMsgController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails.json");
const FunctionController = require("../controllers/FunctionController");
const moment = require('moment');
const Admin = require('../models/adminModel');
const DataController = require('../controllers/DataController');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "ABDS BackEnd" });
  console.log(`Lets get started`);
});

router.get("/api", (req, res, next) => {
  res.send({
    msg: "hello world"
  });
});

//adminlogin
router.post("/api/adminlogin", AuthController.adminLogin);

//driverlogin
router.post("/api/driverlogin", AuthController.driverLogin);

//create-emergency
router.post("/api/recordcallcase", FunctionController.recordCall);

//emergency-to-case
router.post("/api/createcase", FunctionController.callToCase);

//user contact message
router.post(
  "/api/usersendcontact",
  ControllerPolicy.userSendContact,
  UserMsgController.sendMsg
);

//get-driver-no
router.get("/api/getdriversno", DataController.getDriversNo);

//get-driver-details
router.get("/api/getdriversdetails", DataController.getDriverDetails);

//get-ambulance-no
router.get("/api/getambulanceno", DataController.getAmbulanceNo);

//get-ambulance
router.get("/api/getambulancedetails", DataController.getAmbulanceDetails);

//get-calls
router.get("/api/gettotalcallno", DataController.getTotalCallsNo);

//get-total cases
router.get("/api/gettotalcasesno", DataController.getTotalCasesNo);

//get-total cases
router.get("/api/getavailableambulanceno", DataController.getAvailableAmbulanceNo);

//get-available-ambulance-no
router.get("/api/getavailableambulanceno", DataController.getAvailableAmbulanceNo);

//get-active-emergency-no
router.get("/api/getactiveambulanceno", DataController.getActiveEmergencyNo);

//route middleware to authenticate and check token


//checking explicitly
router.get("/api/check", function(req, res) {
  res.json(req.decoded);
});

//protected routes
router.get("/api/standard", function(req, res) {
  res.send("standard");
});

//registeradmin
router.post(
  "/api/registeradmin",
  ControllerPolicy.registerAdmin,
  AuthController.registerAdmin
);

//registerdriver
router.post(
  "/api/registerdriver",ControllerPolicy.registerDriver,
  AuthController.registerDriver
);

//create-driver
router.post(
  "/api/createambulance",
  FunctionController.createAmbulance
);

module.exports = router;
