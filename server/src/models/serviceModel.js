const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersModel = require("./usersModel");
const companyModel = require("./companyModel");

//@ remember to desing the schema well
const serviceSchema = new Schema({
	name: {
		type: String,
	},
	equipment: {
		type: String,
	},
	examen: {
		type: String,
	},
	protocol: {
		type: String,
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
}, { timestamps: true });

const serviceModel = mongoose.model("serviceModel", serviceSchema);

module.exports = serviceModel;
