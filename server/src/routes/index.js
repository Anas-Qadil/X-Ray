const express = require("express");
const router = express.Router();
const signUpRoute = require("./authRouter/signUpRouter");
const loginRoute = require("./authRouter/loginRouter");

router.post("/sign-up", signUpRoute);
router.post("/login", loginRoute);

module.exports = router;