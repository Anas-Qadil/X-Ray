const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const personModel = require("../../models/personModel");

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

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchService = async (req, res) => {
  try {

  } catch (e) {
    res.status(500).send({
      message: e.message
    });
  }
}

const searchPatient = async (req, res) => {
  try {

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
  searchPatient
}