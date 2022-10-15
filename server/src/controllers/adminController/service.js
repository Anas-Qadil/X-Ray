const serviceModel = require('../../models/serviceModel');
const traitementModel = require('../../models/traitementModel');
const person_traitementModel = require('../../models/person_traitementModel');
const moment = require('moment');

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

const getAllTraitements = async (req, res) => {
  try {
    let data = [];
    const traitements = await traitementModel.find();
    const person_traitement = await person_traitementModel.find();
    let i = 0;
    data = [...traitements, ...person_traitement];

    let lastMonthDose = 0;
    let lastWeekDose = 0;
    let lastyearDose = 0;

    let result = [];
    let doses = 0;
    data.map((doc) => {
      result.push(doc);
      doses += doc.dose;
    });

    result.map((doc) => {
      const DocDate = moment(doc.createdAt);
      const today = moment();
      const TodayMinusOneMonth = moment(today).subtract(1, 'month');
      const TodayMinusOneWeek = moment(today).subtract(1, 'week');
      const TodayMinusOneYear = moment(today).subtract(1, 'year');
      if (DocDate.isBetween(TodayMinusOneMonth, today)) {
        lastMonthDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneWeek, today)) {
        lastWeekDose += doc.dose;
      }
      if (DocDate.isBetween(TodayMinusOneYear, today)) {
        lastyearDose += doc.dose;
      }
    });



    return res.status(200).json({ data: result, doses, lastMonthDose, lastWeekDose, lastyearDose });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
	deleteService,
  getAllTraitements
}