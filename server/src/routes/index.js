const express = require("express");
const router = express.Router();
const { signUpController, signUpPatient, signUpHospital } = require("../controllers/authController/signUpController");
const { signUpMiddleware, patientMiddleware } = require("../middlewares/authMiddleware/signUpMiddleware");

// @route POST api/signup
router.post("/sign-up", signUpMiddleware, signUpController);
router.post("/sign-up/patient", signUpMiddleware, patientMiddleware, signUpPatient);
router.post("/sign-up/hospital", signUpMiddleware, signUpHospital);

module.exports = router;