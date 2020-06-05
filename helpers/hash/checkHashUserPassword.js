const bcrypt = require('bcrypt');

const {
  responseStatusCodeEnum: {NOT_FOUND},
  responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require('../../errors');


module.exports = async (password, hashedPassword) => {
  const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordEquals) throw new ErrorHandler(NOT_GET.message, NOT_FOUND, NOT_GET.customCode);
};
