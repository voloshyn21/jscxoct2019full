const db = require('../dataBase').getInstance();

module.exports = {
  create: (product) => {
    const ProductModel = db.getModels('Product');
    return ProductModel.create(product)
  },

  getAll: async () => {
    const ProductModel = db.getModels('Product');
    return ProductModel.findAll();
  },

  getOne: (id) => {
    const ProductModel = db.getModels('Product');
    return ProductModel.findByPk(id);
  },

  delete: (id) => {
    const ProductModel = db.getModels('Product');
    return ProductModel.destroy({where: {id}})
  },

  update(id, product) {
    const ProductModel = db.getModels('Product');
    return ProductModel.update(product, {where: {id}})
  }
}
