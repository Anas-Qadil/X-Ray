const RadioService = require("./radio.service.js");
const cryptPassword = require("../../utils/cryptPassword");

const getRadio = async (req, res) => {
	try {
		const user = req.user;
		if (!user || !user.radio) return res.status(403).send("Forbidden");

		const radio = await new RadioService().getRadioById(user.radio);
		res.send({
			data: radio
		});

	} catch (e) {
		res.status(500).send(e.message);
	}
}

const getRadioByID = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) return res.status(400).send({ message: "id is required" });

		const radio = await new RadioService().getRadioById(id);
		res.send({
			data: radio
		});
	} catch (e) {
		res.status(500).send(e.message);
	}
}

const createRadio = async (req, res) => {
	try {
		const radio = await new RadioService().createRadio(req.body);
		res.send({
			data: radio
		});
	} catch (e) {
		res.status(500).send(e.message);
	}
}

module.exports = {
	getRadio,
	createRadio,
	getRadioByID
}