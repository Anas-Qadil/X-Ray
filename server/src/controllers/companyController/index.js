const express = require("express");
const usersModel = require("../../models/usersModel");
const companyModel = require("../../models/companyModel");
const serviceModel = require("../../models/serviceModel");
const personModel = require("../../models/personModel");
const person_traitementModel = require("../../models/person_traitementModel");
const moment = require("moment");

const getCurrentCompany = async (req, res) => {
  try {
    const company = req.user;
    if (!company) {
      return res.status(400).json({
        message: "company not found",
      });
    }

    if (company.role !== "company") {
      return res.status(400).json({
        message: "you are not a company",
      });
    }

    if (company.company)
      await company.populate("company");
    res.status(200).send({
      message: "company found",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getCompanyPerson = async (req, res) => {
  try {
    const id = req.params.id; // person id
    const user = req.user; // company user

    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    
    const person = await personModel.findById(id);
    if (!person) {
      return res.status(400).json({
        message: "person not found",
      });
    }

    if (person.company?.toString() !== user.company?.toString()) {
      return res.status(400).json({
        message: "you are not allowed to access this person",
      });
    }   
    res.status(200).send({
      message: "person found",
      data: person,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getCompanyPersons = async (req, res) => {
  try {
    const user = req.user;
    const search = req.query.search;
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    let persons = [];
    if (user.role !== "company") {
       persons = await personModel.find({
        company: user.company,
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { cin: { $regex: search, $options: "i" } },
          { secteur: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { fonction: { $regex: search, $options: "i" } },
          { poids: { $regex: search, $options: "i" } },
        ],
      }).populate("company");
  } else {
    persons = await personModel.find({
      hospital: user.hospital,
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { cin: { $regex: search, $options: "i" } },
        { secteur: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { fonction: { $regex: search, $options: "i" } },
        { poids: { $regex: search, $options: "i" } },
      ],
    }).populate("hospital");
  }


    res.status(200).send({
      message: "persons found",
      data: persons,
    });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

const getCompanyServices = async (req, res) => {
  try {
    const company = req.user;
    const id = req?.query?.id;
    if (id)
      company.company = id
    if (!company) {
      return res.status(400).json({
        message: "company not found",
      });
    }
    let data =[];
    const services = await person_traitementModel.find({})
      .populate({
        path: "person",
        populate: {
          path: "company",
        }
      })
      .populate({
        path: "service",
        populate: {
          path: "hospital",
        },
      });


    if (!services) {
      return res.status(200).json({
        message: "no services found",
      });
    }
    services.map(doc => {
      if (String(doc?.person?.company?._id) === String(company?.company)) {
        data.push(doc);
      }
    });

    let lastMonthDose = 0;
    let lastWeekDose = 0;
    let lastyearDose = 0;
    let totalDose = 0;

    data.map(doc => {
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
      totalDose += doc.dose;
    });

    res.status(200).send({
      message: "services found",
      data: data,
      lastMonthDose,
      lastWeekDose,
      lastyearDose,
      totalDose,
    });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

const filterCompanyPerson = async (req, res) => {
  try {
    const company = req.user;
    if (!company) {
      return res.status(400).json({
        message: "company not found",
      });
    }

    const persons = await personModel.find({
      company: company.company,
      ...req.body,
    });

    res.status(200).send({
      message: "persons found",
      data: persons,
    });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

const filterCompanyService = async (req, res) => {
  try {
    const company = req.user;
    if (!company) {
      return res.status(400).json({
        message: "company not found",
      });
    }

    const services = await serviceModel.find({
      ...req.body,
    });
    
    const traitements = await person_traitementModel.find({
    }).populate("person").populate("service")

    let data = [];
    traitements.map(doc => {
      if (String(doc?.person?.company) === String(company?.company)) {
        services.map(service => {
          if (String(service._id) === String(doc.service._id)) {
            data.push(doc);
          }
        });
      }
    })
    res.status(200).send({
      message: "services found",
      data: data,
    });

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = {
  getCurrentCompany,
  getCompanyPerson,
  getCompanyPersons,
  getCompanyServices,
  filterCompanyPerson,
  filterCompanyService,
}