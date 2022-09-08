const express = require("express");
const validator = require('validator');
const patientModel = require("../../models/patientModel");
const usersModel = require("../../models/usersModel");
const personModel = require("../../models/personModel");

const signUpMiddleware = async (req, res, next) => {
	console.log("middleware runs");
	next();
}

//@checker Middleware
const patientMiddleware = async (req, res, next) => {
	const data = req.body;

	//@data checker
	if (data)
	{
		//@validate firstName
		if (data.firstName)
		{
			if (typeof data.firstName !== "string")
			{
				return res.status(400).json({
					message: "firstName must be a string"
				});
			}
			else if (data.firstName.length < 3)
			{
				return res.status(400).json({
					message: "firstName must be at least 3 characters long"
				});
			}
			else if (data.firstName.length > 30)
			{
				return res.status(400).json({
					message: "firstName must be less than 30 characters long"
				});
			}
		} else {
      return res.status(400).json({
        message: "firstName is required"
      });
    }

		//@validate lastName
		if (data.lastName)
		{
			if (typeof data.lastName !== "string")
			{
				return res.status(400).json({
					message: "lastName must be a string"
				});
			}
			else if (data.lastName.length < 3)
			{
				return res.status(400).json({
					message: "lastName must be at least 3 characters long"
				});
			}
			else if (data.lastName.length > 30)
			{
				return res.status(400).json({
					message: "lastName must be less than 30 characters long"
				});
			}
		} else {
      return res.status(400).json({
        message: "lastName is required"
      });
    }

    //@validate age
    if (data.age)
    {
      if (typeof data.age !== "number")
      {
        return res.status(400).json({
          message: "age must be a number"
        });
      }
      else if (data.age < 0)
      {
        return res.status(400).json({
          message: "age must be positive"
        });
      }
      else if (data.age > 120)
      {
        return res.status(400).json({
          message: "age must be less than 120"
        });
      }
    } else {
      return res.status(400).json({
        message: "age is required"
      });
    }

    //@validate poids
    if (data.poids)
    {
      if (typeof data.poids !== "number")
      {
        return res.status(400).json({
          message: "poids must be a number"
        });
      }
      else if (data.poids < 0)
      {
        return res.status(400).json({
          message: "poids must be positive"
        });
      }
      else if (data.poids > 500)
      {
        return res.status(400).json({
          message: "poids must be less than 500"
        });
      }
    }

    //@validate address
    if (data.address)
    {
      if (typeof data.address !== "string")
      {
        return res.status(400).json({
          message: "address must be a string"
        });
      }
      else if (data.address.length < 3)
      {
        return res.status(400).json({
          message: "address must be at least 3 characters long"
        });
      }
      else if (data.address.length > 150)
      {
        return res.status(400).json({
          message: "address must be less than 150 characters long"
        });
      }
    } else {
      return res.status(400).json({
        message: "address is required"
      });
    }


    //@validate phone
    if (data.phone)
    {
      if (typeof data.phone !== "string")
      {
        return res.status(400).json({
          message: "phone must be a string"
        });
      }
      else if (data.phone.length < 10)
      {
        return res.status(400).json({
          message: "phone must be at least 10 characters long"
        });
      }
      else if (data.phone.length > 10)
      {
        return res.status(400).json({
          message: "phone must be less than 10 characters long"
        });
      }
      const phone = await patientModel.findOne({ phone: data.phone });
      if (phone)
      {
        console.log(phone);
        return res.status(400).json({
          message: "phone already exists"
        });
      }
    } else {
      return res.status(400).json({
        message: "phone is required"
      });
    }

    //@validate email
    if (data.email)
    {
      if (typeof data.email !== "string")
      {
        return res.status(400).json({
          message: "email must be a string"
        });
      }
      else if (!validator.isEmail(data.email))
      {
        return res.status(400).json({
          message: "email must be a valid email"
        });
      }
      const email = await patientModel.findOne({ email: data.email });
      if (email)
      {
        return res.status(400).json({
          message: "email already exists"
        });
      }
    }

    //@validate birthDate
    if (data.birthDate)
    {
      if (typeof data.birthDate !== "string")
      {
        return res.status(400).json({
          message: "birthDate must be a string"
        });
      }
      else if (!validator.isISO8601(data.birthDate))
      {
        return res.status(400).json({
          message: "birthDate must be a valid date"
        });
      }
    }

    //@validate gender
    if (data.gender) {
      if (typeof data.gender === "string")
      {
        if (data.gender !== "male" && data.gender !== "female")
        {
          return res.status(400).json({
            message: "gender must be male or female"
          })
        }
      } else {
        return res.status(400).json({
          message: "gender must be a string"
        });
      }
    } else {
      return res.status(400).json({
        message: "gender is required"
      });
    }

    //@validate cin
    if (data.cin)
    {
      if (typeof data.cin !== "string")
      {
        return res.status(400).json({
          message: "cin must be a string"
        });
      }
      else if (data.cin.length < 3)
      {
        return res.status(400).json({
          message: "cin must be at least 3 characters long"
        });
      }
      else if (data.cin.length > 20)
      {
        return res.status(400).json({
          message: "cin must be less than 20 characters long"
        });
      }
    }

    // @validate hospital
    if (!data.hospital) {
      return res.status(400).send({
        status: "failure",
        message: "hospital is required"
      });
    }

	} else {
    return res.status(400).json({
      message: "patient data is required"
    });
  }
	next();
}

