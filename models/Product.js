const uuid = require('uuid').v4;

const {getProductsFile, writeToProductFile} = require('../utils/product');

module.exports = class Product {
  constructor(title, price, id) {
    this.id = id || uuid();
    this.title = title;
    this.price = price;
  }


  async create() {
    const products = await getProductsFile();

    products.push(this);

    await writeToProductFile(products);
  }


  async update() {
    const products = await getProductsFile();

    const existingProductIndex = products.findIndex(product => product.id === this.id);

    products[existingProductIndex] = this;

    await writeToProductFile(products);
  }


  static async fetchAll() {
    return await getProductsFile();
  }


  static async findById(id) {
    const products = await getProductsFile();

    return products.find(product => product.id === id);
  }


  static async deleteById(id) {
    let products = await getProductsFile();

    products = products.filter(product => product.id !== id);

    await writeToProductFile(products);
  }
};
