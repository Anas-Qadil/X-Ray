const express = require("express");
const patientModel = require("../../models/patientModel");
const traitementModel = require("../../models/traitementModel");
const hospitalModel = require("../../models/hospitalModel");
const ObjectId = require('mongoose').Types.ObjectId;

const SPM_patient = async (req, res, next) => {
	try {
    const { id } = req.params; // patient id
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (!startDate || !endDate) {
      return res.status(400).send({
        status: "failure",
        message: "startDate and endDate are required"
      });
    }
    
    if (id) {
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid Patient ID"
        });
      }
      const patient = await patientModel.findById(id);
      if (!patient) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid Patient ID"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Bad Request"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

module.exports = {
  SPM_patient
};