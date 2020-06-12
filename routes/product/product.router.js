const productRouter = require('express').Router();

const {productController} = require('../../controllers');
const {
  productMiddlewares: {isProductValid, isProductExist},
  authMiddlewares: {checkAccessToken},
  fileMiddlewares: {checkFile, checkPhotoCount}
} = require('../../middlewares');


productRouter.post('/', checkAccessToken, isProductValid, checkFile, checkPhotoCount, productController.createProduct);
productRouter.get('/', productController.getProducts);

productRouter.use('/:productId', checkAccessToken, isProductExist);

productRouter.get('/:productId', productController.getProduct);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.delete('/:productId/image', productController.deleteProductImage);


module.exports = productRouter;
