const express = require('express');
const controller = require('./radio.controller');
const middleware = require('./radio.middleware');

const router = express.Router();

router.get("/", controller.getRadio);

router.get("/:id", controller.getRadioByID);

router.post("/", middleware.createRadio, controller.createRadio);

router.put("/");

router.delete("/");

module.exports = router;
