const express = require("express");
const hospitalModel = require("../../models/hospitalModel");

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

module.exports = {
	getAllHospitals,
	getHospitalById
}