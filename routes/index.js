const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserMsgController = require('../controllers/UserMsgController');
const ControllerPolicy = require("../policies/ControllerPolicy");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MedFind BackEnd' });
  console.log(`Lets get started`);
});

router.get('/api', (req, res, next)=>{
  res.send({
    msg: 'hello world'
  });
})

//registeradmin
router.post('/api/registeradmin', ControllerPolicy.registerAdmin,AuthController.registerAdmin);

//registerdriver
router.post('/api/registerdriver', ControllerPolicy.registerDriver,AuthController.registerDriver);

//adminlogin
router.post('/api/adminlogin', AuthController.adminLogin);

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
    
  }
  
});

//user contact message
router.post('/api/usersendcontact', ControllerPolicy.userSendContact,UserMsgController.sendMsg);

router.get('/check', function(req, res) {
  res.json(req.decoded);
});
module.exports = router;
