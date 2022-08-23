const express = require("express");

const loginController = async (req, res, next) => {
	res.send("hello from loginController");
}

module.exports = loginController;