const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const personSchema = new Schema({
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
  cin: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  age: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    default: null,
    trim: true,
  },
  secteur: {
    type: String,
    required: true,
    trim: true,
  },
  fonction: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["technical", "medical"],
    required: true,
    trim: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "companyModel",
    default: null,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "hospitalModel",
    default: null,
  }
}, { timestamps: true });

const personModel = mongoos.model("personModel", personSchema);

module.exports = personModel;