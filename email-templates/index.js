const {
  emailActionEnum: {
    USER_REGISTER, USER_DELETE, USER_UPDATE,
    PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE
  }
} = require('../constants');

module.exports = {
  [USER_REGISTER]: {
    subject: '[VOLOSHKA] WELCOME!',
    templateFileName: 'createUser'
  },
  [USER_DELETE]: {
    subject: '[VOLOSHKA] ACCOUNT WAS DELETED!',
    templateFileName: 'deleteUser'
  },
  [USER_UPDATE]: {
    subject: '[VOLOSHKA] ACCOUNT WAS UPDATED!',
    templateFileName: 'updateUser'
  },
  [PRODUCT_CREATE]: {
    subject: '[VOLOSHKA] CREATE PRODUCT!',
    templateFileName: 'createProduct'
  },
  [PRODUCT_DELETE]: {
    subject: '[VOLOSHKA] DELETE PRODUCT!',
    templateFileName: 'deleteProduct'
  },
  [PRODUCT_UPDATE]: {
    subject: '[VOLOSHKA] UPDATE PRODUCT!',
    templateFileName: 'updateProduct'
  }
};
