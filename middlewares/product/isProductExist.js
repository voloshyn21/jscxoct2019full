const Joi = require('joi');

const {
  responseStatusCodeEnum: {BAD_REQUEST, NOT_FOUND: NOT_FOUND_CODE},
  responseCustomErrorEnum: {NOT_VALID, NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {productService} = require('../../services');
const {utilsValidator: {numberIdSchema}} = require('../../validators');


module.exports = async (req, res, next) => {
  try {
    const {productId} = req.params;
    const {error} = Joi.validate(productId, numberIdSchema);

    if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

    const product = await productService.getOne(productId);

    if (!product) return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode));

    req.product = product;

    await product.destroy();

    next();
  } catch (e) {
    next(e);
  }
};
