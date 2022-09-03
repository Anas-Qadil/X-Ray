const express = require("express");
const usersModel = require("../../models/usersModel");
const bcrypt = require("bcrypt")

const loginMiddleware = async (req, res, next) => {
	try {
    const { username, password } = req.body;
    const user = await usersModel.findOne({ username });
    if (user)
    {
      if (user.username !== username)
        return res.status(400).send({
          status: "failure",
          message: "user does not exist"
        });
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).send({
          status: "failure",
          message: "password is incorrect"
        });
      req.user = user;
      next();
    }
	} catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = loginMiddleware;