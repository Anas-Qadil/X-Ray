const express = require("express");
const usersModel = require("../../models/usersModel");
const bcrypt = require("bcrypt")

const loginMiddleware = async (req, res, next) => {
	try {
    const { username, password } = req.body;
    const user = await usersModel.findOne({ username });
    console.log(user);
    if (user)
    {
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).send({
          status: "failure",
          message: "password is incorrect"
        });
      switch (user.role) {
        case "patient":
          await user.populate("patient");
          break;
        case "hospital":
          await user.populate("hospital");
          break;
        case "company":
          await user.populate("company");
          break;
        case "person":
          await user.populate("person");
          break;
        default:
          return res.status(400).send({
            status: "failure",
            message: "user role not found"
          });
        }
      req.user = user;
      next();
    } else {
      return res.status(400).send({
        status: "failure",
        message: "user does not exist"
      });
    }
	} catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = loginMiddleware;