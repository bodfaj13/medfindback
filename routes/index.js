const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const Admin = require('../models/adminModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MedFind BackEnd' });
  console.log(`Lets get started`);
  var admin = new Admin({
    fullname: 'Bello Ajibola Fuad',
    email: 'bellohargbola13@gmail.com',
    password: '$2a$10$HQ5w7mIQBzjFybaZ0D0/GeGFQi6gdoEa2FW.g384nLQ6QNBDq4F.G'
    privilege: 'global'
  });
  admin.save().then(function (data){
    console.log(data);
  });
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
