const Joi = require('joi');

const ErrorHandler = require('../../error/ErrorHandler');
const {productValidator: {newProductValidator}} = require('../../validators');

module.exports = async (req, res, next) => {
  try {
    const product = req.body;

    const {error} = Joi.validate(product, newProductValidator);

    if (error) return next(new ErrorHandler(error.details[0].message, 404, 4000));

    next();
  } catch (e) {
    res.json({error: e.message})
  }
};
