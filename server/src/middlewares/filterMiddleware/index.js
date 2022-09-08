const express = require("express");
const patientModel = require("../../models/patientModel");

const filterPatientMiddleware = async (req, res, next) => {
	try {
    const user = req.user;
    if (user.role !== "company" && user.role !== "admin") {
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
    if (user.role !== "company" && user.role !== "admin") {
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

module.exports = {
  filterPatientMiddleware,
  filterServiceMiddleware
}