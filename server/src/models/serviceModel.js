const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersModel = require("./usersModel");
const companyModel = require("./companyModel");

//@ remember to desing the schema well
const serviceSchema = new Schema({
	name: {
		type: String,
    required: true,
    trim: true
	},
	equipment: {
		type: String,
    required: true,
    trim: true
	},
	examen: {
		type: String,
    required: true,
    trim: true
	},
	protocol: {
		type: String,
    required: true,
    trim: true
	},
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "hospitalModel",
    required: true,
    default: null
  },
}, { timestamps: true });

const serviceModel = mongoose.model("serviceModel", serviceSchema);

module.exports = serviceModel;
