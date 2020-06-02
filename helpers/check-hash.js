const bcrypt = require('bcrypt');

module.exports = async (discription, hashedDiscription) => {
  const isEquals = await bcrypt.compare(discription, hashedDiscription);
  if (!isEquals) throw new Error('Product is valid')
}
