const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");
const traitementModel = require("../../models/traitementModel");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");

const getAllPatients = async (req, res) => {
	try {
		const data = await patientModel.find({});

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

const currentPatient = async (req, res) => {
  try {
    const user = req.user;
    const patient = await patientModel.findOne({ _id: user.patient });
    if (!patient) {
      return res.status(400).json({
        status: "failure",
        message: "No patient found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "patient found",
      data: patient,
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

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid patient id",
      });
    }
		const data = await patientModel.findById(id);

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
    const data = await traitementModel.find({ patient: id })
    .populate("service")

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
    let lastMonthDose = 0;
    let lastWeekDose = 0;
    let lastyearDose = 0;

    const data = await traitementModel.find({ patient: id })
    .populate("patient")
    .populate({
      path: "service",
      populate: {
        path: "hospital"
      }
    });
  
    let doses = 0;
    data.map((doc) => {
      const DocDate = moment(doc.createdAt);  
      const today = moment();
      const TodayMinusOneMonth = moment(today).subtract(1, "month");
      const TodayMinusOneWeek = moment(today).subtract(1, "week");
      const TodayMinusOneYear = moment(today).subtract(1, "year");
      if (DocDate.isBetween(TodayMinusOneMonth, today)) {
        lastMonthDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneWeek, today)) {
        lastWeekDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        lastyearDose += doc.dose;
      }

      const dose = Number(doc.dose);
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
      lastMonthDose,
      lastWeekDose,
      lastyearDose,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

const getPatientHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await traitementModel.find({ patient: id }, {service: 1})
    .populate({path: "service", populate: {path: "hospital"}});
  
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
  getPatientHospital,
  currentPatient
}


