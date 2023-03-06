const express = require("express");
const router = express.Router();

const controller = require("../../controller/student/details");

router.post("/onboardPost",controller.postOnBoard);

module.exports = router;