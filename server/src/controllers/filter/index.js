const express = require("express");
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");
const personModel = require("../../models/personModel");
const hospitalModel = require("../../models/hospitalModel");

const filterPatient = async (req, res, next) => {
	try {
    const filter = req.body;
    const data = await patientModel.find(filter);
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