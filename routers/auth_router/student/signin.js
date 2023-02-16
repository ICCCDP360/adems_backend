const express = require("express");
const router = express.Router();

const controller = require("../../../controller/signin");

//check phone number
router.post("/check-account", controller.CheckAccount);
router.post("/signin", controller.PostSignin);

module.exports = router;
