const express = require("express");

const signUpController = async (req, res, next) => {
	res.send("hello from signUpController");
}

const signUpPatient = async (req, res, next) => {
	res.send("hello from singUpPatient");
}

const signUpHospital = async (req, res, next) => {
	res.send("hello from singUpHospital");
}


module.exports = {
	signUpPatient,
	signUpController,
	signUpHospital
};

// const user = {
// 	firstName: "John",#
// 	lastName: "Doe",#
// 	cin: "123456789",#
// 	gender: "Male", #
// 	birthDate: "10-3-2000",#
// 	age: 20, #
// 	poids: 30, #
// 	address: "city 32", #
// 	phone: "12342323", #
//	email: "example@example.com" #
// }