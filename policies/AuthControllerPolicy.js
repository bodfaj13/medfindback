const Joi = require('joi');

module.exports = {
  registerUser (req, res, next){
    const schema = {
      fullname: Joi.string(),
      email: Joi.string().email(),
      contact: Joi.number()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'fullname': 
          res.status(400).send({
            error: 'Provide a valid fullname'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'Provide a valid email address'
          })
          break
        case 'contact':
          res.status(400).send({
            error: 'Provide a valid contact'
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
  }
}