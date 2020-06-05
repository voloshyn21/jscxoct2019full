const Joi = require('joi');

const {
  responseStatusCodeEnum: {BAD_REQUEST},
  responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {userValidator: {newUserSchema}} = require('../../validators');


module.exports = (req, res, next) => {
  try {
    const user = req.body;
    const {error} = Joi.validate(user, newUserSchema);

    if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

    next();
  } catch (e) {
    next(e);
  }
};
