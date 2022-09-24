const express = require("express");
const personModel = require("../../models/personModel");
const person_traitementModel = require("../../models/person_traitementModel");
const moment = require("moment");

const statistiqueServiceAppareilCompany = async (req, res) => {
	try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const appareilName = req.query.appareil;

    if (!appareilName) {
      return res.status(400).send({
        status: "failure",
        message: "appareil name is required"
      });
    }
    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).send({
        status: "failure",
        message: "start date and end date are required"
      });
    }

    const person_traitement = await person_traitementModel.find({}).populate("person").populate("service");

    let data = [];
    person_traitement.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (String(doc.person.company) === String(req.user.company))
      {
        if (doc.service.equipment === appareilName && currDate.isBetween(startDate, endDate)) {
          data.push(doc);
        }
      }
    });

    return res.status(200).send({
      status: "success",
      message: "person_traitement",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const statistiqueServicesCompany = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).send({
        status: "failure",
        message: "start date and end date are required"
      });
    }

    const person_traitement = await person_traitementModel.find({}).populate("person").populate("service");

    let data = [];
    person_traitement.map(doc => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (String(doc.person.company) === String(req.user.company))
      {
        if (currDate.isBetween(startDate, endDate)) {
          data.push(doc);
        }
      }
    }
    );

    return res.status(200).send({
      status: "success",
      message: "person_traitement",
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
	statistiqueServiceAppareilCompany,
  statistiqueServicesCompany
};