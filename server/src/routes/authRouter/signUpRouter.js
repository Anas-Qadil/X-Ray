const express = require("express");
const router = express.Router();
const signUpController = require("../../controllers/authController/signUpController");

router.post("/sign-up", signUpController);

module.exports = router;