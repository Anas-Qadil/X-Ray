const express = require("express");
const usersModel = require("../../models/usersModel");
const adminModel = require("../../models/adminModel");

const adminSignUpMiddleWare = async (req, res, next) => {
  try {
    const data = req.body; // admin sign up data

    if (data) {
      if (!data.firstName) {
        return res.status(400).send({
          message: "firstName is required",
        });
      }
      if (!data.lastName) {
        return res.status(400).send({
          message: "lastName is required",
        });
      }
      if (!data.phone) {
        return res.status(400).send({
          message: "phone is required",
        });
      } else {
        const phone = await adminModel.findOne({ phone: data.phone });
        if (phone) {
          return res.status(400).send({
            message: "phone already exists",
          });
        }
      }
      if (!data.cin) {
        return res.status(400).send({
          message: "cin is required",
        });
      } else {
        const admin = await adminModel.findOne({ cin: data.cin });
        if (admin) {
          return res.status(400).send({
            message: "cin already exists",
          });
        }
      }
      if (!data.email) {
        return res.status(400).send({
          message: "email is required",
        });
      } else {
        const email = await adminModel.findOne({ email: data.email });
        if (email) {
          return res.status(400).send({
            message: "email already exists",
          });
        }
      }
      if (!data.password) {
        return res.status(400).send({
          message: "password is required",
        });
      }
      if (data.username) {
        const user = await usersModel.findOne({ username: data.username });
        if (user) {
          return res.status(400).send({
            message: "username already exists",
          });
        }
      } else {
        return res.status(400).send({
          message: "username is required",
        });
      }
    } else return res.status(400).send({ message: "data is required" });

    next();

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = {
  adminSignUpMiddleWare
}