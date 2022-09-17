const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital, signUpCompany, signUpPerson } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware, signUpPersonMiddleware, companyMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");
const { getAllHospitals, getHospitalById, getHospitalPatients, getHospitalServices, hospitalDoes } = require("../controllers/hospitalController");
const { getAllPatients, getPatientById, getPatientServices, getPatientDoses, getPatientHospital } = require("../controllers/patientController");
const loginController = require("../controllers/authController/loginController");
const loginMiddleware = require("../middlewares/authMiddleware/loginMiddleware");
const usersModel = require("../models/usersModel");
const { getCurrentCompany, getServices, getAllPatientDoses, getPersons, getPerson } = require("../controllers/companyController");
const { filterPatient, filterService, filterPerson, filterHospital } = require("../controllers/filter/index");

const { addTraitement, getHospitalTraitements, getTraitementById } = require("../controllers/traitementController");

// traitement middleware
const traitementMiddleware = require("../middlewares/traitementMiddleware");

// person middlewares
const { deletePersonMiddleware } = require("../middlewares/personMiddleware");

// hospital Middlewares
const { hospitalMiddleware, signUpHospitalMiddleware } = require("../middlewares/hospitalMiddleware");

// person controllers
const { deletePerson } = require("../controllers/personController");

// company middlewares
const { gettingServicesMiddleware, checkCompanyMiddleware } = require("../middlewares/companyMiddleware");

// Auth Middleware
const authenticateMiddleware = require("../middlewares/authMiddleware/authenticateMiddleware");

// filter middlewares
const { filterPatientMiddleware, filterServiceMiddleware } = require("../middlewares/filterMiddleware");

// STATISTIQUE HOSPITAL
const { patient, appareil, service } = require("../controllers/hospitalController/statistique");



// @route POST api/login
router.post("/login", loginMiddleware, loginController); // turn this on
// router.post("/login", loginController); // just for test

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);
router.post("/sign-up/patient", signUpMiddleware, patientMiddleware, signUpPatient);
router.post("/sign-up/hospital", signUpMiddleware, signUpHospitalMiddleware, signUpHospital);
router.post("/sign-up/company", signUpMiddleware, companyMiddleware, signUpCompany);
router.post("/sign-up/person", signUpMiddleware, signUpPersonMiddleware, signUpPerson);

// @route api/hospitals
router.get("/get-all-hospitals", authenticateMiddleware, hospitalMiddleware, getAllHospitals);
router.get("/hospital/:id", authenticateMiddleware, hospitalMiddleware, getHospitalById);
router.get("/hospital/:id/patients", authenticateMiddleware, hospitalMiddleware, getHospitalPatients);
router.get("/hospital/:id/services", authenticateMiddleware, hospitalMiddleware, getHospitalServices);
router.get("/hospital/:id/traitements", authenticateMiddleware, hospitalMiddleware, getHospitalTraitements);
// hospital Statistique
router.get("/statistique/hospital/:id/patient", patient);
router.get("/statistique/hospital/:id/appareil", appareil);
router.get("/statistique/hospital/:id/service", service);



// @route api/traitement
router.get("/traitement/:id", authenticateMiddleware, getTraitementById);
// router.put("/traitement/:id", authenticateMiddleware, updateTraitement);

// @route GET api/patients
router.get("/get-all-patients", getAllPatients);
router.get("/get-patient/:id", getPatientById);
router.get("/patient/:id/services", getPatientServices);
router.get("/patient/:id/doses", getPatientDoses);
router.get("/patient/:id/hospital", getPatientHospital);

// Patient Traitement Routes
router.post("/patient/add-traitement", traitementMiddleware, addTraitement);

/* COMPANY ROUTES */
router.get("/get-current-company", authenticateMiddleware, checkCompanyMiddleware, getCurrentCompany);
router.get("/company/get-services", authenticateMiddleware, checkCompanyMiddleware, getServices);
router.get("/company/get-doses", authenticateMiddleware, checkCompanyMiddleware, getAllPatientDoses);
router.get("/company/:id/persons", authenticateMiddleware, checkCompanyMiddleware, getPersons);
router.get("/company/:id/person/:id", authenticateMiddleware, checkCompanyMiddleware, getPerson);

/* PERSON ROUTES */
router.delete("/person/:username", deletePersonMiddleware, deletePerson);

/* FILTER ROUTES */
router.post("/filter/patient", authenticateMiddleware, filterPatientMiddleware, filterPatient);
router.post("/filter/service", authenticateMiddleware, filterServiceMiddleware, filterService);
router.post("/filter/person", authenticateMiddleware, filterPerson);
router.post("/filter/hospital", authenticateMiddleware, filterHospital);

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