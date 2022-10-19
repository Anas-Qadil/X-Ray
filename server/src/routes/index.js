const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital, signUpCompany, signUpPerson } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware, signUpPersonMiddleware, companyMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");
const { getAllHospitals, getHospitalPersons, getHospitalById, getHospitalPatients, getHospitalServices, hospitalDoes, addService } = require("../controllers/hospitalController");
const { getAllPatients, currentPatient, getPatientById, getPatientServices, getPatientDoses, getPatientHospital } = require("../controllers/patientController");
const loginController = require("../controllers/authController/loginController");
const loginMiddleware = require("../middlewares/authMiddleware/loginMiddleware");
const usersModel = require("../models/usersModel");
const { filterPatient, filterTraitement, filterService, filterPerson, filterHospital } = require("../controllers/filter/index");

const { addTraitement, getHospitalTraitements, getTraitementById } = require("../controllers/traitementController");

// traitement middleware
const traitementMiddleware = require("../middlewares/traitementMiddleware");

// person middlewares
const { deletePersonMiddleware } = require("../middlewares/personMiddleware");

// hospital Middlewares
const { hospitalMiddleware, signUpHospitalMiddleware, addServiceMiddleware } = require("../middlewares/hospitalMiddleware");

// person controllers
const { deletePerson, getPerson } = require("../controllers/personController");

// company middlewares
const { gettingServicesMiddleware, checkCompanyMiddleware } = require("../middlewares/companyMiddleware");

// Auth Middleware
const authenticateMiddleware = require("../middlewares/authMiddleware/authenticateMiddleware");

// filter middlewares
const { filterPatientMiddleware, filterServiceMiddleware } = require("../middlewares/filterMiddleware");

// STATISTIQUE HOSPITAL
const { patients, patient, appareil, service, services } = require("../controllers/hospitalController/statistique");
const { statistiquePatientMiddleware, statistiquePatientsMiddleware, statistiqueApparielMiddleware, statistiqueServiceMiddleware, statistiqueServicesMiddleware } = require("../middlewares/hospitalMiddleware/statistiqueMiddleware");

// STATISTIQUE PATIENT
const { SP_hospital, SP_region, SP_service, SP_appareil } = require("../controllers/patientController/statistique");
const { SPM_patient } = require("../middlewares/patientMiddleware/statistiqueMiddleware");

// @route POST api/login
const relogMiddleware = require("../middlewares/authMiddleware/relogMiddleware");
router.post("/login", loginMiddleware, loginController); // turn this on
router.post("/relogin", relogMiddleware, loginController);
// router.post("/login", loginController); // just for test

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);

{/* -------------------------------------------------- Start GigaChadAdmin --------------------------------------------------*/}

const adminRouter = require("../controllers/adminController/index");
router.use("/admin", adminRouter);

{/* -------------------------------------------------- End GigaChadAdmin --------------------------------------------------*/}

{/* -------------------------------------------------- Start Hospital --------------------------------------------------*/}

// @route api/hospitals
router.post("/sign-up/hospital", signUpMiddleware, signUpHospitalMiddleware, signUpHospital); // todo: when u finish admin parte make sure to check who can access this route
router.get("/get-all-hospitals", authenticateMiddleware, hospitalMiddleware, getAllHospitals);
router.get("/hospital/patients", authenticateMiddleware, hospitalMiddleware, getHospitalPatients);
router.get("/hospital/persons", authenticateMiddleware, getHospitalPersons);
router.get("/hospital/:id", authenticateMiddleware, hospitalMiddleware, getHospitalById);
// hospital services
router.get("/hospital/service/services", authenticateMiddleware, hospitalMiddleware, getHospitalServices);
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


{/* -------------------------------------------------- Start Patient --------------------------------------------------*/}

// @route GET api/patients
router.post("/sign-up/patient", signUpMiddleware, patientMiddleware, signUpPatient);
router.get("/get-all-patients", authenticateMiddleware, getAllPatients);
router.get("/patient", authenticateMiddleware, currentPatient);
router.get("/patient/:id", authenticateMiddleware, getPatientById);
router.get("/patient/:id/services", authenticateMiddleware, getPatientServices);
router.get("/patient/:id/doses", authenticateMiddleware, getPatientDoses);
router.get("/patient/:id/hospital", authenticateMiddleware, getPatientHospital);

