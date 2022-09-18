const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital, signUpCompany, signUpPerson } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware, signUpPersonMiddleware, companyMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");
const { getAllHospitals, getHospitalById, getHospitalPatients, getHospitalServices, hospitalDoes, addService } = require("../controllers/hospitalController");
const { getAllPatients, getPatientById, getPatientServices, getPatientDoses, getPatientHospital } = require("../controllers/patientController");
const loginController = require("../controllers/authController/loginController");
const loginMiddleware = require("../middlewares/authMiddleware/loginMiddleware");
const usersModel = require("../models/usersModel");
const { getCurrentCompany, getServices, getAllPatientDoses, getPersons, getPerson } = require("../controllers/companyController");
const { filterPatient, filterTraitement, filterService, filterPerson, filterHospital } = require("../controllers/filter/index");

const { addTraitement, getHospitalTraitements, getTraitementById } = require("../controllers/traitementController");

// traitement middleware
const traitementMiddleware = require("../middlewares/traitementMiddleware");

// person middlewares
const { deletePersonMiddleware } = require("../middlewares/personMiddleware");

// hospital Middlewares
const { hospitalMiddleware, signUpHospitalMiddleware, addServiceMiddleware } = require("../middlewares/hospitalMiddleware");

// person controllers
const { deletePerson } = require("../controllers/personController");

// company middlewares
const { gettingServicesMiddleware, checkCompanyMiddleware } = require("../middlewares/companyMiddleware");

// Auth Middleware
const authenticateMiddleware = require("../middlewares/authMiddleware/authenticateMiddleware");

// filter middlewares
const { filterPatientMiddleware, filterServiceMiddleware } = require("../middlewares/filterMiddleware");

// STATISTIQUE HOSPITAL
const { patients, patient, appareil, service, services } = require("../controllers/hospitalController/statistique");
const { statistiquePatientMiddleware, statistiquePatientsMiddleware, statistiqueApparielMiddleware, statistiqueServiceMiddleware, statistiqueServicesMiddleware } = require("../middlewares/hospitalMiddleware/statistiqueMiddleware");



// @route POST api/login
router.post("/login", loginMiddleware, loginController); // turn this on
// router.post("/login", loginController); // just for test

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);
router.post("/sign-up/patient", signUpMiddleware, patientMiddleware, signUpPatient);
router.post("/sign-up/company", signUpMiddleware, companyMiddleware, signUpCompany);
router.post("/sign-up/person", signUpMiddleware, signUpPersonMiddleware, signUpPerson);

{/* -------------------------------------------------- Start Hospital --------------------------------------------------*/}

// @route api/hospitals
router.post("/sign-up/hospital", signUpMiddleware, signUpHospitalMiddleware, signUpHospital); // todo: when u finish admin parte make sure to check who can access this route
router.get("/get-all-hospitals", authenticateMiddleware, hospitalMiddleware, getAllHospitals);
router.get("/hospital/:id", authenticateMiddleware, hospitalMiddleware, getHospitalById);
router.get("/hospital/:id/patients", authenticateMiddleware, hospitalMiddleware, getHospitalPatients);
// hospital services
router.get("/hospital/:id/services", authenticateMiddleware, hospitalMiddleware, getHospitalServices);
router.post("/hospital/add-service", authenticateMiddleware, addServiceMiddleware, addService); // add service to hospital | todo: make sure to check who can access this route
// hospital traitements
router.post("/hospital/add-traitement", authenticateMiddleware, traitementMiddleware, addTraitement);
router.get("/hospital/:id/traitements", authenticateMiddleware, hospitalMiddleware, getHospitalTraitements);
// hospital Statistique
router.get("/statistique/hospital/:id/patients", authenticateMiddleware, statistiquePatientsMiddleware, patients); // statistique dyal all patients
router.get("/statistique/hospital/:id/patient", authenticateMiddleware, statistiquePatientMiddleware, patient); // statistique dyal specific patient id
router.get("/statistique/hospital/:id/appareil", authenticateMiddleware, statistiqueApparielMiddleware, appareil); // statistique dyal specific appareil name
router.get("/statistique/hospital/:id/services", authenticateMiddleware, statistiqueServicesMiddleware, services); // statistique dyal all services
router.get("/statistique/hospital/:id/service", authenticateMiddleware, statistiqueServiceMiddleware, service);   // statistique dyal specific service id
// hospital filter
router.post("/filter/hospital/:id/patient", authenticateMiddleware, filterPatient);
router.post("/filter/hospital/:id/service", authenticateMiddleware, filterService);
router.post("/filter/hospital/:id/traitement", authenticateMiddleware, filterTraitement);

{/* -------------------------------------------------- End Hospital --------------------------------------------------*/}



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

/* COMPANY ROUTES */
router.get("/get-current-company", authenticateMiddleware, checkCompanyMiddleware, getCurrentCompany);
router.get("/company/get-services", authenticateMiddleware, checkCompanyMiddleware, getServices);
router.get("/company/get-doses", authenticateMiddleware, checkCompanyMiddleware, getAllPatientDoses);
router.get("/company/:id/persons", authenticateMiddleware, checkCompanyMiddleware, getPersons);
router.get("/company/:id/person/:id", authenticateMiddleware, checkCompanyMiddleware, getPerson);

/* PERSON ROUTES */
router.delete("/person/:username", deletePersonMiddleware, deletePerson);

/* FILTER ROUTES */

// router.post("/filter/person", filterPerson);
// router.post("/filter/hospital", filterHospital);

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
