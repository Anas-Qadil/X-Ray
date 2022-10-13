const express = require("express");
const patientModel = require("../../models/patientModel");
const traitementModel = require("../../models/traitementModel");
const moment = require("moment");

const getPatients = async (req, res) => {
  try {
    const search = req.query.search;
    const patients = await patientModel.find({ $or: [
      { firstName: { $regex: search, $options: "i" } }, 
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { cin: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { gender: { $regex: search, $options: "i" } },

    ] });
    res.status(200).json({ data: patients });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const getPatient = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "id is required" });
    }
    const patient = await patientModel.findById(req.params.id);
    res.status(200).json({ patient });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const getPatientData = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "id is required" });
    }
    const patient = await patientModel.findById(req.params.id);
    const traitements = await traitementModel.find({ patient: req.params.id })
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      });

    res.status(200).json({ 
      message: "patient data",
      data: {
        patient,
        traitements,
      }
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePatient = async (req, res) => { 
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "id is required" });
    }
    const patient = await patientModel.findById(req.params.id);
    if (!patient) {
      return res.status(400).json({ error: "patient not found" });
    }
    await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "patient deleted" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const getStatisticsPatient = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).json({ error: "invalid date" });
    }

    let data = [];
    const traitements = await traitementModel.find({})
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      })
      .populate("patient");

    traitements.map((traitement) => {
      const date = moment(traitement.createdAt, "YYYY-MM-DD");
      console.log(date);
      if (date.isBetween(startDate, endDate)) {
        data.push(traitement);
      }
    });

    res.status(200).json({ data });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getPatients,
  getPatient,
  getPatientData,
  deletePatient,
  getStatisticsPatient
}