const express = require("express");
const traitementModel = require("../../models/traitementModel");

const addTraitement = async (req, res, next) => {
	try {
    const data = req.data;

    console.log(data);
		return res.status(201).send({
      status: "success",
      message: "Traitement added successfully"
    })
	} catch (e) {
		res.status(500).send({
			status: "error",
			message: e.message
		})
	}
}

module.exports = {
  addTraitement
};