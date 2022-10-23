const express = require("express");
const personModel = require("../../models/personModel");
const person_traitementModel = require("../../models/person_traitementModel");
const usersModel = require("../../models/usersModel");

const getPersons = async (req, res) => {
	try {
    const { search } = req.query;
    let persons;
    persons = await personModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { cin: { $regex: search, $options: "i" } },
        { secteur: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ]
    });
    res.status(200).json({
      status: "success",
      data: persons,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}

const getPerson = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const person = await personModel.findById(id);
    res.status(200).json({ person });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPersonData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const person = await personModel.findById(id);
    const traitements = await person_traitementModel.find({ person: id })
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      })
      .populate({
        path: "person",
        populate: {
          path: "company",
        },
      });

    res.status(200).json({
      message: "person data",
      data: {
        person,
        traitements,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }
    await usersModel.findOneAndDelete({ person: id });
    await personModel.findOneAndDelete({ _id: id });
    await person_traitementModel.deleteMany({ person: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getStatisticsPerson = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).json({ error: "invalid date" });
    }

    let data = [];
    const traitements = await person_traitementModel.find({})
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      })
      .populate({
        path: "person",
        populate: {
          path: "company",
        },
      });

      traitements.map((traitement) => {
        const date = moment(traitement.createdAt, "YYYY-MM-DD");
        if (date.isBetween(startDate, endDate)) {
          data.push(traitement);
        }
      });

    res.status(200).json({
      message: "person data",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getPersons,
  getPerson,
  getPersonData,
  deletePerson,
  getStatisticsPerson
};