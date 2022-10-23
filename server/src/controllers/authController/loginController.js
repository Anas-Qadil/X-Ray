const express = require("express");
const usersModel = require("../../models/usersModel");
const generateToken = require("../../utils/genToken");

const loginController = async (req, res, next) => {
	try {
    const token = generateToken({ payload: req.user });
    let user;
    if (req.user.role === "person") {
      user = await usersModel.findById(req.user.id)
        .populate("person")
      if (user) {
        if (user.person.type === "medical")
          await user.populate({
            path: "person",
            populate: {
              path: "hospital",
            }
          });
        else {
          await user.populate({
            path: "person",
            populate: {
              path: "company",
            }
          });
        }
      }
    } else user = req.user;
    
    if (token)
      return res.send({
        status: "success",
        message: "logged in successfully",
        token,
        user: user
      });
    return res.status(400).send({
      status: "failure",
      message: "could not log in"
    });
	} catch (e) {
		res.send({
			status: "error",
			message: e.message
		});
	}
}

module.exports = loginController;