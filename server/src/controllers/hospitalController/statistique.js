const express = require("express");

const dailyReport = async (req, res) => {
  try {

  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = { 
  dailyReport
};