const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const personModel = require("../../models/personModel");
const serviceModel = require("../../models/serviceModel");

const MID_addPersonTraitement = async (req, res, next) => {
  try {
    const data = req.body; // person traitement data

    if (data) {

      // person checker
      if (data.person) {
        if (ObjectId.isValid(data.person)) {
          const person = await personModel.findById(data.person);
          if (!person)
            return res.status(400).send({ message: "Person not found" });
        } else {
          return res.status(400).send({ message: "Invalid person id" });
        }
      } else {
        return res.status(400).send({ message: "Person is required" });
      }

      // service checker
      if (data.service) {
        if (ObjectId.isValid(data.service)) {
          const service = await serviceModel.findById(data.service);
          if (!service)
            return res.status(400).send({ message: "Service not found" });
        } else {
          return res.status(400).send({ message: "Invalid service id" });
        }
      }

      // date checker
      if (!data.date) {
        return res.status(400).send({ message: "Date is required" });
      }

      // dose checker
      if (data.dose)
      {
        if (data.dose < 0)
          return res.status(400).send({ message: "Dose must be positive" });
      } else {
        return res.status(400).send({ message: "Dose is required" });
      }

    } else {
      return res.status(400).send({ message: "Data is required" });
    }

    // if all tests passes move on to the next middleware
    next();
  } catch (e) {
    res.status(500).send({
      message: e.message
    })
  }
}

module.exports = {
  MID_addPersonTraitement
};