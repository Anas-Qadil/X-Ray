const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return (hashedPassword);
  } catch (e) {
    return (e.message);
  }
}

module.exports = cryptPassword;