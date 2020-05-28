const productRouter = require('express').Router();

const {isProductExist, isProductValid} = require('../../middlewares');

const {productController} = require('../../controllers');


productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, productController.createProduct);

productRouter.use('/:id', isProductExist);

productRouter.get('/:id', productController.getProduct);
productRouter.put('/:id', isProductValid, productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

// productRouter.get('/:id', isProductExist, productController.getProduct);
// productRouter.put('/:id', isProductExist, isProductValid, productController.updateProduct);
// productRouter.delete('/:id', isProductExist, productController.deleteProduct);


module.exports = productRouter;
