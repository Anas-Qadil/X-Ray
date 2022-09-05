const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital, signUpCompany, signUpPerson } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware, signUpPersonMiddleware, companyMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");
const { getAllHospitals, getHospitalById } = require("../controllers/hospitalController");
const { getAllPatients, getPatientById } = require("../controllers/patientController");
const loginController = require("../controllers/authController/loginController");
const loginMiddleware = require("../middlewares/authMiddleware/loginMiddleware");
const usersModel = require("../models/usersModel");
const { getCurrentCompany } = require("../controllers/companyController");

// person middlewares
const { deletePersonMiddleware } = require("../middlewares/personMiddleware");

// person controllers
const { deletePerson } = require("../controllers/personController");

// @route POST api/login
router.post("/login", loginMiddleware, loginController);

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);
router.post("/sign-up/patient", signUpMiddleware, signUpPatient);
router.post("/sign-up/hospital", signUpMiddleware, signUpHospital);
router.post("/sign-up/company", signUpMiddleware, companyMiddleware, signUpCompany);
router.post("/sign-up/person", signUpMiddleware, signUpPersonMiddleware, signUpPerson);

// @route DELETE api/person/:username
router.delete("/person/:username", deletePersonMiddleware, deletePerson);

// @route GET api/hospitals
router.get("/get-all-hospitals", getAllHospitals);
router.get("/get-hospital/:id", getHospitalById);

// @route GET api/patients
router.get("/get-all-patients", getAllPatients);
router.get("/get-patient/:id", getPatientById);

// @route GET api/companies
router.get("/get-current-company", getCurrentCompany);

// @route GET api/users
router.get("/all-users", async (req, res) => {
	const users = await usersModel.find({});
	res.send({
		users
	});
});

router.get("/", (req, res) => {
	res.send("hello from signUpController");
});

module.exports = router;