const express = require("express");

const sendSms = async (req, res, next) => {
  try {
    const { phone, message } = req.body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const client = require("twilio")(accountSid, authToken);

    const response = await client.messages.create({
      body: message,
      from: phoneNumber,
      to: phone,
    });
    res.status(200).json({
      status: "success",
      message: "message sent successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = sendSms;