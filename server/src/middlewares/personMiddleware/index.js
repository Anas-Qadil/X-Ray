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

const checkPersonAccess = async (req, res, next) => {
  try {
    const user = req.user;
    const personId = req.params.id;
    if (user.role !== "person") {
      return res.status(401).send({
        status: "failure",
        message: "unauthorized"
      });
    }
    if (String(user.person) !== personId) {
      return res.status(401).send({
        status: "failure",
        message: "unauthorized"
      });
    }
    next();
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = {
	deletePersonMiddleware,
  checkPersonAccess
}