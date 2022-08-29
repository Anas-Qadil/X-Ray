const patientModel = require("../../models/patientModel");

const getAllPatients = async (req, res) => {
	try {
		const data = await patientModel.find({});
		if (!data) {
			return res.status(400).json({
				message: "No patients found",
			});
		}
		res.status(200).send({
			message: "Patients found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			message: "Server error",
			error: error.message
		});
	}
}

const getPatientById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await patientModel.findById({id});
		if (!data) {
			return res.status(400).json({
				message: "No patient found",
			});
		}
		res.status(200).send({
			message: "Patient found",
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
	getAllPatients,
	getPatientById
}