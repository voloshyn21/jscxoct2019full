const db = require('../dataBase').getInstance();
const {modelNameEnum: {TOKEN}} = require('../constants');


module.exports = {
  getTokenByParams: (params) => {
    const TokenModel = db.getModel(TOKEN);
    return TokenModel.findOne({where: params});
  },

  createTokenPair: (tokens) => {
    const TokenModel = db.getModel(TOKEN);
    return TokenModel.create(tokens);
  },

  deleteTokenByParams: (params) => {
    const TokenModel = db.getModel(TOKEN);
    return TokenModel.destroy({where: params});
  }
};
