const {modelNameEnum: {PRODUCT}} = require('../constants');

const db = require('../dataBase').getInstance();

module.exports = {
  create: (product) => {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.create(product)
  },

  getAll: () => {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.findAll();
  },

  getOne: (id) => {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.findByPk(id);
  },

  delete: (id) => {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.destroy({where: {id}})
  },

  update(id, product) {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.update(product, {where: {id}})
  },

  getByParams(params) {
    const ProductModel = db.getModels(PRODUCT);
    return ProductModel.findOne({where: params})
  }
}
