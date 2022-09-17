const express = require("express");
const traitementModel = require("../../models/traitementModel");

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
    const data = await traitementModel.find({ }).populate("patient").populate("service");
    let result =[]
    let doses = 0;
    data.map((doc) => {
      if (doc.service.hospital == id) {
        result.push(doc);
        doses += doc.dose;
      }
    });
    if (!data) {
      return res.status(400).json({
        message: "No patient found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Patients found",
      data: {
        data: result,
        doses: doses
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