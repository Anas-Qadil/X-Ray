const express = require("express");
const companyModel = require("../../models/companyModel");
const usersModel = require("../../models/usersModel");


const gettingServicesMiddleware = async (req, res, next) => {
	try {
    if (req.user.role !== "company") {
      return res.status(400).send({
        status: "failure",
        message: "You are not a company"
      });
    }
    else
      next();
	} catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const checkCompanyMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(400).send({
        status: "failure",
        message: "You are not a company"
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
  gettingServicesMiddleware,
  checkCompanyMiddleware
};