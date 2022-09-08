const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");

const getAllHospitals = async (req, res) => {
	try {
		const data = await hospitalModel.find({});
		if (!data) {
			return res.status(400).json({
				message: "No hospitals found",
			});
		}
		res.status(200).send({
			message: "Hospitals found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			message: "Server error",
			error: error.message
		});
	}
}

const getHospitalById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await hospitalModel.findById({id});
		if (!data) {
			return res.status(400).json({
				message: "No hospital found",
			});
		}
		res.status(200).send({
			message: "Hospital found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			message: "Server error",
			error: error.message
		});
	}
}

const getHospitalPatients = async (req, res) => {
	try {
		const { id } = req.params;
    const data = await patientModel.find({hospital: id});
    if (!data) {
      return res.status(400).json({
        message: "No patient found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Patients found",
      data: data,
    });
	} catch (error) {
		res.status(500).send({
      status: "failure",
      message: "Somthing went wrong..."
		});
	}
}

const getHospitalServices = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceModel.find({hospital: id});
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "No services found",
      });
    }
    res.status(200).send({
      message: "Services found",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

module.exports = {
	getAllHospitals,
	getHospitalById,
  getHospitalPatients,
  getHospitalServices
}