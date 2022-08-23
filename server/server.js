const express = require("express");
const dotenv = require("dotenv").config()
const router = require("./src/routes/index");
const connectDB = require("./src/configs/db");

// @configs
connectDB();
const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/", (req, res) => {
	res.send("Route not found");
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));