const mongoose = require("mongoose");
const schema = mongoose.Schema;

const radioSchema = new schema({
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
	address: {
		type: String,
		trim: true,
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

const radioModel = mongoose.model("radioModel", radioSchema);

module.exports = radioModel;