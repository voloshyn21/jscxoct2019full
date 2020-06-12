const logger = require('./winston');


module.exports = {
  PORT: process.env.PORT || 3000,

  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET_KEY',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET_KEY',
  JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '5m',
  JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '10m',

  DB_NAME: process.env.DB_NAME || 'shop',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',

  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'mail',
  EMAIL_LOGIN: process.env.EMAIL_LOGIN || 'mail@mail.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'Password1234',

  SITE: process.env.SITE || 'site.com',

  logger
};
