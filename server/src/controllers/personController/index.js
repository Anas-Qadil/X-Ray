const personModel = require("../../models/personModel");
const usersModel = require("../../models/usersModel");

const deletePerson = async (req, res, next) => {
	try {
    const data = req.params;
    const user = await usersModel.findOne({ username: data.username });
    if (!user) {
      return res.status(404).send({
        status: "failure",
        message: "user not found"
      });
    }
    const person = await personModel.findById(user.person);
    if (!person) {
      return res.status(404).send({
        status: "failure",
        message: "person not found"
      });
    }
    const deletedPerson = await personModel.findByIdAndDelete(person._id);
    if (!deletedPerson) {
      return res.status(500).send({
        status: "failure",
        message: "person not deleted"
      });
    }
    const deletedUser = await usersModel.findByIdAndDelete(user._id);
    if (!deletedUser) {
      return res.status(500).send({
        status: "failure",
        message: "user not deleted"
      });
    }
    res.status(200).send({
      status: "success",
      message: "person deleted successfully"
    }); 
  } catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
}

module.exports = {
	deletePerson
}