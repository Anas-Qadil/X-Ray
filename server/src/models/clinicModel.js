const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clinicSchema = new schema({
	region: {
		type: String,
    trim: true,
		required: true,
	},
	address: {
		type: String,
		trim: true,
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
	},
	email: {
		type: String,
    trim: true,
	},
}, { timestamps: true });

const clinicModel = mongoose.model("clinicModel", clinicSchema);

module.exports = clinicModel;