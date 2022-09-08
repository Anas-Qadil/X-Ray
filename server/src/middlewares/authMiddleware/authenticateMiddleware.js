const express = require("express");
const jwt = require("jsonwebtoken");
const usersModel = require("../../models/usersModel");

const athenticateMiddleware = async (req, res, next) => {
	try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
    {
      return res.status(400).send({
        status: "failure",
        message: "No token provided"
      })
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded)
    {
      return res.status(400).send({
        status: "failure",
        message: "Invalid token"
      })
    }
    const user = await usersModel.findById(decoded.payload._id);
    if (!user)
    {
      return res.status(400).send({
        status: "failure",
        message: "User not found"
      })
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({
      status: "failure",
      message: "failed to authenticate user"
    });
  }
}

module.exports = athenticateMiddleware;