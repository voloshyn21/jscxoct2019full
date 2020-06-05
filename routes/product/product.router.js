const productRouter = require('express').Router();

const {productController} = require('../../controllers');
const {productMiddlewares: {isProductValid, isProductExist}} = require('../../middlewares');


productRouter.post('/', isProductValid, productController.createProduct);
productRouter.get('/', productController.getProducts);

productRouter.use('/:productId', isProductExist);

productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);


module.exports = productRouter;
