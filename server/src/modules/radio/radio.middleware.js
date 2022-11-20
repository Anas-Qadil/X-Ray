const usersModel = require("../../models/usersModel");



const createRadio = async (req, res, next) => {
	try {
		const user = req.user;
		const data = req.body;
		if (!user || user.role !== "admin") return res.status(403).send("Forbidden");
		if (!data) return res.status(400).send({ message: "data is required" });
		if (!data.username) return res.status(400).send({ message: "username is required" });
		if (!data.password) return res.status(400).send({ message: "password is required" });
		if (!data.role) return res.status(400).send({ message: "role is required" });

		if (!data.region) return res.status(400).send({ message: "region is required" });
		if (!data.ville) return res.status(400).send({ message: "ville is required" });
		if (!data.statut) return res.status(400).send({ message: "statut is required" });
		if (!data.designation) return res.status(400).send({ message: "designation is required" });
		if (!data.address) return res.status(400).send({ message: "address is required" });
		const radio = await usersModel.findOne({
			username: data.username,
		})

		if (radio) return res.status(400).send({ message: "username already exists" });
		else next();
	} catch (e) {
		res.status(500).send(e.message);
	}
}

module.exports = {
	createRadio
}