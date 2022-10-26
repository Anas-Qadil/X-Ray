const express = require("express");

const sendSms = async (phone) => {
  try {
    const message = "Hello, you have reached the limit of x ray doses";
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const client = require("twilio")(accountSid, authToken);
    if (phone)
    {
      if (phone.length === 10)
      {
        phone = "+212" + phone;
      }
    }
    const response = await client.messages.create({
      body: message,
      from: phoneNumber,
      to: phone,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendSms;