const express = require("express");
const person_traitementModel = require("../../models/person_traitementModel");

const addPersonTraitement = async (req, res) => {
  try {
    const data = req.body; // person traitement data
    // console.log(data);
    const traitement = new person_traitementModel(data);
    const savedTraitement = await traitement.save();
    if (!savedTraitement)
      return res.status(400).send({ message: "Traitement not saved" });
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