// @company validation

const companyMiddleware = async (req, res, next) => {
  try {
    const data = req.body;
    if (data)
    {
      if (!data.region)
      {
        return res.status(400).json({
          status: "failure",
          message: "region is required"
        });
      }
      if (!data.ville)
      {
        return res.status(400).send({
          status: "failure",
          message: "ville is required"
        });
      }
      if (!data.designation)
      {
        return res.status(400).send({
          status: "failrue",
          message: "designation is required"
        });
      }
      if (!data.phone)
      {
        return res.status(400).send({
          status: "failure",
          message: "phone is required"
        });
      }
      if (!data.username)
      {
        return res.status(400).send({
          status: "failure",
          message: "username is required"
        });
      } else {
        const user = await usersModel.findOne({ username: data.username });
        if (user)
        {
          return res.status(400).send({
            status: "failure",
            message: "username already exists"
          });
        }
      }
      if (!data.password)
      {
        return res.status(400).send({
          status: "failure",
          message: "password is required"
        })
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "invalid data"
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message
    })
  }
}

const signUpPersonMiddleware = async (req, res, next) => {
  try {
    const data = req.body;
    if (data)
    {
      //check if user has access to create person
      if (data.role !== "admin" && data.role !== "company") {
        return res.status(400).send({
          status: "failure",
          message: "you don't have access to create person"
        });
      }
      // check if person data exists
      if (!data.firstName) {
        return res.status(400).send({
          status: "failure",
          message: "firstName is required"
        });
      }
      if (!data.lastName) {
        return res.status(400).send({
          status: "failure",
          message: "lastName is required"
        });
      }
      if (!data.cin) {
        return res.status(400).send({
          status: "failure",
          message: "cin is required"
        });
      } else {
        const cin = await personModel.findOne({ cin: data.cin });
        if (cin) {
          return res.status(400).send({
            status: "failure",
            message: "cin already exists"
          });
        }
      }
      if (!data.gender) {
        return res.status(400).send({
          status: "failure",
          message: "gender is required"
        });
      }
      if (!data.birthDate) {
        return res.status(400).send({
          status: "failure",
          message: "birthDate is required"
        });
      }
      if (!data.age) {
        return res.status(400).send({
          status: "failure",
          message: "age is required"
        });
      }
      if (!data.address) {
        return res.status(400).send({
          status: "failure",
          message: "address is required"
        });
      }
      if (!data.phone) {
        return res.status(400).send({
          status: "failure",
          message: "phone is required"
        });
      } else {
        const phone = await personModel.findOne({ phone: data.phone });
        if (phone) {
          return res.status(400).send({
            status: "failure",
            message: "phone already exists"
          });
        }
      }
      if (!data.secteur) {
        return res.status(400).send({
          status: "failure",
          message: "secteur is required"
        });
      }
      if (!data.fonction) {
        return res.status(400).send({
          status: "failure",
          message: "fonction is required"
        });
      }

      // check if username already exists
    if (data.username)
    {
      const user = usersModel.findOne({ username: data.username });
      if (user) {
        return res.status(400).send({
          status: "failure",
          message: "username already exists"
        });
      }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "username is required"
      });
    }
    if (!data.password) {
      return res.status(400).send({
        status: "failure",
        message: "password is required"
      });
    }
    } else {
      return res.status(400).send({
        status: "failure",
        message: "invalid data"
      });
    }
    next();
  } catch(e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    })
  }
  next();
}

module.exports = {
	signUpMiddleware,
	patientMiddleware,
  companyMiddleware,
  signUpPersonMiddleware
}