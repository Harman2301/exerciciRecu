const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);


module.exports.createUserSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
});

module.exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
