const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traitementSchema = new Schema({
	patient: {
		type: Schema.Types.ObjectId,
		ref: "patientModel",
    required: true,
    default: null,
	},
  service: {
    type: Schema.Types.ObjectId,
    ref: "serviceModel",
    required: true,
    default: null
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  dose: {
    type: Number,
    required: true,
    default: 0
  },
}, { timestamps: true });

const traitementModel = mongoose.model("traitementModel", traitementSchema);

module.exports = traitementModel;