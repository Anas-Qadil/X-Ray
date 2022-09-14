const express = require('express');
const usersModel = require('../../models/usersModel');

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

module.exports = {
	hospitalMiddleware,
  signUpHospitalMiddleware
}