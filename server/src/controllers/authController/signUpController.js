const express = require("express");

const signUpController = async (req, res, next) => {
	res.send("hello from signUpController");
}

module.exports = signUpController;