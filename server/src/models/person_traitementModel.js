const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traitementSchema = new Schema({
	person: {
		type: Schema.Types.ObjectId,
		ref: "personModel",
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

const person_traitementModel = mongoose.model("person_traitementModel", traitementSchema);

module.exports = person_traitementModel;