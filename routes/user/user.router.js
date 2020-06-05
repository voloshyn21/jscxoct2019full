const userRouter = require('express').Router();

const {userController} = require('../../controllers');
const {userMiddlewares: {isUserValid, isUserExist}} = require('../../middlewares');


userRouter.post('/', isUserValid, userController.createUser);
userRouter.get('/', userController.getUsers);

userRouter.use('/:userId', isUserExist);

userRouter.get('/:userId', userController.getUser);
userRouter.put('/:userId', isUserValid, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser)


module.exports = userRouter;
