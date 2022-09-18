const express = require('express');
const usersModel = require('../../models/usersModel');
const hospitalModel = require('../../models/hospitalModel');
const ObjectId = require('mongoose').Types.ObjectId;
const validator = require('validator');

const hospitalMiddleware = async (req, res, next) => {
	try {
    const user = req.user;
    if (user.role !== 'admin' && user.role !== 'hospital') {
      return res.status(401).send({
        status: 'failure',
        message: 'Unauthorized'
      });
    }
    next();
	} catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const signUpHospitalMiddleware = async (req, res, next) => {
  try {
    const data = req.body;
    if (data) {
      if (!data.username) {
        return res.status(400).send({
          status: 'failure',
          message: 'Username is required'
        });
      }
      const user = await usersModel.findOne({ username: data.username });
      if (user) {
        return res.status(400).send({
          status: 'failure',
          message: 'Username already exists'
        });
      }
      if (!data.name) {
        return res.status(400).send({
          status: 'failure',
          message: 'Hospital name is required'
        });
      }
      if (!data.region) {
        return res.status(400).send({
          status: 'failure',
          message: 'Region is required'
        });
      }
      if (!data.password) {
        return res.status(400).send({
          status: 'failure',
          message: 'Password is required'
        });
      }
      if (!data.phone) {
        return res.status(400).send({
          status: 'failure',
          message: 'Phone is required'
        });
      }
      if (!data.designation) {
        return res.status(400).send({
          status: 'failure',
          message: 'Designation is required'
        });
      }
      if (data.email) {
        const email = await hospitalModel.findOne({ email: data.email });
        if (email) {
          return res.status(400).send({
            status: 'failure',
            message: 'Email already exists'
          });
        }
        if (!validator.isEmail(data.email)) {
          return res.status(400).send({
            status: 'failure',
            message: 'Invalid email'
          });
        }
      }
      next();
    } else {
      return res.send({
        status: 'failure',
        message: 'No data provided'
      })
    }
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

const addServiceMiddleware = async (req, res, next) => {
  try {
    const data = req.body;
    if (data) {
      if (!data.name) {
        return res.status(400).send({
          status: 'failure',
          message: 'Service name is required'
        });
      }
      if (!data.equipment) {
        return res.status(400).send({
          status: 'failure',
          message: 'Equipment is required'
        });
      }
      if (!data.examen) {
        return res.status(400).send({
          status: 'failure',
          message: 'Examen is required'
        });
      }
      if (!data.protocol) {
        return res.status(400).send({
          status: 'failure',
          message: 'Protocol is required'
        });
      }
      if (data.hospital) {
        
        if (!ObjectId.isValid(data.hospital)) {
          return res.status(400).send({
            status: 'failure',
            message: 'Invalid hospital id'
          });
        }
        const hospital = await hospitalModel.findOne({ _id: data.hospital });
        if (!hospital) {
          return res.status(400).send({
            status: 'failure',
            message: 'Hospital does not exist'
          });
        }
      } else {
        return res.status(400).send({
          status: 'failure',
          message: 'Hospital is required'
        });
      }
    } else {
      return res.send({
        status: 'failure',
        message: 'No data provided'
      })
    }

    next();
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = {
	hospitalMiddleware,
  signUpHospitalMiddleware,
  addServiceMiddleware
}