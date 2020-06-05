const Joi = require('joi');

const {
  responseStatusCodeEnum: {OK, NOT_FOUND: NOT_FOUND_CODE, BAD_REQUEST},
  responseCustomErrorEnum: {NOT_VALID, NOT_FOUND},
  requestHeaderEnum: {AUTHORIZATION}
} = require('../../constants');
const {userValidator: {updateUserSchema}} = require('../../validators');
const {ErrorHandler} = require('../../errors');
const {authService, userService} = require('../../services');
const {token: {tokenGenerator}, hash: {checkHashUserPassword}} = require('../../helpers');


module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const {error} = Joi.validate({email, password}, updateUserSchema);

      if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

      const user = await userService.getByParams({email});

      if (!user) return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)));

      await checkHashUserPassword(password, user.password);

      const tokens = tokenGenerator();

      await authService.createTokenPair({...tokens, userId: user.id});

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      await authService.deleteTokenByParams({access_token});

      res.sendStatus(OK);
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);
      const userId = req.userId;
      const user = await userService.getOne(userId);

      if (!user) return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)));

      const tokens = tokenGenerator();

      await authService.deleteTokenByParams({refresh_token})
      await authService.createTokenPair({...tokens, userId});

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  }
};
