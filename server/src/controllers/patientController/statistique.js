const express = require("express");
const patientModel = require("../../models/patientModel");
const traitementModel = require("../../models/traitementModel");
const hospitalModel = require("../../models/hospitalModel");
const moment = require("moment");

const SP_hospital = async (req, res) => {
  try {
    const { id } = req.params; // patient id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];

    const traitement = await traitementModel.find({ patient: id })
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });
    const uniqueHospitals = [...new Set(traitement.map(item => item.service.hospital))];
    
    uniqueHospitals.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.send({
      status: "success",
      message: "hospital statistique",
      data: data
    });
  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: "Internal Server Error"
    });
  }
}

const SP_region = async (req, res) => {
  try {
    const { id } = req.params; // patient id
    const region = req.query.region;
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];

    if (!region) {
      return res.status(400).send({
        status: "failure",
        message: "Region is required"
      });
    }

    const traitement = await traitementModel.find({ patient: id })
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });
    const uniqueHospitals = [...new Set(traitement.map(item => item.service.hospital))];

    let hospitalsInRegion=  []
    uniqueHospitals.map(doc => {
      if (doc.region === region) {
        hospitalsInRegion.push(doc);
      }
    });
    
    hospitalsInRegion.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });
    
    res.send({
      status: "success",
      message: "region statistique",
      data: data
    });

  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

const SP_service = async (req, res) => {
  try {
    const { id } = req.params; // patient id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];

    const traitement = await traitementModel.find({ patient: id })
    .populate("service");

    traitement.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc.service);
      }
    });

    res.send({
      status: "success",
      message: "service statistique",
      data: data
    });

  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: "Internal Server Error"
    });
  }
}

const SP_appareil = async (req, res) => {
  try {
    const { id } = req.params; // patient id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const appareilName = req.query.appareil;
    let data = [];

    if (!appareilName) {
      return res.status(400).send({
        status: "failure",
        message: "Appareil name is required"
      });
    }

    const traitement = await traitementModel.find({ patient: id })
    .populate("service");

    traitement.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate) && doc.service.equipment === appareilName) {
        data.push(doc.service);
      }
    });

    res.send({
      status: "success",
      message: "appareil statistique",
      data: data
    });

  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  SP_hospital,
  SP_region,
  SP_service,
  SP_appareil
}