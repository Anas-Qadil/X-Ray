const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hospitalSchema = new schema({
	name: {
		type: String,
    trim: true,
    default: ""
	},
	region: {
		type: String,
    trim: true,
		required: true,
	},
	ville:	{
		type: String,
    trim: true,
		required: true,
	},
	statut: {
		type: String,
    trim: true,
		required: true,
	},
	designation: {
		type: String,
    trim: true,
		required: true,
	},
	phone: {
		type: String,
    trim: true,
		required: true,
	},
	email: {
		type: String,
    trim: true,
	},
}, { timestamps: true });

const hospitalModel = mongoose.model("hospitalModel", hospitalSchema);

module.exports = hospitalModel;