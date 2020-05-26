const productRouter = require('express').Router();

const {isProductExist, isProductValid} = require('../../middlewares');

const {productController} = require('../../controllers');


productRouter.get('/', productController.getProducts);
productRouter.get('/:id', isProductExist, productController.getProduct);
productRouter.post('/', isProductValid, productController.createProduct);
productRouter.put('/:id', isProductExist, isProductValid, productController.updateProduct);
productRouter.delete('/:id', isProductExist, productController.deleteProduct);


module.exports = productRouter;
