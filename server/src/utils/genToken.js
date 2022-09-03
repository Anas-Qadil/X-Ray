const express = require("express");
const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30 days" });
}

module.exports = generateToken;