const express = require("express");
const traitementModel = require("../../models/traitementModel");
const moment = require("moment");

const patient = async (req, res) => {
  try {
    const { id } = req.params;  // hospital id
    const traitements = await traitementModel.find({}).populate("patient").populate("service");
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    let data = [];
    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (String(doc.service.hospital) === id && currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });
    return res.status(200).send({
      status: "success",
      message: "patient",
      data: data
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const appareil = async (req, res) => {
  try {
    const { id } = req.params;  // hospital id
    const traitements = await traitementModel.find({}).populate("patient").populate("service");
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const appareilName = req.query.appareil;
    let data = [];
    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (String(doc.service.hospital) === id && 
          currDate.isBetween(startDate, endDate) &&
          (doc.service.equipment === appareilName)
          ) {
        data.push(doc);
      }
    });

    return res.status(200).send({
      status: "success",
      message: "hospital",
      data
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const service = async (req, res) => {
  try {
    const { id } = req.params;  // hospital id
    const service = req.query.service; // service id
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const traitements = await traitementModel.find({}).populate("patient").populate("service");

    let data = [];
    traitements.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (String(doc.service.hospital) === id &&
          String(doc.service._id) === service &&
          currDate.isBetween(startDate, endDate)
          ) {
        data.push(doc);
      }
    });

    return res.status(200).send({
      status: "success",
      message: "service",
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
  patient,
  appareil,
  service
};