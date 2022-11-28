const express = require("express");
const person_traitementModel = require("../../models/person_traitementModel");
const moment = require("moment");
const {sendEmail, sendAdminMail} = require("../../services/emailService");
const sendSMS = require("../../services/smsService");
const validator = require("validator");
const adminModel = require("../../models/adminModel");
const util = require('util')


const addPersonTraitement = async (req, res) => {
  try {
    const data = req.body; // person traitement data
    const traitement = new person_traitementModel(data);

    const savedTraitement = await traitement.save();
    if (!savedTraitement)
      return res.status(400).send({ message: "Traitement not saved" });

      const traitements = await person_traitementModel.find({ person: savedTraitement.person._id });
      const validTraitementData = [];

      traitements.map((doc) => {
        const DocDate = moment(doc.createdAt);
        const today = moment();
        const TodayMinusOneYear = moment(today).subtract(1, "year");
        if (DocDate.isBetween(TodayMinusOneYear, today)) {
          validTraitementData.push(doc);
        }
      });
      // await savedTraitement.populate("person");
      await savedTraitement.populate("service");
      await savedTraitement.populate("service.hospital");
      await savedTraitement.populate({
        path: "person",
        populate: {
          path: "company",
        }
      });
      // Promise.all([savedTraitement]).then((result) => {
      //   console.log(result);
      // });
      let totalDoses = 0;
      validTraitementData.map((doc) => {
        totalDoses += Number(doc.dose);
      });

      Promise.resolve(savedTraitement).then((result) => {
        if (parseInt(totalDoses) >= 18) {
          const email = result?.person?.email;
          if (email) {
            if (validator.isEmail(email))
              sendEmail(email);
          }
          const hospitalEmail = result?.service?.hospital?.email;
          console.log(hospitalEmail);
          if (hospitalEmail) {
            if (validator.isEmail(hospitalEmail))
            {
              sendAdminMail(hospitalEmail, result?.person?.cin);
            }
          }
        
          const companyEmail = result?.person?.company?.email;
          console.log(companyEmail);
          if (companyEmail) {
            if (validator.isEmail(companyEmail))
              sendAdminMail(companyEmail, result?.person?.cin);
          }
  
          phone = result?.person?.phone;
          if (phone) {
            // sendSMS(phone);
          }
        }
      });
      if (totalDoses >= 18) {
        const adminEmail = await adminModel.findOne({}).select("email");
        if (adminEmail) {
          if (validator.isEmail(adminEmail?.email))
            sendAdminMail(adminEmail?.email, savedTraitement?.person?.cin);
        }
      }

      res.status(200).send({ 
      message: "Traitement saved successfully",
      traitement: savedTraitement
    });

  } catch (e) {
    res.status(500).send({
      message: e.message
    })
  }
}

const getPersonTraitements = async (req, res) => {
  try {
    const person = req.params.id; // person id
    let lastMonthDose = 0;
    let lastWeekDose = 0;
    let lastyearDose = 0;
    let totalDose = 0;
    const traitements = await person_traitementModel.find({ person: person })
    .populate("person")
    .populate({
      path: "service",
      populate: {
        path: "hospital",
      }
    });

    if (!traitements)
      return res.status(400).send({ message: "Traitements not found" });
    
    traitements.map((doc) => {
      const DocDate = moment(doc.createdAt);  
      const today = moment();
      const TodayMinusOneMonth = moment(today).subtract(1, "month");
      const TodayMinusOneWeek = moment(today).subtract(1, "week");
      const TodayMinusOneYear = moment(today).subtract(1, "year");
      // console.log({DocDate, today, TodayMinusOneMonth});
      if (DocDate.isBetween(TodayMinusOneMonth, today)) {
        lastMonthDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneWeek, today)) {
        lastWeekDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        lastyearDose += doc.dose;
      }
      totalDose += doc.dose;
    });

    res.status(200).send({
      message: "Traitements found successfully",
      traitements: traitements,
      lastMonthDose,
      lastWeekDose,
      lastyearDose,
      totalDose
    });
  } catch (e) {
    res.status(500).send({
      message: e.message
    })
  }
}

module.exports = {
	addPersonTraitement,
  getPersonTraitements
};