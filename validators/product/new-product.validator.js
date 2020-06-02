const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().trim().alphanum().min(2).max(50).required(),
  description: Joi.string().trim().alphanum().min(2).required(),
  price: Joi.number().integer().min(0).max(1000000).required()
});
