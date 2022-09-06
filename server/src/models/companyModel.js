const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
	region: {
    type: String,
    required: true,
    trim: true
  },
  ville: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
  }
}, { timestamps: true });

const companyModel = mongoose.model("companyModel", companySchema);

module.exports = companyModel;