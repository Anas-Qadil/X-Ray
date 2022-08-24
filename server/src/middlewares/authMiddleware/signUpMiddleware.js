const express = require("express");
const validator = require('validator');

const signUpMiddleware = async (req, res, next) => {
	console.log("middleware runs");
	next();
}

const patientMiddleware = async (req, res, next) => {
	const data = req.body;
	console.log(data);

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

	} else {
    return res.status(400).json({
      message: "patient data is required"
    });
  }
	next();
}

module.exports = {
	signUpMiddleware,
	patientMiddleware,
}