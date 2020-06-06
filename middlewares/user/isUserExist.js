const Joi = require('joi');

const {
  responseStatusCodeEnum: {BAD_REQUEST, NOT_FOUND: NOT_FOUND_CODE},
  responseCustomErrorEnum: {NOT_VALID, NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {userService} = require('../../services');
const {utilsValidator: {numberIdSchema}} = require('../../validators');


module.exports = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const {error} = Joi.validate(userId, numberIdSchema);

    if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

    const user = await userService.getOne(userId);

    if (!user) return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode));

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
