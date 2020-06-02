const router = require('express').Router();

const productRouter = require('./product/product.router');

const {notFoundController} = require('../controllers');


router.use('/product', productRouter);
router.use('/', notFoundController);

router.use('*', (err, req, res, next) => res.status(err.status).json({
  message: err.message,
  code: err.customCode,
}));

module.exports = router;
