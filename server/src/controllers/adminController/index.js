const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../../middlewares/authMiddleware/authenticateMiddleware");

const { signUpAdmin } = require("./admin");
const { adminSignUpMiddleWare } = require("../../middlewares/adminMiddleware/adminSignUpMiddle");

// companies controllers and middlewares
const { getFilterCompanies, getFilterPersons, getFilterServices, getCompanies, deleteCompany, getCompany, getStatisticsRegion, getStatistics, getStatisticsServices, getStatisticsAppareil } = require("./company");


router.post("/sign-up", adminSignUpMiddleWare, signUpAdmin);

// companies routes
router.get("/companies", authenticateMiddleware, getCompanies); // ucan send search query to filter companies out
router.get("/company/:id", authenticateMiddleware, getCompany);
router.delete("/company/:id", authenticateMiddleware, deleteCompany);
router.get("/statistics/company", authenticateMiddleware, getStatistics);
router.get("/statistic/company/region", authenticateMiddleware, getStatisticsRegion);
router.get("/statistic/company/service", authenticateMiddleware, getStatisticsServices);
router.get("/statistic/company/appareil", authenticateMiddleware, getStatisticsAppareil);
router.get("/filter/company", authenticateMiddleware, getFilterCompanies);
router.get("/filter/company/services", authenticateMiddleware, getFilterServices);
router.get("/filter/company/persons", authenticateMiddleware, getFilterPersons);

// hospitals routes
const { getHospitals, getStatisticsHospitalAppareil, getStatisticsHospitalServices, deleteHospital, getHospital, getHospitalStatistics, getStatisticsHospitalRegion } = require("./hospital");
router.get("/hospitals", authenticateMiddleware, getHospitals);
router.get("/hospital/:id", authenticateMiddleware, getHospital);
router.delete("/hospital/:id", authenticateMiddleware, deleteHospital);
router.get("/statistics/hospital", authenticateMiddleware, getHospitalStatistics);
router.get("/statistic/hospital/region", authenticateMiddleware, getStatisticsHospitalRegion);
router.get("/statistic/hospital/service", getStatisticsHospitalServices);
router.get("/statistic/hospital/appareil", getStatisticsHospitalAppareil);

module.exports = router;