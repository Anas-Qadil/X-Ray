const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const usersModel = require("../../models/usersModel");
const serviceModel = require("../../models/serviceModel");
const moment = require("moment");
const traitementModel = require("../../models/traitementModel");
const patientModel = require("../../models/patientModel");

const getHospitals = async (req, res) => {
	try {
    const search = req.query.search;
    let hospitals;

    if (search) {
      hospitals = await hospitalModel.find({
        $or: [
          { region: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { ville: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    } else hospitals = await hospitalModel.find();

    res.send({
      message: "sucess",
      data: hospitals,
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getHospital = async (req, res) => {
  try {
    const { id } = req.params; // hospital id
    
    if (!id) {
      return res.status(400).send({
        message: "id is required"
      });
    }
    const hospital = await hospitalModel.findById(id);
    res.send({
      message: "sucess",
      data: hospital
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params; // hospital id

    if (!id) {
      return res.status(400).send({
        message: "id is required"
      });
    }
    const hospital = await hospitalModel.findById(id);
    if (!hospital) {
      return res.status(400).send({
        message: "hospital not found"
      });
    }
    const user = await usersModel.findOneAndDelete({ hospital: id });
    
    const deletedHospital = await hospitalModel.findByIdAndDelete(id);

    res.send({
      message: "sucess",
      data: deletedHospital
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getHospitalStatistics = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const hospitals = await hospitalModel.find();
    
    let data = [];
    hospitals.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getStatisticsHospitalRegion = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const region = req.query.region;

    if (!region) {
      return res.status(400).send({
        message: "region is required"
      });
    } 

    if (!startDate || !endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const hospitals = await hospitalModel.find({region});

    let data = [];
    hospitals.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate)) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getStatisticsHospitalServices = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const service = req.query.service;

    if (!service) {
      return res.status(400).send({
        message: "service is required"
      });
    } 

    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const services = await traitementModel.find({})
      .populate("service");
    
    let data = [];
    services.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate) && doc?.service?.name === service) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getStatisticsHospitalAppareil = async (req, res) => {
  try {
    const startDate = moment(req.query.startDate, "YYYY-MM-DD");
    const endDate = moment(req.query.endDate, "YYYY-MM-DD");
    const appareil = req.query.appareil;

    if (!appareil) {
      return res.status(400).send({
        message: "appareil is required"
      });
    } 

    if (!req.query.startDate || !req.query.endDate) {
      return res.status(400).send({
        message: "startDate and endDate are required"
      });
    }

    const services = await traitementModel.find({})
      .populate("service");
    
    let data = [];
    services.map((doc) => {
      const currDate = moment(doc.createdAt, "YYYY-MM-DD");
      if (currDate.isBetween(startDate, endDate) && doc?.service?.equipment === appareil) {
        data.push(doc);
      }
    });

    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getFilterHospital = async (req, res) => {
  try {
    const query = req.query;
    const hospitals = await hospitalModel.find(query);
    res.send({
      message: "success",
      data: hospitals
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getFilterHospitalServices = async (req, res) => {
  try {
    const query = req.query;
    const services = await serviceModel.find(query);

    const traitement = await traitementModel.find({})
      .populate("service")
      .populate("patient");

    let data = [];
    traitement.map((doc) => {
      services.map((service) => {
        if (doc?.service?._id.toString() === service._id.toString()) {
          data.push(doc);
        }
      });
    });

    res.send({
      message: "success",
      data: services
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getFilterHospitalPatients = async (req, res) => {
  try {
    const query = req.query;
    const patients = await patientModel.find(query);

    res.send({
      message: "success",
      data: patients
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getHospitalData = async (req, res) => {
  try {
    const hospitalID = req.params.id; // hospital id
    if (!hospitalID) {
      return res.status(400).send({
        message: "hospitalID is required"
      });
    }
    const hospital = await hospitalModel.findById(hospitalID);
    const services = await serviceModel.find({hospital: hospitalID});
    const traitements = await traitementModel.find({})
      .populate("service")
      .populate("patient");

    let data = [];
    let patients = [];
    traitements.map((doc) => {
      if (doc?.service?.hospital.toString() === hospitalID) {
        data.push(doc);
        patients.push(doc.patient);
      }
    });

    res.send({
      message: "success",
      data: {
        hospital: hospital,
        services: services,
        traitements: data,
        patients: patients
      }
    });

  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find({})
      .populate("hospital");
    res.send({
      message: "success",
      data: services
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}
const getAllSearchServices = async (req, res) => {
  try {
    const { search, hospitalSearch }  = req.query; 
    const services = await serviceModel.find({
      $or: [
        {name: {$regex: search, $options: "i"}},
        {equipment: {$regex: search, $options: "i"}},
        {examen: {$regex: search, $options: "i"}},
        {protocol: {$regex: search, $options: "i"}},
      ],
    })
      .populate("hospital");
    // console.log(services);
    const hospitals = await hospitalModel.find({
      $or: [
        {name: {$regex: hospitalSearch, $options: "i"}},
        {region: {$regex: hospitalSearch, $options: "i"}},
        {ville: {$regex: hospitalSearch, $options: "i"}},
        {statut: {$regex: hospitalSearch, $options: "i"}},
        {designation: {$regex: hospitalSearch, $options: "i"}},
        {phone: {$regex: hospitalSearch, $options: "i"}},
        {email: {$regex: hospitalSearch, $options: "i"}},
      ],
    });

    let data = [];
    if (hospitalSearch)
    {
      services.map((service) => {
        hospitals.map((hospital) => {
          if (service?.hospital?._id.toString() === hospital?._id.toString()) {
            data.push(service);
          }
        });
      });
    }else 
      data = services;
    res.send({
      message: "success",
      data: data
    });
  } catch (e) {
    res.status(500).send({
      message: e.messsage,
    });
  }
}

module.exports = {
  getHospitals,
  getHospital,
  deleteHospital,
  getHospitalStatistics,
  getStatisticsHospitalRegion,
  getStatisticsHospitalServices,
  getStatisticsHospitalAppareil,
  getFilterHospital,
  getFilterHospitalServices,
  getFilterHospitalPatients,
  getHospitalData,
  getAllServices,
  getAllSearchServices
};