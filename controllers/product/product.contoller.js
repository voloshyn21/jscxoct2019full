const ErrorHandler = require('../../error/ErrorHandler');
const {productService} = require('../../services');
const {hash, checkHash} = require('../../helpers');

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productService.getAll();

      res.json(products);
    } catch (e) {
      next(new ErrorHandler(e));
    }
  },


  createProduct: async (req, res, next) => {
    try {
      const product = req.body;
      product.description = await hash(product.description);

      await productService.create(product)

      res.sendStatus(201);
    } catch (e) {
      next(new ErrorHandler(e));
    }
  },


  getProduct: async (req, res, next) => {
    try {
      res.json(req.product);
    } catch (e) {
      next(new ErrorHandler(e));
    }
  },


  deleteProduct: async (req, res, next) => {
    try {
      const {id} = req.params;

      const isDeleted = await productService.delete(id);

      return isDeleted ? res.sendStatus(204) : next(new ErrorHandler('Not deleted', 444, 4444));
      // res.json({deleted: false});
    } catch (e) {
      next(new ErrorHandler(e));
    }
  },


  updateProduct: async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = req.body;

      product.description = await hash(product.description);

      const [isUpdated] = await productService.update(id, product);

      isUpdated ? res.sendStatus(200) : next(new ErrorHandler('Not updated', 444, 4444));
    } catch (e) {
      next(new ErrorHandler(e));
    }
  },

  loginUp: async (req, res) => {
    const {title, description} = req.body;
    const product = await productService.getByParams({title});

    await checkHash(description, product.description);

    res.json({ok: true})

  }
};
