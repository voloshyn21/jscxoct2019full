const jwt = require('jsonwebtoken');

const {
  tokenEnum: {JWT_SECRET},
  requestHeaderEnum: {AUTHORIZATION},
  responseStatusCodeEnum: {UNAUTHORIZED, BAD_REQUEST},
  responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {authService} = require('../../services');


module.exports = async (req, res, next) => {
  try {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

    jwt.verify(authorizationToken, JWT_SECRET, err => {
      if (err) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN));
    });

    const tokenFromDB = await authService.getTokenByParams({access_token: authorizationToken});

    if (!tokenFromDB) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.code));

    req.userId = tokenFromDB.userId;

    next();
  } catch (e) {
    next(e);
  }
};
