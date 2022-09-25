const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const usersModel = require("../../models/usersModel");
const serviceModel = require("../../models/serviceModel");
const moment = require("moment");
const traitementModel = require("../../models/traitementModel");

const getHospitals = async (req, res) => {
	try {
    const search = req.query.search;
    let hospitals;

    if (search) {
      hospitals = await hospitalModel.find({
        $or: [
          { region: { $regex: search, $options: "i" } },
          { ville: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    } else hospitals = await hospitalModel.find();

    res.send({
      message: "sucess",
      data: hospitals,
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getHospital = async (req, res) => {
  try {
    const { id } = req.params; // hospital id
    
    if (!id) {
      return res.status(400).send({
        message: "id is required"
      });
    }
    const hospital = await hospitalModel.findById(id);
    res.send({
      message: "sucess",
      data: hospital
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params; // hospital id

    if (!id) {
      return res.status(400).send({
        message: "id is required"
      });
    } 
    const hospital = await hospitalModel.findById(id);
    if (!hospital) {
      return res.status(400).send({
        message: "hospital not found"
      });
    }
    const user = await usersModel.findOneAndDelete({ hospital: id });
    
    const deletedHospital = await hospitalModel.findByIdAndDelete(id);

    res.send({
      message: "sucess",
      data: deletedHospital
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getHospitalStatistics = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const hospitals = await hospitalModel.find();
    
    let data = [];
    hospitals.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getStatisticsHospitalRegion = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const region = req.query.region;

    if (!region) {
      return res.status(400).send({
        message: "region is required"
      });
    } 

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const hospitals = await hospitalModel.find({region});

    let data = [];
    hospitals.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

module.exports = {
  getHospitals,
  getHospital,
  deleteHospital,
  getHospitalStatistics,
  getStatisticsHospitalRegion
};