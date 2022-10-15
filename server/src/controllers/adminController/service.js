const serviceModel = require('../../models/serviceModel');

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing id' });
    }

    await serviceModel.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Service Deleted Successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
	deleteService,
}