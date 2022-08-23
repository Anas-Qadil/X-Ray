const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(URI);
		console.log(`MongoDB Connected Successfully`);
	} catch (e)
	{
		console.error(e);
		process.exit(1);
	}
}

module.exports = connectDB;