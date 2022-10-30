const serviceModel = require('../../models/serviceModel');
const traitementModel = require('../../models/traitementModel');
const person_traitementModel = require('../../models/person_traitementModel');
const moment = require('moment');
const usersModel = require('../../models/usersModel');
const personModel = require('../../models/personModel');
const adminModel = require('../../models/adminModel');

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing id' });
    }

    await serviceModel.deleteOne({ _id: id });
    await traitementModel.deleteMany({ service: id });
    await person_traitementModel.deleteMany({ service: id });
    return res.status(200).json({ message: 'Service Deleted Successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

const getAllTraitements = async (req, res) => {
  try {
    let data = [];
    const traitements = await traitementModel.find()
      .populate({
        path: 'service',
        populate: {
          path: 'hospital',
        },
      })
      .populate('patient');
    const person_traitement = await person_traitementModel.find()
      .populate({
        path: 'service',
        populate: {
          path: 'hospital',
        },
      }).populate('person');
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

const getUltimateStatistics = async (req, res) => {
  try {
    const user = req.user;
    const stats = JSON.parse(req.query.stats);
    let data = [];

    let traitements = [];
    let person_traitement = [];
    if (stats.patient) {
      traitements = await traitementModel.find({ patient: stats.patient,
        createdAt: {
          $gte: moment(stats.startDate, "YYYY-MM-DD").toISOString(),
          $lte: moment(stats.endDate, "YYYY-MM-DD").toISOString(),
        }
      })
        .populate({
          path: 'service',
          populate: {
            path: 'hospital',
          },
        })
        .populate('patient');
    } else if (stats.person) {
      person_traitement = await person_traitementModel.find({ person: stats.person,
        createdAt: {
          $gte: moment(stats.startDate, "YYYY-MM-DD").toISOString(),
          $lte: moment(stats.endDate, "YYYY-MM-DD").toISOString(),
        }
      })
        .populate({
          path: 'service',
          populate: {
            path: 'hospital',
          },
        }).populate({
          path: 'person',
          populate: {
            path: 'hospital',
          },
        });
    } else {
      traitements = await traitementModel.find({
        createdAt: {
          $gte: moment(stats.startDate, "YYYY-MM-DD").toISOString(),
          $lte: moment(stats.endDate, "YYYY-MM-DD").toISOString(),
        }
      })
      .populate({
        path: 'service',
        populate: {
          path: 'hospital',
        },
      })
      .populate('patient');
      person_traitement = await person_traitementModel.find({
        createdAt: {
          $gte: moment(stats.startDate, "YYYY-MM-DD").toISOString(),
          $lte: moment(stats.endDate, "YYYY-MM-DD").toISOString(),
        }
      })
        .populate({
          path: 'service',
          populate: {
            path: 'hospital',
          },
        }).populate({
          path: 'person',
          populate: {
            path: 'hospital',
          },
        });
    }

    const combined = [...traitements, ...person_traitement];
    combined.map((doc) => {
      if (stats?.hospital) {
        if (doc?.service?.hospital?._id == stats?.hospital) {
          if (stats?.region) {
            if (doc?.service?.hospital?.region == stats?.region) {
              data.push(doc);
            }
          } else data.push(doc);
        }
      } else if (stats?.region) {
        if (doc?.service?.hospital?.region == stats?.region) {
          data.push(doc);
        }
      } else data.push(doc);
    });
    let data2 = [];
    data.map((doc) => {
      if (stats?.service) {
        if (doc?.service?._id == stats?.service) {
          if (stats?.appareil) {
            if (doc?.service?.equipment == stats?.appareil) {
              data2.push(doc);
            }
          } else data2.push(doc);
        }
      } else if (stats?.appareil) {
        if (doc?.service?.equipment == stats?.appareil) {
          data2.push(doc);
        }
      } else data2.push(doc);
    });
    let result = [];
    if (user.role === "company") {
      data2.map((doc) => {
        if (doc?.person?.company?.toString() == user?.company?.toString()) {
          result.push(doc);
        }
      });
    } else if (user.role === "hospital") {
      data2.map((doc) => {
        if (doc?.service?.hospital?._id.toString() == user?.hospital?.toString()) {
          result.push(doc);
        }
      });
    } else result = data2;

    res.send({ data: result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

const getUserHospital = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const user = await usersModel.findOne({
      hospital: id
    });

    res.send({ data: user });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

const getUserCompany = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const user = await usersModel.findOne({
      company: id
    });

    res.send({ data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

const getUserPatient = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const user = await usersModel.findOne({
      patient: id
    });

    res.send({ data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

const getUserPerson = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const user = await usersModel.findOne({
      person: id
    });

    res.send({ data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

const getHospitalMedicalPersons = async (req, res) => {
  try {
    const user = req.user;
    const hospitalId = String(user.hospital);

    const persons = await personModel.find({
      hospital: hospitalId
    });
    
    res.send({ data: persons });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}



const getAdminData = async (req, res) => {
  try {
    const user = req.user;
    const adminData = await adminModel.findOne({
      _id: user.admin
    });
    const data = Object.assign({}, adminData._doc);
    data.username = user.username;

    res.send({ data: data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
	deleteService,
  getAllTraitements,
  getUltimateStatistics,
  getUserHospital,
  getUserCompany,
  getUserPerson,
  getUserPatient,
  getHospitalMedicalPersons,
  getAdminData
}