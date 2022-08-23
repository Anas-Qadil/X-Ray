const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
	}
}, { timestamps: true });

const serviceModel = mongoose.model("serviceModel", serviceSchema);

module.exports = serviceModel;
