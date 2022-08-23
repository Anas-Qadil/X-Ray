const express = require("express");
const loginController = require("../../controllers/authController/loginController");
const router = express.Router();

router.post("/login", loginController);

module.exports = router;