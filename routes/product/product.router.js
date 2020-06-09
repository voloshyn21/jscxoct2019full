const productRouter = require('express').Router();

const {productController} = require('../../controllers');
const {
  productMiddlewares: {isProductValid, isProductExist},
  authMiddlewares: {checkAccessToken}
} = require('../../middlewares');


productRouter.post('/', isProductValid, checkAccessToken, productController.createProduct);
productRouter.get('/', productController.getProducts);

productRouter.use('/:productId', checkAccessToken, isProductExist);

productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);


module.exports = productRouter;
