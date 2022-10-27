const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hospitalModel = require("./hospitalModel");

//@ remember to desing the schema well
const patientSchema = new Schema({
	firstName: {
		type: String,
    required: true,
    trim: true,
	},
	lastName: {
		type: String,
    required: true,
    trim: true,
	},
	age: {
		type: Number,
    required: true,
	},
	gender: {
		type: String,
    enum: ['male', 'female'],
    required: true,
	},
	birthDate: {
		type: Date,
    required: true,
	},
	address: {
		type: String,
    trim: true
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
	}
}, { timestamps: true });

const patientModel = mongoose.model("patientModel", patientSchema);

module.exports = patientModel;