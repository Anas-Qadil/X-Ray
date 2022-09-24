const express = require("express");
const companyModel = require("../../models/companyModel");
const usersModel = require("../../models/usersModel");
const moment = require("moment");
const person_traitementModel = require("../../models/person_traitementModel");

const getCompanies = async (req, res) => {
  try {
    const search = req.query.search;
    let companies;
  
    if (search) {
      companies = await companyModel.find({
        $or: [
          { region: { $regex: search, $options: "i" } },
          { ville: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    } else companies = await companyModel.find();

    res.send({
      message: "sucess",
      data: companies
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getCompany = async (req, res) => {
  try {
    const { id } = req.params; // company id
    
    if (!id) {
      return res.status(400).send({
        message: "id is required"
      });
    }
    const company = await companyModel.findById(id);
    res.send({
      message: "sucess",
      data: company
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companyModel.findByIdAndDelete(id);
    if (!company)
      return res.status(400).send({
        message: "company not found",
      });
    const user = await usersModel.findOneAndDelete({ company: id });
    if (!user)
      return res.status(400).send({
        message: "user not found",
      });
    res.send({
      message: "success",
      data: company,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}

const getStatistics = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "start date or end date is missing",
      });
    }

    const companies = await companyModel.find();
    let data = [];
    companies.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });
    return res.status(200).send({
      status: "success",
      message: "companies",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
}

const getStatisticsRegion = async (req, res) => {
  try {
    const region = req.query.region;
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!region) {
      return res.status(400).send({
        message: "region is required",
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required",
      });
    }

    const companies = await companyModel.find({ region });

    let data = [];
    companies.map((company) => {
      const currDate = moment(company.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(company);
      }
    });

    res.status(200).send({
      message: "success",
      data: data,
    });


  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}

const getStatisticsServices = async (req, res) => {
  try {
    const serviceId = req.query.service;
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!serviceId) {
      return res.status(400).send({
        message: "service is required",
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required",
      });
    }

    const traitements = await person_traitementModel.find({ service: serviceId })
      .populate("person")
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        }
      });

    let data = [];

    traitements.map((traitement) => {
      const currDate = moment(traitement.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(traitement);
      }
    }); 

    res.status(200).send({
      message: "success",
      data: data,
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}

const getStatisticsAppareil = async (req, res) => {
  try {
    const appareil = req.query.appareil; // equipement name
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!appareil) {
      return res.status(400).send({
        message: "appareil is required",
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required",
      });
    }

    const traitements = await person_traitementModel.find({ })
      .populate("person")
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        }
      });

    let data = [];

    traitements.map((traitement) => {
      const currDate = moment(traitement.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate) && traitement.service.equipement === appareil) {
        data.push(traitement);
      }
    });

    res.status(200).send({
      message: "success",
      data: data,
    });
    
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}



module.exports = {
  getCompanies,
  getCompany,
  deleteCompany,
  getStatistics,
  getStatisticsRegion,
  getStatisticsServices,
  getStatisticsAppareil
}