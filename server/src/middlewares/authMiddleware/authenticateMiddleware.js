const express = require("express");

const athenticateMiddleware = (req, res, next) => {
	try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
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