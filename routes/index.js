const router = require('express').Router();

const authRouter = require('./auth/auth.router');
const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');
const {notFoundController} = require('../controllers');


router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

router.use('/', notFoundController);

router.use('*', (err, req, res, next) => res.status(err.status).json({
  message: err.message,
  code: err.customCode
}));


module.exports = router;
