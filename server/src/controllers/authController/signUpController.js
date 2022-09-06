const express = require("express");
const patientModel = require("../../models/patientModel");
const usersModel = require("../../models/usersModel");
const cryptPassword = require("../../utils/cryptPassword");
const companyModel = require("../../models/companyModel");

const signUpController = async (req, res, next) => {
	res.send("hello from signUpController");
}

const signUpPatient = async (req, res, next) => {
	
	try {
		const data = req.body;
    const { username, password } = data;
    
    const hashedPassword = await cryptPassword(password);
    const patient = new patientModel(data);
    const savedPatient = await patient.save();
    if (!savedPatient)
    {
      return res.status(400).json({
        status: "Failure ",
        message: "Patient not saved. Please try again later!"
      });
    }
    const user = new usersModel({
      username,
      password: hashedPassword,
      role: "patient",
      patient: savedPatient._id
    });
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(400).send({
        status: "failure ",
        messgae: "User not saved"
      });
    }
    return res.send({
      status: "success",
      message: "Patient saved successfully",
      data: savedPatient
    });
	} catch (e) {
    res.status(500).send({
      status: "error",
      message: e.message
    })
  }
}

const signUpHospital = async (req, res, next) => {
  const data = req.body;
	res.send("hello from singUpHospital");
}

const signUpCompany = async (req, res, next) => {
  try {
    const data = req.body;

    const company = await new companyModel(data);
    if (!company)
    {
      return res.status(500).send({
        status: "failure",
        message: "Company not created"
      });
    }
    const savedCompany = await company.save();
    if (!savedCompany) {
      return res.status(500).send({
        status: "failure",
        message: "Company not saved"
      });
    }
    const hashedPassword = await cryptPassword(data.password);
    const user = new usersModel({
      username: data.username,
      password: hashedPassword,
      role: "company",
      company: savedCompany._id
    });
    if (!user)
    {
      return res.status(500).send({
        status: "failure",
        message: "user not created"
      })
    }
    const savedUser = await user.save();
    if (!savedUser)
    {
      return res.status(500).send({
        status: "failure",
        message: "user not saved"
      });
    }
    res.send({
      status: "success",
      message: "Company saved successfully",
      data: {
        user: savedUser,
        company: savedCompany
      },
    })
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: e.message
    })
  }
}

const signUpPerson = async (req, res, next) => {
  try {
    const data = req.body;
    
    const { username, password } = data;
    const person = new personModel(data);
    if (!person) {
      return res.status(500).send({
        status: "failure",
        message: "Person not created"
      });
    }
    const savedPerson = await person.save();
    if (!savedPerson)
    {
      return res.status(500).send({
        status: "failure",
        message: "person not saved"
      });
    }
    const hashedPassword = await cryptPassword(password);
    const user = new usersModel({
      username: username,
      password: hashedPassword,
      role: "person",
      person: savedPerson._id
    });
    if (!user) {
      return res.status(500).send({
        status: "failure",
        message: "user not created"
      });
    }
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).send({
        status: "failure",
        message: "user not saved"
      });
    }
    delete user.password;
    res.status(200).send({
      status: "success",
      message: "Person saved successfully",
      data: {
        user: user,
        person: savedPerson
      }
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message
    })
  }
}


module.exports = {
	signUpPatient,
	signUpController,
	signUpHospital,
  signUpCompany,
  signUpPerson
};

// const user = {
	// firstName: "John",
	// lastName: "Doe",
	// cin: "123456789",
	// gender: "Male", 
	// birthDate: "10-3-2000",
	// age: 20, 
	// poids: 30, 
	// address: "city 32", 
	// phone: "12342323", 
	// email: "example@example.com" 
// }