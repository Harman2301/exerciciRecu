const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createEventSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  location: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    postalCode: Joi.string().required(),
  }).required(),
  participants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  ),
});
