const bcrypt = require('bcrypt');

module.exports = password => bcrypt.hash(password, 10);
