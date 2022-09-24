const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
	phone: {
		type: String,
    required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	cin: {
		type: String,
    required: true,
    unique: true,
	}
}, { timestamps: true });

const adminModel = mongoose.model("adminModel", adminSchema);

module.exports = adminModel;