const {ErrorHandler} = require('../../errors');
const {
  responseCustomErrorEnum: {NOT_VALID},
  responseStatusCodeEnum: {BAD_REQUEST}
} = require('../../constants');


module.exports = (req, res, next) => {
  if (req.photos.length > 1) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

  next();
};

