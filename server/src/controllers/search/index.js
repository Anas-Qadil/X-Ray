const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const personModel = require("../../models/personModel");
const companyModel = require("../../models/companyModel");
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");
const traitementModel = require("../../models/traitementModel");
const person_traitementModel = require("../../models/person_traitementModel");
const moment = require("moment");

const searchHospital = async (req, res) => {
  try {
    const { search } = req.query; // search text

    let hospitals;
    if (search) {
      hospitals = await hospitalModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { ville: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { region: { $regex: search, $options: "i" } },
        ],
      });
    } else hospitals = await hospitalModel.find();

    res.status(200).json({ 
      message: "success",
      data: hospitals 
    });
  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchPerson = async (req, res) => {
  try {
    const { search } = req.query; // search text

    let persons;
    if (search) {
      persons = await personModel.find({
        $or: [
          { cin: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { secteur: { $regex: search, $options: "i" } },
          { fonction: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { age: { $regex: search, $options: "i" } },
        ],
      });
    } else persons = await personModel.find();

    res.status(200).json({
      message: "success",
      data: persons
    });

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchCompany = async (req, res) => {
  try {
    const { search } = req.query; // search text

    let companies;
    if (search) {
      companies = await companyModel.find({
        $or: [
          { ville: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { region: { $regex: search, $options: "i" } },
          { designation : { $regex: search, $options: "i" } },
        ],
      });
    } else companies = await companyModel.find();

    res.status(200).json({
      message: "success",
      data: companies
    });

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchService = async (req, res) => {
  try {
    const { search } = req.query; // search text

    let services;
    if (search) {
      services = await serviceModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { equipment: { $regex: search, $options: "i" } },
          { examen: { $regex: search, $options: "i" } },
          { protocol : { $regex: search, $options: "i" } },
        ],
      });
    } else services = await serviceModel.find();

    res.status(200).json({
      message: "success",
      data: services
    });

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchPatient = async (req, res) => {
  try {
    const { search } = req.query; // search text

    let patients;
    if (search) {
      patients = await patientModel.find({
        $or: [
          { cin: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    } else patients = await patientModel.find();

    res.status(200).json({
      message: "success",
      data: patients
    });

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const graphData = async (req, res) => {
  try {
    let data = [];
    const user = req.user;
    let traitements = [];
    if (user.role === "patient") {
      traitements = await traitementModel.find({ patient: user.patient?._id }, { dose: 1, createdAt: 1 });
    } else if (user.role === "person") {
      traitements = await person_traitementModel.find({ person: user.person?._id }, { dose: 1, createdAt: 1 });
    } else if (user.role === "admin") {
      traitements = await traitementModel.find({}, { dose: 1, createdAt: 1 });
      traitements = traitements.concat(await person_traitementModel.find({}, { dose: 1, createdAt: 1 }));
    } else if (user.role === "company") {
      let tmp = await person_traitementModel.find({ }, { dose: 1, createdAt: 1 }).populate("person");
      tmp.map((t) => {
        if (t.person.company.toString() === user.company?._id.toString()) {
          traitements.push(t);
        }
      });
    } else if (user.role === "hospital") {
      let tmp = await person_traitementModel.find({ }, { dose: 1, createdAt: 1 }).populate("service");
      tmp = tmp.concat(await traitementModel.find({ }, { dose: 1, createdAt: 1 }).populate("service"));
      tmp.map((t) => {
        if (t.service.hospital.toString() === user.hospital?._id.toString()) {
          traitements.push(t);
        }
      });
    }


    traitements.map(item => {
      let date = moment(item.createdAt).month() + 1;
      item.dateFormated = date;
      data.push({ date: date, dose: item.dose });
    })
    const result = [];
    // group data by date
    const all = data.reduce((res, value) => {
      if (!res[value.date]) {
        res[value.date] = { date: value.date, dose: 0 };
        result.push(res[value.date])
      }
      res[value.date].dose += value.dose;
      return res;
    }, {});


    res.status(200).json({
      message: "success",
      data: all
    });
  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}


module.exports = {
  searchHospital,
  searchPerson,
  searchCompany,
  searchService,
  searchPatient,
  graphData
}