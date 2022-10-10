const express = require("express");
const traitementModel = require("../../models/traitementModel");
const moment = require("moment");
const {sendEmail, sendAdminMail} = require("../../services/emailService");
const sendSms = require("../../services/smsService");
const validator = require("validator");
const adminModel = require("../../models/adminModel");
const traitementPersonModel = require("../../models/person_traitementModel");


const addTraitement = async (req, res, next) => {
	try {
    const data = req.body;
    
    const traitement = await traitementModel.create(data);
    if (!traitement) {
      return res.status(400).send({
        status: "failure",
        message: "Traitement was not created"
      });
    }
    const savedTraitement = await traitement.save();
    if (!savedTraitement) {
      return res.status(400).send({
        status: "failure",
        message: "Traitement was not saved"
      });
    }
    await savedTraitement.populate("patient");
    await savedTraitement.populate("service");
    await savedTraitement.populate("service.hospital");
    
    // check if patient passes the limit o fx ray doses
    const traitements = await traitementModel.find({ patient: savedTraitement.patient._id });
    const validTraitementData = [];

    traitements.map((doc) => {
      const DocDate = moment(doc.createdAt);
      const today = moment();
      const TodayMinusOneYear = moment(today).subtract(1, "year");
      // console.log({DocDate, today, TodayMinusOneYear});
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        validTraitementData.push(doc);
      }
    });

    let totalDoses = 0;
    validTraitementData.map((doc) => {
      totalDoses += doc.dose;
    });
    console.log(totalDoses);

    if (totalDoses >= 18) {
      const email = savedTraitement.patient?.email;
      if (email) {
        console.log("sending email");
        if (validator.isEmail(email))
          sendEmail(email);
      }
      const hospitalEmail = savedTraitement.service?.hospital?.email;
      if (hospitalEmail) {
        console.log("sending email to hospital");
        if (validator.isEmail(hospitalEmail))
          sendEmail(hospitalEmail);
      }
      const phoneNumber = savedTraitement.patient?.phone;
      if (phoneNumber) {
        console.log("sending sms");
        sendSms(phoneNumber);
      }
      // admin email
      const adminEmail = await adminModel.findOne({}).select("email");
      console.log({
        adminEmail: adminEmail.email,
        cin: savedTraitement.patient.cin
      })
      if (adminEmail) {
        console.log("sending email to admin");
        if (validator.isEmail(adminEmail.email))
          sendAdminMail(adminEmail.email, savedTraitement.patient.cin);
      }
    }

		return res.status(201).send({
      status: "success",
      message: "Traitement added successfully",
      data: savedTraitement
    })
	} catch (e) {
		res.status(500).send({
			status: "error",
			message: e.message
		})
	}
}

const getHospitalTraitements = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await traitementModel.find({ })
      .populate("patient")
      .populate({
      path: "service",
      populate: {
        path: "hospital",
      },
    });
    let lastMonthDose = 0;
    let lastWeekDose = 0;
    let lastyearDose = 0;

    let result = [];
    let doses = 0;
    data.map((doc) => {
      if (doc.service.hospital._id == id) {
        result.push(doc);
        doses += doc.dose;
      }
    });
    if (!data) {
      return res.status(400).json({
        message: "No patient found",
      });
    }

    result.map((doc) => {
      const DocDate = moment(doc.createdAt);
      const today = moment();
      const TodayMinusOneMonth = moment(today).subtract(1, "month");
      const TodayMinusOneWeek = moment(today).subtract(1, "week");
      const TodayMinusOneYear = moment(today).subtract(1, "year");
      if (DocDate.isBetween(TodayMinusOneMonth, today)) {
        lastMonthDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneWeek, today)) {
        lastWeekDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        lastyearDose += doc.dose;
      }
    });

    // person data
    const personTraitements = await traitementPersonModel.find({})
      .populate("person")
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      });
    
    let personData = [];
    personTraitements.map((doc) => {
      if (doc.service.hospital._id == id) {
        personData.push(doc);
        console.log(doc);
      }
    });

    personData.map((doc) => {
      const DocDate = moment(doc.createdAt);
      const today = moment();
      const TodayMinusOneMonth = moment(today).subtract(1, "month");
      const TodayMinusOneWeek = moment(today).subtract(1, "week");
      const TodayMinusOneYear = moment(today).subtract(1, "year");
      if (DocDate.isBetween(TodayMinusOneMonth, today)) {
        lastMonthDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneWeek, today)) {
        lastWeekDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        lastyearDose += doc.dose;
      }
      doses += doc.dose;
    });

    const combine = [...result, ...personData];

    res.status(200).send({
      status: "success",
      message: "Patients found",
      data: {
        data: combine,
        doses: doses,
        lastMonthDose: lastMonthDose,
        lastWeekDose: lastWeekDose,
        lastyearDose: lastyearDose,
      }
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

const getTraitementById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await traitementModel.findOne({_id: id}).populate("patient").populate("service");
    if (!data) {
      return res.status(400).json({
        message: "No traitement found",
      });
    }
    res.status(200).send({
      message: "Traitement found",
      data: data
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
}


module.exports = {
  addTraitement,
  getHospitalTraitements,
  getTraitementById
};