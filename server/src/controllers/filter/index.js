const express = require("express");
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");
const personModel = require("../../models/personModel");
const hospitalModel = require("../../models/hospitalModel");
const traitementModel = require("../../models/traitementModel");

const filterPatient = async (req, res, next) => {
	try {
    const filter = req.body;
    const id = req.params.id;
    const patients = await patientModel.find(filter);
    const traitements = await traitementModel.find({}).populate("patient").populate("service");
    let result = [];

    traitements.map((doc) => {
      patients.map((patient) => {
        if (String(doc.patient._id) == String(patient._id) && String(doc.service.hospital) == id) {
          result.push(doc);
        }
      });
    });
    return res.status(200).send({
      status: "success",
      message: "data filtred successfully",
      data: result
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const filterService = async (req, res, next) => {
  try {
    const filter = req.body;
    const data = await serviceModel.find(filter)
    .populate("hospital")
    .populate("patient");

    if (!data) {
      return res.status(404).send({
        status: "failure",
        message: "No data found",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "data filtred successfully",
      data
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const filterPerson = async (req, res, next) => {
  try {
    const filter = req.body;
    const data = await personModel.find(filter);
    if (!data) {
      return res.status(404).send({
        status: "failure",
        message: "No data found",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "data filtred successfully",
      data
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const filterHospital = async (req, res, next) => {
  try {
    const filter = req.body;
    const data = await hospitalModel.find(filter);
    if (!data) {
      return res.status(404).send({
        status: "failure",
        message: "No data found",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "data filtred successfully",
      data
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = { 
	filterPatient,
  filterService,
  filterPerson,
  filterHospital
};