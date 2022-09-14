const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");

const getAllPatients = async (req, res) => {
	try {
		const data = await patientModel.find({})
    .populate("hospital");

		if (!data) {
			return res.status(400).json({
        status: "failure",
				message: "No patients found",
			});
		}
		res.status(200).send({
			message: "Patients found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			status: "failure",
			message: error.message
		});
	}
}

const getPatientById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await patientModel.findById({id})
    .populate("hospital");

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
			status: "failure",
			message: error.message
		});
	}
}

const getPatientServices = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceModel.find({patient: id})
    .populate("patient")
    .populate("hospital");
  
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "No services found",
      });
    }
    res.status(200).send({
      status: "success",
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

const getPatientDoses = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceModel.find({ patient: id })
    .populate("patient")
    .populate("hospital");
  
    let doses = 0;
    data.map((service) => {
      const dose = parseInt(service.dose);
      doses += dose;
    });
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "No services found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Services found",
      data: data,
      doses: doses,
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

const getPatientHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await patientModel.findById({ hospital: id })
    .populate("hospital");
  
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "No hospital found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "hospital found",
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
	getAllPatients,
	getPatientById,
  getPatientServices,
  getPatientDoses,
  getPatientHospital
}