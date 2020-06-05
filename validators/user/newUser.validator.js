const Joi = require('joi');

const {regexEnum: {EMAIL}} = require('../../constants');


module.exports = Joi.object().keys({
  name: Joi.string().trim().alphanum().min(2).max(50).required(),
  surname: Joi.string().trim().alphanum().min(2).max(50).required(),
  email: Joi.string().regex(EMAIL).required(),
  password: Joi.string().trim().min(8).required()
});
