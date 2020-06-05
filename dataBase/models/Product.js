const {modelNameEnum: {PRODUCT}} = require('../../constants');


module.exports = (sequelize, DataTypes) => sequelize.define(PRODUCT, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});
