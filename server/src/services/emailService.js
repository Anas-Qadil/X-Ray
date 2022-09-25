const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");


const sendMail = async(email) => {

  if (!req.body.email) {
    return false;
  }
	fs.readFile(path.join(__dirname, "../utils/emailFormat.html"), async(err, file) => {
    
		if (err)
			return console.log(err);
		const matchaHost = "http://localhost:3001/";
		// const matchaHost = "http://10.13.3.5:3001/";
		// const confirmationUrl = matchaHost + "api/confirmEmail/?cryptedUsername=" + cryptedUsername
		// const EmailFormat = file.toString().replace("ConfirmationLink", confirmationUrl);
    // console.log(file.toString());
		const email = process.env.EMAIL;
		const password = process.env.PASSWORD;
    	console.log({email, password});
		const from = "matcha@team.com";
		const EmailReciever = req.body.email;
		const subject = "X-Ray Notification";
		const text = "X-Ray";
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
			from : `Matcha <Matcha Team>`,
			to : EmailReciever,
			subject : subject,
			text : text,
			html : html,
		});
		return (true);
	});
}

module.exports = sendMail;