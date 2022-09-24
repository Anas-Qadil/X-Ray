const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companyModel = require("./companyModel");
const patientModel = require("./patientModel");
const hospitalModel = require("./hospitalModel");
const personModel = require("./personModel")

//@ remember to desing the schema well
const usersSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "patient", "hospital", "company", "person"],
		required: true,
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: "patientModel",
		default: null,
	},
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "hospitalModel",
		default: null,
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: "companyModel",
		default: null,
	},
	person: {
		type: Schema.Types.ObjectId,
		ref: "personModel",
		default: null,
	}, 
	admin: {
		type: Schema.Types.ObjectId,
		ref: "adminModel",
		default: null,
	}
}, { timestamps: true });

const usersModel = mongoose.model("usersModel", usersSchema);

module.exports = usersModel;