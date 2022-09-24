const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../../middlewares/authMiddleware/authenticateMiddleware");

const { signUpAdmin } = require("./admin");
const { adminSignUpMiddleWare } = require("../../middlewares/adminMiddleware/adminSignUpMiddle");

// companies controllers and middlewares
const { getCompanies, deleteCompany, getCompany, getStatisticsRegion, getStatistics, getStatisticsServices, getStatisticsAppareil } = require("./company");


router.post("/sign-up", adminSignUpMiddleWare, signUpAdmin);

// companies routes
router.get("/companies", authenticateMiddleware, getCompanies); // ucan send search query to filter companies out
router.get("/company/:id", authenticateMiddleware, getCompany);
router.delete("/company/:id", authenticateMiddleware, deleteCompany);
router.get("/statistics/company", authenticateMiddleware, getStatistics);
router.get("/statistic/company/region", authenticateMiddleware, getStatisticsRegion);
router.get("/statistic/company/service", authenticateMiddleware, getStatisticsServices);
router.get("/statistic/company/appareil", authenticateMiddleware, getStatisticsAppareil);

module.exports = router;