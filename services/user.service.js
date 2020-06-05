const db = require('../dataBase').getInstance();
const {modelNameEnum: {USER}} = require('../constants');


module.exports = {
  create: (user) => {
    const UserModel = db.getModel(USER);
    return UserModel.create(user);
  },

  getAll: () => {
    const UserModel = db.getModel(USER);
    return UserModel.findAll();
  },

  getOne: (userId) => {
    const UserModel = db.getModel(USER);
    return UserModel.findByPk(userId);
  },

  update: (id, user) => {
    // update: (userDB, user) => {
    // ! Sequalize method
    // Object.assign(userDB.dataValues,user);
    // return userDB.save();

    const UserModel = db.getModel(USER);
    return UserModel.update(user, {where: {id}});
  },

  delete: (id) => {
    const UserModel = db.getModel(USER);
    return UserModel.destroy({where: {id}});
  },

  getByParams: (params) => {
    const UserModel = db.getModel(USER);
    return UserModel.findOne({where: params});
  }
};
