const express = require("express");
const usersModel = require("../../models/usersModel");
const companyModel = require("../../models/companyModel");
const serviceModel = require("../../models/serviceModel");

const getCurrentCompany = async (req, res, next) => {
	try {
    const data = req.query;

    if (data.id) {
      const company = await companyModel.findById(data.id);
      if (!company) {
        return res.status(400).json({
          status: "failure",
          message: "Company not found"
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Company found",
        data: company
      });
    }
    if (username) {
      const user = await usersModel.findOne({ username: data.username })
      .populate("company");
      if (!user) {
        return res.status(400).json({
          status: "failure",
          message: "User not found"
        });
      }
      if (!user.company)
      {
        return res.status(400).send({
          status: "failure",
          message: "Company not found"
        })
      }
      return res.status(200).json({
        status: "success",
        message: "Company found",
        data: user.company
      });
    }

	} catch(e) {
		return res.status(500).send({
			status: "failure",
			message: e.message
		});
	}
}

const getServices = async (req, res, next) => {
  try {
    const { data } = req.query;

    if (data) {
      let services;
      let now = new Date();
      let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // todays date 
      // console.log(startOfToday);
      // const results = await usersModel.find({created_on: {$gte: startOfToday}});
      switch (data) {
        case "daily":
          services = await serviceModel.find({created_on: {$gte: startOfToday}});
          break;
        case "weekly":
          services = "weekly";
          break;
        case "monthly":
          services = "monthly";
          break;
        case "yearly":
          services = "yearly";
          break;
        default:
          return res.status(400).send({
            status: "failure",
            message: "Invalid query"
          });
      }
      res.send({
        status: "success",
        message: "Services found",
        data: services
      })
    }
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const getAllPatientDoses = async (req, res, next) => {
  try {
    const services = await serviceModel.find();
    if (!services) {
      return res.status(400).send({
        status: "failure",
        message: "No doses found"
      });
    }
    res.send({
      status: "success",
      message: "doses found",
      data: services
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = {
  getCurrentCompany,
  getServices,
  getAllPatientDoses
}