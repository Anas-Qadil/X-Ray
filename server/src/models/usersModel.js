const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
		enum: ["admin", "patient", "hospital"],
		required: true,
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: "patientModel",
		default: null,
		required: true,
	},
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "hospitalModel",
		default: null,
		required: true,
	},
}, { timestamps: true });

const usersModel = mongoose.model("usersModel", usersSchema);

module.exports = usersModel;