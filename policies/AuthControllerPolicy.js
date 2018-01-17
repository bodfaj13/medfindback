const Joi = require('joi');

module.exports = {
  registerUser (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullname: Joi.string(),
      contact: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Provide a valid email address'
          })
          break
        case 'fullname':
          res.status(400).send({
            error_Fullname: 'Provide a valid fullname'
          })
          break
        case 'contact':
          res.status(400).send({
            error_Contact: 'Provide a valid contact'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  },
  userSendContact (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullname: Joi.string(),
      message: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Provide a valid email address'
          })
          break
        case 'fullname':
          res.status(400).send({
            error_Fullname: 'Provide a valid fullname'
          })
          break
        case 'contact':
          res.status(400).send({
            error_Contact: 'Provide a valid message'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Contact Supplied'
          })
      }
    }else{
      next()
    }
  }
}