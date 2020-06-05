const Joi = require('joi');


module.exports = Joi.object().keys({
  title: Joi.string().alphanum().min(2).max(50).required(),
  price: Joi.number().min(0).max(1000000).required(),
  description: Joi.string().required()
});
