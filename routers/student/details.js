const express = require("express");
const router = express.Router();

const controller = require("../../controller/student/details");

router.get("/details", controller.getStudentDetails);
router.post("/register", controller.addStudentDetails);
router.put("/details/:id", controller.updateStudentDetail);
router.get("/details/:id", controller.getByIdStudentDetails);
router.get("/profile/:id", controller.getProfileDetails);

module.exports = router;