// statistique patients
router.get("/statistique/patient/:id/hospital", authenticateMiddleware, SPM_patient, SP_hospital);
router.get("/statistique/patient/:id/region", authenticateMiddleware, SPM_patient, SP_region);
router.get("/statistique/patient/:id/service", authenticateMiddleware, SPM_patient, SP_service);
router.get("/statistique/patient/:id/appareil", authenticateMiddleware, SPM_patient, SP_appareil);

{/* -------------------------------------------------- End Patient --------------------------------------------------*/}



{/* -------------------------------------------------- Start Company --------------------------------------------------*/}
const { getCurrentCompany, filterCompanyService, getCompanyPerson, getCompanyPersons, getCompanyServices, filterCompanyPerson } = require("../controllers/companyController");
const { statistiqueServiceAppareilCompany, statistiqueServicesCompany } = require ("../controllers/companyController/statistique");
/* COMPANY ROUTES */
router.post("/sign-up/company", signUpMiddleware, companyMiddleware, signUpCompany);
router.get("/company", authenticateMiddleware, getCurrentCompany);
router.get("/company/person/:id", authenticateMiddleware, getCompanyPerson); // user id
router.get("/company/persons", authenticateMiddleware, getCompanyPersons);
router.get("/company/services", authenticateMiddleware, getCompanyServices);
// search ou filter
router.post("/company/filter/person", authenticateMiddleware, filterCompanyPerson);
router.post("/company/filter/services", authenticateMiddleware, filterCompanyService);
// statistique
router.get("/statistique/company/service/appareil", authenticateMiddleware, statistiqueServiceAppareilCompany);
router.get("/statistique/company/services", authenticateMiddleware, statistiqueServicesCompany);

{/* -------------------------------------------------- End Company --------------------------------------------------*/}


{/* -------------------------------------------------- Start Person --------------------------------------------------*/}

// @route GET api/person
// router.post("/sign-up/person", signUpMiddleware, signUpPerson);
const { checkPersonAccess } = require("../middlewares/personMiddleware");
const { MID_addPersonTraitement } = require("../middlewares/traitementMiddleware/personTraitementMiddleware");
const { addPersonTraitement, getPersonTraitements } = require("../controllers/traitementController/personTraitement");
const { SPerson_hospital, SPerson_service, SPerson_region, SPerson_appareil } = require("../controllers/personController/statistique");

router.post("/sign-up/person", signUpMiddleware, signUpPersonMiddleware, signUpPerson);
router.get("/person/:id", authenticateMiddleware, checkPersonAccess, getPerson);
// add person traitements
router.post("/person/:id/add-traitement", authenticateMiddleware, MID_addPersonTraitement, addPersonTraitement);
router.get("/person/:id/traitements", authenticateMiddleware, getPersonTraitements);
// statistique person medical
router.get("/statistique/person/:id/hospital", authenticateMiddleware, SPerson_hospital);
router.get("/statistique/person/:id/service", authenticateMiddleware, SPerson_service);
router.get("/statistique/person/:id/region", authenticateMiddleware, SPerson_region);
router.get("/statistique/person/:id/appareil", authenticateMiddleware, SPerson_appareil);

// statistique person technical
// router.get("/statistique/person/:id/company", authenticateMiddleware, SPM_person, SP_hospital);

router.delete("/person/:username", deletePersonMiddleware, deletePerson);
{/* -------------------------------------------------- End Person --------------------------------------------------*/}

{/* -------------------------------------------------- Start Search --------------------------------------------------*/}
const { searchHospital, searchPerson, searchCompany, searchService, searchPatient, graphData } = require("../controllers/search"); 

router.get("/search/hospital", searchHospital);
router.get("/search/person", searchPerson);
router.get("/search/company", searchCompany);
router.get("/search/service", searchService);
router.get("/search/patient", searchPatient);
router.get("/graph", authenticateMiddleware, graphData);

{/* -------------------------------------------------- End Search --------------------------------------------------*/}

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
