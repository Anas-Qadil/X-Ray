const express = require("express");

const athenticateMiddleware = (req, res, next) => {
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
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      status: "failure",
      message: "failed to authenticate user"
    });
  }
}

module.exports = athenticateMiddleware;