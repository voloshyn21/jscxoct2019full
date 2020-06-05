const {
  responseStatusCodeEnum: {CREATED, NO_CONTENT, OK, NOT_FOUND: NOT_FOUND_CODE},
  responseCustomErrorEnum: {NOT_CREATED, NOT_GET, NOT_UPDATE, NOT_DELETE}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {userService} = require('../../services');
const {hash: {hashUserPassword}} = require('../../helpers');


module.exports = {
  createUser: async (req, res, next) => {
    try {
      const user = req.body;

      user.password = await hashUserPassword(user.password);

      const isCreated = await userService.create(user);

      if (!isCreated) return next(new ErrorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.customCode));

      res.sendStatus(CREATED);
    } catch (e) {
      next(e);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAll();

      if (!users) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUser: (req, res) => res.json(req.user),

  updateUser: async (req, res, next) => {
    // ! Sequalize method
    // const user = req.body;
    // user.password = await hashUserPassword(user.password);
    // const isUpdated = await userService.update(req.user, user);
    // if (!isUpdated) return next(new ErrorHandler('Cannot update user', 400, 4001));
    // res.sendStatus(200);

    try {
      const {userId} = req.params;
      const user = req.body;

      user.password = await hashUserPassword(user.password);

      const [isUpdated] = await userService.update(userId, user);

      if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.customCode));

      res.sendStatus(OK);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    // ! Sequalize method
    // const isDeleted = await req.user.destroy();
    // if (!isDeleted) return next(new ErrorHandler('Cannot delete user', 400, 4001));
    // res.sendStatus(204);

    try {
      const {userId} = req.params;
      const isDeleted = await userService.delete(userId)

      if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));

      res.sendStatus(NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }
};
