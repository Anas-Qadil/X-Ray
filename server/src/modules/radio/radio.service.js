const mongoose = require("mongoose");
const radioModel =require("../../models/radioModel.js");
const cryptPassword = require("../../utils/cryptPassword");

module.exports = class RadioService {
	getRadioById = async (id) => {
		const radio = await mongoose.model("radioModel").findById(id);
		return radio;
	}

	createRadio = async (radio) => {
		const newRadio = await mongoose.model("radioModel").create(radio);
		const cryptedPassword = await cryptPassword(radio.password);
		const radioUser = await mongoose.model("usersModel").create({
			username: radio.username,
			password: cryptedPassword,
			role: "radio",
			radio: newRadio._id,
		});

		await radioUser.save();
		await newRadio.save();
		return (newRadio);
	}

}