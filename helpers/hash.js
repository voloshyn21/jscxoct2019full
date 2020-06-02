const bcrypt = require('bcrypt');

module.exports = (discription) => bcrypt.hash(discription, 10);
