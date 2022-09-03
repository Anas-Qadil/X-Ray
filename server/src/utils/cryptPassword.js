const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
	  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = cryptPassword;