const express = require("express");
const usersModel = require("../../models/usersModel");
const adminModel = require("../../models/adminModel");
const cryptPassword = require("../../utils/cryptPassword");

const signUpAdmin = async (req, res) => {
  try {
    const data = req.body;
    const { username, password } = data;

    const adminData = await adminModel.create(data);
    const savedAdmin = await adminData.save();

    const hashedPassword = await cryptPassword(password);
    const user = await usersModel.create({
      username,
      password: hashedPassword,
      role: "admin",
      admin: savedAdmin._id,
    });
    const savedUser = await user.save();
    res.send({savedAdmin , savedUser});
  } catch (error) {
    res.status(500).send({
      message: "error",
    });
  }
}

module.exports = {
  signUpAdmin
}