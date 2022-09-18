const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const traitementModel = require("../../models/traitementModel");
const ObjectId = require('mongoose').Types.ObjectId;
const serviceModel = require("../../models/serviceModel");

const statistiquePatientsMiddleware = async (req, res, next) => {
	try {
    const user = req.user;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const id = req.params.id; // hospital id
    if (user.role !== "admin" && user.role !== "hospital") {
      return res.status(401).send({
      status: "failure",
      message: "Unauthorized"
      });
    }
    if (!startDate || !endDate) {
      return res.status(400).send({
        status: "failure",
        message: "Start date and end date are required"
      });
    }
    if (id) { // hospital id
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid hospital id"
        });
      }
      const hospital = await hospitalModel.findById(id);
      if (!hospital) {
        return res.status(404).send({
          status: "failure",
          message: "Hospital not found"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Hospital id is required"
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

const statistiquePatientMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const patient = req.query.patient; // patient id
    const id = req.params.id; // hospital id
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    if (user.role !== "admin" && user.role !== "hospital") {
      return res.status(401).send({
        status: "failure",
        message: "Unauthorized"
      });
    }
    if (!startDate || !endDate) {
      return res.status(400).send({
        status: "failure",
        message: "Start date and end date are required"
      });
    }
    if (id) { // hospital id
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid hospital id"
        });
      }
      const hospital = await hospitalModel.findById(id);
      if (!hospital) {
        return res.status(404).send({
          status: "failure",
          message: "Hospital not found"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Hospital id is required"
      });
    }
    if (patient) { // patient id
      if (!ObjectId.isValid(patient)) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid patient id"
        });
      }
      const services = await traitementModel.find({ patient: patient }).populate("service");
      let checker = 0;
      if (services) {
        services.map(doc => {
          if (doc.service.hospital.toString() === id) {
            checker = 1;
          }
        });
      }
      if (!checker) {
        return res.status(404).send({
          status: "failure",
          message: "unauthorized"
        });
      }
      if (!patient) {
        return res.status(404).send({
          status: "failure",
          message: "Patient not found"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Patient id is required"
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

const statistiqueApparielMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id; // hospital id
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const appareil = req.query.appareil; // appareil name

    if (user.role !== "admin" && user.role !== "hospital") {
      return res.status(401).send({
        status: "failure",
        message: "Unauthorized"
      });
    }
    if (!startDate || !endDate) {
      return res.status(400).send({
        status: "failure",
        message: "Start date and end date are required"
      });
    }

    if (id) { // hospital id
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid hospital id"
        });
      }
      const hospital = await hospitalModel.findById(id);
      if (!hospital) {
        return res.status(404).send({
          status: "failure",
          message: "Hospital not found"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Hospital id is required"
      }); 
    }
    if (appareil) { // appareil name
      const services = await serviceModel.find({ hospital: id , equipment: appareil });
      if (!services) {
        return res.status(404).send({
          status: "failure",
          message: "Appareil not found"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "Appareil name is required"
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
  statistiquePatientMiddleware,
  statistiquePatientsMiddleware,
  statistiqueApparielMiddleware
};