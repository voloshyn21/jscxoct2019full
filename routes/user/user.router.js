const userRouter = require('express').Router();

const {userController} = require('../../controllers');
const {
  userMiddlewares: {isUserValid, isUserExist},
  fileMiddlewares: {checkFile, checkPhotoCount}
} = require('../../middlewares');


userRouter.post('/', isUserValid, checkFile, checkPhotoCount, userController.createUser);
userRouter.get('/', userController.getUsers);

userRouter.use('/:userId', isUserExist);

userRouter.get('/:userId', userController.getUser);
userRouter.put('/:userId', isUserValid, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser)


module.exports = userRouter;
