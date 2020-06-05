const {modelNameEnum: {TOKEN}} = require('../../constants');


module.exports = (sequelize, DataTypes) => sequelize.define(TOKEN, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now')
  }
}, {
  tableName: 'tokens',
  timestamps: false
});
