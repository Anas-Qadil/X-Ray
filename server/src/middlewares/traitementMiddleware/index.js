const express = require("express");
const traitementModel = require("../../models/traitementModel");
const ObjectId = require('mongoose').Types.ObjectId;
const validator = require('validator');
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");

const traitementMiddleware = async (req, res, next) => {
	try {
    const data = req.body;
    
    if (data)
    {
      if (data.service) {
        if (!ObjectId.isValid(data.service)) {
          return res.status(400).send({
            status: 'failure',
            message: 'invalid service id'
          });
        }
        const service = await serviceModel.findOne({ _id: data.service });
        if (!service) {
          return res.status(400).send({
            status: 'failure',
            message: 'Service not found'
          });
        }
      } else {
        return res.status(400).send({
          status: "failure",
          message: "Service is required"
        });
      }
      if (data.patient) {
        if (!ObjectId.isValid(data.patient)) {
          return res.status(400).send({
            status: "failure",
            message: "Invalid patient id"
          });
        }
        const patient = await patientModel.findOne({ _id: data.patient });
        if (!patient) {
          return res.status(400).send({
            status: "failure",
            message: "Patient not found"
          });
        }
      } else {
        return res.status(400).send({
          status: "failure",
          message: "Patient is required"
        });
      }
      if (!data.dose) {
        return res.status(400).send({
          status: "failure",
          message: "Dose is required"
        });
      }
      if (!data.date) {
        return res.status(400).send({
          status: "failure",
          message: "Date is required"
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