const express = require("express");
const person_traitementModel = require("../../models/person_traitementModel");
const personModel = require("../../models/personModel");
const hospitalModel = require("../../models/hospitalModel");
const companyModel = require("../../models/companyModel");
const moment = require("moment");

const SPerson_hospital = async (req, res) => {
  try {
    const { id } = req.params; // person id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];

    const traitements = await person_traitementModel.find({ person: id })
    .populate({ 
      path: "service",
      populate: {
        path: "hospital"
      }
     });

    const uniqueHospitals = [...new Set(traitements.map(item => item.service.hospital))];

    uniqueHospitals.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.status(200).json({
      status: "success",
      message: "hospital statistique",
      data,
    });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
}

const SPerson_service = async (req, res) => {
  try {
    const { id } = req.params; // person id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];

    const traitements = await person_traitementModel.find({ person: id })
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });

    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.status(200).json({
      status: "success",
      message: "service statistique",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const SPerson_region = async (req, res) => {
  try {
    const { id } = req.params; // person id
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

    const traitements = await person_traitementModel.find({ person: id })
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });

    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate) && doc.service.hospital.region === region) {
        data.push(doc);
      }
    });

    res.status(200).json({
      status: "success",
      message: "region statistique",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const SPerson_appareil = async (req, res) => {
  try {
    const { id } = req.params; // person id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const appareil = req.query.appareil;
    let data = [];

    if (!appareil) {
      return res.status(400).send({
        status: "failure",
        message: "Appareil is required"
      });
    }

    const traitements = await person_traitementModel.find({ person: id })
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });

    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if ( currDate.isBetween(startDate, endDate) && doc.service.equipment === appareil) {
        data.push(doc);
      }
    });

    res.status(200).json({
      status: "success",
      message: "appareil statistique",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}


module.exports = {
  SPerson_hospital,
  SPerson_service,
  SPerson_region,
  SPerson_appareil
};