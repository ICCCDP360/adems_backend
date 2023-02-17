const express = require("express");
const router = express.Router();

const controller = require("../../../controller/signin");
const verifyToken = require("../../../middleware/jwt_token")

//check phone number
router.post("/check-account", controller.CheckAccount);
router.post("/verify-account", controller.VerifyAccount);
router.post("/select-account", controller.SelectAccount);
router.post("/set-passcode", controller.SetPasscode);
router.post("/signin", controller.StudentLogin);

module.exports = router;
