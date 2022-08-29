const express = require("express");
const patientModel = require("../../models/patientModel");
const usersModel = require("../../models/usersModel");

const signUpController = async (req, res, next) => {
	res.send("hello from signUpController");
}

const signUpPatient = async (req, res, next) => {
	const data = req.body;
	const {username, password} = data;
	
	const patient = new patientModel(data);
	const savedPatient = await patient.save();
	if (!savedPatient)
	{
		return res.status(400).json({
			message: "Patient not saved. Please try again later!"
		});
	}
	const user = new usersModel({
		username,
		password,
		role: "patient",
	});
	const savedUser = await user.save();
	if (!savedUser) {
		return res.status(400).send("User not saved");
	}
	res.send({
    message: "Patient saved successfully",
    data: savedPatient
  });
}

const signUpHospital = async (req, res, next) => {
  const data = req.body;
	res.send("hello from singUpHospital");
}


module.exports = {
	signUpPatient,
	signUpController,
	signUpHospital
};

// const user = {
// 	firstName: "John",
// 	lastName: "Doe",
// 	cin: "123456789",
// 	gender: "Male", 
// 	birthDate: "10-3-2000",
// 	age: 20, 
// 	poids: 30, 
// 	address: "city 32", 
// 	phone: "12342323", 
// 	email: "example@example.com" 
// }