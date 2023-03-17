const express = require("express");
const router = express.Router();

const controller = require("../../../controller/signin");

//check phone number
router.post("/check-account", controller.CheckAccount);
router.post("/verify-account", controller.VerifyAccount);
router.post("/select-account", controller.SelectAccount);
router.post("/set-passcode", controller.SetPasscode);
router.post("/signin", controller.StudentLogin);
// refertoken router
router.post("/refreshtoken", controller.refreshToken);
router.post("/change-passcode", controller.ChangePasscode);

module.exports = router;
