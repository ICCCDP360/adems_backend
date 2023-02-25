const express = require("express");
const router = express.Router();

const controller = require("../../controller/school principal/school");

router.get("/details", controller.getSchoolDetails);
router.post("/add-school", controller.addSchoolDetails);
router.get("/:id", controller.getByIdSchoolDetails);
router.post("/signin", controller.schoolAdminLogin);

module.exports = router;
