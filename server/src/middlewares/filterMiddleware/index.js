const express = require("express");
const patientModel = require("../../models/patientModel");

const filterPatientMiddleware = async (req, res, next) => {
	try {
    const user = req.user;
    if (user.role !== "company" && user.role !== "hospital" && user.role !== "admin") {
      return res.status(401).send({
        status: "failure",
        message: "Unauthorized"
      });
    } else {
      next();
    }
	} catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const filterServiceMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "company" && user.role !== "hospital" && user.role !== "admin" && user.role !== "patient") {
      return res.status(401).send({
        status: "failure",
        message: "Unauthorized"
      });
    } else if (user.role === "patient") {
      const filter = req.body;
      if (!filter._id)
        return res.status(400).send({
          status: "failure",
          message: "_id of patient is required"
        });
    }
    next();
  } catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = {
  filterPatientMiddleware,
  filterServiceMiddleware
}