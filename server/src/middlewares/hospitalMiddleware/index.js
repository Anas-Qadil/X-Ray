const express = require('express');

const hospitalMiddleware = async (req, res, next) => {
	try {
    const user = req.user;
    if (user.role !== 'admin' && user.role !== 'hospital') {
      return res.status(401).send({
        status: 'failure',
        message: 'Unauthorized'
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
	hospitalMiddleware
}