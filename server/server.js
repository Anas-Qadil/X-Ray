const express = require("express");
const dotenv = require("dotenv").config()
const router = require("./src/routes/index");
const connectDB = require("./src/configs/db");
const test = require("./test/index");
const cors = require("cors");
const helmet = require("helmet");

const sendSms = require("./src/services/smsService");
const sendMail = require("./src/services/emailService");

// @configs
const app = express();
connectDB();
app.use(cors()); // dont forget to make only the front end can access this api
app.use(helmet()); // for security and check it out after project is done
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/sendsms", sendSms);
// app.post("/sendemail", sendMail);

app.use("/test", test);
app.use("/api", router);
app.use("/", (req, res) => {
	res.send(`[ ${req.method} ] Route [ ${req.path} ] not found`);
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));