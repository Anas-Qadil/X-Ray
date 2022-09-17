const express = require("express");
const traitementModel = require("../../models/traitementModel");

const traitementMiddleware = async (req, res, next) => {
	try {
    const data = req.body;
    
    if (data)
    {
      if (!data.service) {
        return res.status(400).send({
          status: "failure",
          message: "Service is required"
        });
      }
      if (!data.patient) {
        return res.status(400).send({
          status: "failure",
          message: "Patient is required"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "No data provided"
      });
    }

    next();
  } catch (e) {
	res.status(500).send({
	  status: "error",
	  message: e.message
	})
  }
}

module.exports = traitementMiddleware;