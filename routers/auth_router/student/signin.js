const express = require("express");
const router = express.Router();

const controller = require("../../../controller/signin");

router.post("/signin", controller.PostSignin);

module.exports = router;
