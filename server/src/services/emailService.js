const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");


const sendEmail = async(userEmail) => {

  if (!userEmail) {
    return false;
  }
	fs.readFile(path.join(__dirname, "../utils/emailFormat.html"), async(err, file) => {
    
		if (err)
			return console.log(err);
		const email = process.env.EMAIL;
		const password = process.env.PASSWORD;
    console.log({email, password});
		const EmailReciever = userEmail;
		const subject = "Warning";
		const text = "You have exceeded the limit of x-ray doses";
		const html = file.toString();

		const transporter = nodemailer.createTransport({
			host : "smtp.gmail.com",
			port : 587,
			secure : false,
			auth : {
				user : email,
				pass : password
			},
		});
		const info = await transporter.sendMail({
			from : `XRAY DOSE SYSTEM <X-RAY Team>`,
			to : EmailReciever,
			subject : subject,
			text : text,
			html : html,
		});
		return (true);
	});
}

const sendAdminMail = async(userEmail, patientCin) => {
  if (!userEmail) {
    return false;
  }
	fs.readFile(path.join(__dirname, "../utils/adminEmailFormat.html"), async(err, file) => {
    
		if (err)
			return console.log(err);
		const email = process.env.EMAIL;
		const password = process.env.PASSWORD;
		const EmailReciever = userEmail;
		const subject = "Warning";
		const text = "You have exceeded the limit of x-ray doses";
		const html = file.toString();
    const finalHtml = html.replace("[CIN]", patientCin);

		const transporter = nodemailer.createTransport({
			host : "smtp.gmail.com",
			port : 587,
			secure : false,
			auth : {
				user : email,
				pass : password
			},
		});
		const info = await transporter.sendMail({
			from : `Matcha <Matcha Team>`,
			to : EmailReciever,
			subject : subject,
			text : text,
			html : finalHtml,
		});
		return (true);
	});
}

module.exports = {
  sendEmail,
  sendAdminMail
};