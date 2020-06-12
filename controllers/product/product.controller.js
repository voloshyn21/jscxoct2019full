const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;

const {
  responseStatusCodeEnum: {CREATED, NO_CONTENT, OK, NOT_FOUND: NOT_FOUND_CODE},
  responseCustomErrorEnum: {NOT_CREATED, NOT_GET, NOT_UPDATE, NOT_DELETE},
  emailActionEnum: {PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {emailService, productService, userService} = require('../../services');


module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const product = req.body;
      const [profileImage] = req.photos;

      product.userId = req.userId;

      const isProductCreated = await productService.create(product);

      if (!isProductCreated) return next(new ErrorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.customCode));

      if (profileImage) {
        const photoDir = `products/${isProductCreated.id}/photos/`;
        const fileExtension = path.extname(profileImage.name);
        const photoName = uuid + fileExtension;

        await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
        await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
        await productService.update(isProductCreated.id, {photo: photoDir + photoName})
      }

      const user = await userService.getOne(req.userId);

      await emailService.sendMail(user.email, PRODUCT_CREATE, {user, product});

      res.sendStatus(CREATED);
    } catch (e) {
      next(e);
    }
  },

  getProducts: async (req, res, next) => {
    try {
      const products = await productService.getAll();

      if (!products) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

      res.json(products);
    } catch (e) {
      next(e);
    }
  },

  getProduct: async (req, res) => res.json(req.product),

  updateProduct: async (req, res, next) => {
    try {
      const {productId} = req.params;
      const product = req.body;
      const user = await userService.getOne(req.userId);
      const productOld = await productService.getOne(productId);
      const [isUpdated] = await productService.update(productId, product);

      if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.customCode));

      await emailService.sendMail(user.email, PRODUCT_UPDATE, {user, product, productOld});

      res.sendStatus(OK);
    } catch (e) {
      next(e);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const {productId} = req.params;
      const product = await productService.getOne(productId);
      const user = await userService.getOne(req.userId);
      const isDeleted = await productService.delete(productId);

      if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));

      await emailService.sendMail(user.email, PRODUCT_DELETE, {user, product});

      res.sendStatus(NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
  deleteProductImage: async (req, res, next) => {
    try {
      // ! Sequalize method
      // req.product.photo = null;
      // const [isPhotoDeleted] = await req.product.save();
      // if (!isPhotoDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));
      // res.sendStatus(NO_CONTENT);

      const {productId} = req.params;
      const [isPhotoDeleted] = await productService.update(productId, {photo: null});

      if (!isPhotoDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));

      res.sendStatus(NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }
};
