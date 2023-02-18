const express = require("express");
const router = express.Router();

const controller = require("../../controller/teacherDetails");

router.get("/teacherDetails", controller.GetTeacherDetails);
router.post("/teacherDetails", controller.PostTeacherDetails);
router.put("/teacherDetails/:id", controller.PutTeacherDetails);
router.delete("/teacherDetails/:id", controller.DeleteTeacherDetails);
router.get("/teacherDetails/:id", controller.GetbyidTeacherDetails);

module.exports = router;
