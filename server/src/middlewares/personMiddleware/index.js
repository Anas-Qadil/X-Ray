const personModel = require("../../models/personModel");
const usersModel = require("../../models/usersModel");

const deletePersonMiddleware = async (req, res, next) => {
	try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).send({
        status: "failure",
        message: "username is required"
      });
    } else {
      next()
    }
  } catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    })
  }
}

module.exports = {
	deletePersonMiddleware
}