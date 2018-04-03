const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserMsgController = require("../controllers/UserMsgController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails.json");
const FunctionController = require("../controllers/functionController");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "MedFind BackEnd" });
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

//user contact message
router.post(
  "/api/usersendcontact",
  ControllerPolicy.userSendContact,
  UserMsgController.sendMsg
);


//route middleware to authenticate and check token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-auth"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      var decoded = jwt.verify(token, appdetails.jwtSecret);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

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
  "/api/registerdriver",
  ControllerPolicy.registerDriver,
  AuthController.registerDriver
);

module.exports = router;
