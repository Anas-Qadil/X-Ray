const express = require("express");
const router = express.Router();
const patientModel = require("../src/models/patientModel");

//@test apis

//@all patients
router.get("/patients", async (req, res) => {
	const data = await patientModel.find({});
	res.json({data});
});

module.exports = router;