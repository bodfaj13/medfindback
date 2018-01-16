const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')


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

//registeruser
router.post('/api/registeruser', AuthController.registerUser);

//adminlogin
router.post('/api/login', AuthController.adminLogin);

module.exports = router;
