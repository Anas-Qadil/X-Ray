const express = require("express");
const usersModel = require("../../models/usersModel");
const patientModel = require("../../models/patientModel");
const personModel = require("../../models/personModel");
const hospitalModel = require("../../models/hospitalModel");
const companyModel = require("../../models/companyModel");
const cryptPassword = require("../../utils/cryptPassword");

const updateHospital = async (req, res) => {
  try {
    if (!req.body._id)
      return res.status(400).send({ message: "Missing id" });
    
    await hospitalModel.updateOne({ _id: req.body._id }, req.body);
    const hospitalUser = await usersModel.findOne({ hospital: req.body._id });
    if (req.body.username) {
      if (hospitalUser.username !== req.body.username) {
        hospitalUser.username = req.body.username;
      }
    }
    if (req.body.password) {
      const newPassword = await cryptPassword(req.body.password);
      hospitalUser.password = newPassword;
    }
    await hospitalUser.save();
    res.status(200).send({ message: "Hospital updated successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}
const updateCompany = async (req, res) => {
  try {
    if (!req.body._id) 
      return res.status(400).send({ message: "Missing id" });

    await companyModel.updateOne({ _id: req.body._id }, req.body);
    const companyUser = await usersModel.findOne({ company: req.body._id });
    if (req.body.username) {
      if (companyUser.username !== req.body.username) {
        companyUser.username = req.body.username;
      }
    }
    if (req.body.password) {
      const newPassword = await cryptPassword(req.body.password);
      companyUser.password = newPassword;
    }
    await companyUser.save();
    
    res.status(200).send({ message: "Company updated successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}
const updatePatient = async (req, res) => {
  try {
    if (!req.body._id)
      return res.status(400).send({ message: "Missing id" });
    
    await patientModel.updateOne({ _id: req.body._id }, req.body);
    const patientUser = await usersModel.findOne({ patient: req.body._id });
    if (req.body.username) {
      if (patientUser.username !== req.body.username) {
        patientUser.username = req.body.username;
      }
    }
    if (req.body.password) {
      const newPassword = await cryptPassword(req.body.password);
      patientUser.password = newPassword;
    }
    await patientUser.save();

    res.status(200).send({ message: "Patient updated successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}
const updatePerson = async (req, res) => {
  try {
    if (!req.body._id)
      return res.status(400).send({ message: "Missing id" });
    
    await personModel.updateOne({ _id: req.body._id }, req.body);
    const personUser = await usersModel.findOne({ person: req.body._id });
    if (req.body.username) {
      if (personUser.username !== req.body.username) {
        personUser.username = req.body.username;
      }
    }
    if (req.body.password) {
      const newPassword = await cryptPassword(req.body.password);
      personUser.password = newPassword;
    }
    await personUser.save();

    res.status(200).send({ message: "Person updated successfully" });

  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}



module.exports = {
  updateHospital,
  updateCompany,
  updatePatient,
  updatePerson
};