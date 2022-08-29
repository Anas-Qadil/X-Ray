const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");
const { getAllHospitals, getHospitalById } = require("../controllers/hospitalController");
const { getAllPatients, getPatientById } = require("../controllers/patientController");

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);
router.post("/sign-up/patient", signUpMiddleware, patientMiddleware, signUpPatient);
router.post("/sign-up/hospital", signUpMiddleware, signUpHospital);
router.get("/get-all-hospitals", getAllHospitals);
router.get("/get-hospital/:id", getHospitalById);
router.get("/get-all-patients", getAllPatients);
router.get("/get-patient/:id", getPatientById);
router.get("/", (req, res) => {
	  res.send("hello from signUpController");
} );

module.exports = router;