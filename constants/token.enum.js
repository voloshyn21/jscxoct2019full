module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Pikachu',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshPikachu',
  JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '5m',
  JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '10m'
};

