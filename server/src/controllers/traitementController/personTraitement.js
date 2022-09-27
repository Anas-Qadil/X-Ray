const express = require("express");
const person_traitementModel = require("../../models/person_traitementModel");
const moment = require("moment");
const sendEmail = require("../../services/emailService");
const sendSMS = require("../../services/smsService");
const validator = require("validator");

const addPersonTraitement = async (req, res) => {
  try {
    const data = req.body; // person traitement data
    // console.log(data);
    const traitement = new person_traitementModel(data);

    const savedTraitement = await traitement.save();
    if (!savedTraitement)
      return res.status(400).send({ message: "Traitement not saved" });

      const traitements = await person_traitementModel.find({ patient: savedTraitement.person._id });
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
      await savedTraitement.populate("person");
      await savedTraitement.populate("service");
      await savedTraitement.populate("service.hospital");
      await savedTraitement.populate("person.company");
      
      let totalDoses = 0;
      validTraitementData.map((doc) => {
        totalDoses += doc.dose;
      });
      console.log(totalDoses);

      if (parseInt(totalDoses) >= 18) {
        const email = savedTraitement.person.email;
        if (email) {
          console.log("sending email");
          if (validator.isEmail(email))
            sendEmail(email);
        }
        const hospitalEmail = savedTraitement?.service?.hospital?.email;
        if (hospitalEmail) {
          console.log("sending email to hospital");
          if (validator.isEmail(hospitalEmail))
            sendEmail(hospitalEmail);
        }
        // const hospitalPhone = savedTraitement?.service?.hospital?.phone;
        // if (hospitalPhone) {
        //   console.log("sending sms to hospital");
        //   if (validator.isMobilePhone(hospitalPhone))
        //     sendSMS(hospitalPhone);
        // }
        const companyEmail = savedTraitement?.person?.company?.email;
        if (companyEmail) {
          console.log("sending email to company");
          if (validator.isEmail(companyEmail))
            sendEmail(companyEmail);
        }
        // const companyPhone = savedTraitement?.person?.company?.phone;
        // if (companyPhone) {
        //   console.log("sending sms to company");
        //   if (companyPhone)
        //     sendSMS(companyPhone);
        // }

        phone = savedTraitement?.person?.phone;
        if (phone) {
          console.log("sending sms");
          sendSMS(phone);
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
    const traitements = await person_traitementModel.find({ person: person })
      .populate("person")
      .populate("service");
    if (!traitements)
      return res.status(400).send({ message: "Traitements not found" });
    res.status(200).send({
      message: "Traitements found successfully",
      traitements: traitements
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