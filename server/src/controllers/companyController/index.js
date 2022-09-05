const express = require("express");

const getCurrentCompany = async (req, res, next) => {
	try {
    const data = req.query;

    if (data.id) {
      const company = await companyModel.findById(data.id);
      if (!company) {
        return res.status(400).json({
          status: "failure",
          message: "Company not found"
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Company found",
        data: company
      });
    }
    if (username) {
      const user = await usersModel.findOne({ username: data.username })
      .populate("company");
      if (!user) {
        return res.status(400).json({
          status: "failure",
          message: "User not found"
        });
      }
      if (!user.company)
      {
        return res.status(400).send({
          status: "failure",
          message: "Company not found"
        })
      }
      return res.status(200).json({
        status: "success",
        message: "Company found",
        data: user.company
      });
    }

	} catch(e) {
		return res.status(500).send({
			status: "failure",
			message: e.message
		});
	}
}

module.exports = {
  getCurrentCompany
}