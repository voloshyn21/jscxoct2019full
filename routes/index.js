const router = require('express').Router();

const productRouter = require('./product/product.router');

const {notFoundController} = require('../controllers');


router.use('/product', productRouter);
router.use('/', notFoundController);


module.exports = router;
