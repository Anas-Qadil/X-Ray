const express = require("express");
const usersModel = require("../../models/usersModel");
const generateToken = require("../../utils/genToken");

const loginController = async (req, res, next) => {
	try {
    delete req.user.password;
    console.log(req.user);
    const token = generateToken({ payload: req.user });
    if (token)
      return res.send({
        status: "success",
        message: "logged in successfully",
        token,
        user: req.user
      });
    return res.status(400).send({
      status: "failure",
      message: "could not log in"
    });
	} catch (e) {
		res.send({
			status: "error",
			message: e.message
		});
	}
	res.send("hello from loginController");
}

module.exports = loginController;