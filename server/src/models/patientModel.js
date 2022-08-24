const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//@ remember to desing the schema well
const patientSchema = new Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	age: {
		type: Number,
	},
	gender: {
		type: String,
	},
	birthDate: {
		type: Date,
	},
	address: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	cin: {
		type: String,
	},
	poids: {
		type: Number,
	},
}, { timestamps: true });

const patientModel = mongoose.model("patientModel", patientSchema);

module.exports = patientModel;