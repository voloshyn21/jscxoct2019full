const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');


module.exports = (() => {
  let instance;

  function initConnection() {
    const client = new Sequelize(
      process.env.DB_NAME || 'shop',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || 'root', {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
      });

    let models = {};

    function getModels() {
      fs.readdir(path.join(process.cwd(), 'dataBase', 'models'), (err, files) => {
        files.forEach(file => {
          const [modelName] = file.split('.');
          models[modelName] = client.import(path.join(process.cwd(), 'dataBase', 'models', modelName));
        })
      })
    }

    return {
      setModels: () => getModels(),
      getModel: (modelName) => models[modelName]
    }
  }

  return {
    getInstance: () => {
      if (!instance) instance = initConnection();
      return instance;
    }
  }
})();
