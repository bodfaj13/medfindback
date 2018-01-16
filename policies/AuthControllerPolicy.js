const Joi = require('joi');

module.exports = {
  registerUser (req, res, next){
    const schema = {
      email: Joi.string().email()
    }
    const {error, value} = Joi.validate(req.body.email, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Provide a valid email address'
          })
      }
    }else{
      next()
    }
  }
}