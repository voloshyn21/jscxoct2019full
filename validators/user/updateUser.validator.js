const Joi = require('joi');

const {regexEnum: {EMAIL}} = require('../../constants');


module.exports = Joi.object().keys({
  email: Joi.string().regex(EMAIL).optional(),
  password: Joi.string().trim().min(8).optional()
});
