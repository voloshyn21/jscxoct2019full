const ErrorHandler = require('../../error/ErrorHandler');
const productService = require('../../services/product.service');

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (isNaN(id) || +id < 0) return next(new ErrorHandler({message: 'Product id is not valid'}));

    const product = await productService.getOne(id);

    if (!product) return next(new ErrorHandler({message: 'Product id is exist'}));

    req.product = product;

    next();
  } catch (e) {
    res.json({error: e.message})
  }
};
