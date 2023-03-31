const express = require("express");
const router = express.Router();

const controller = require("../../controller/school principal/school");

router.get("/details", controller.getSchoolDetails);
router.post("/add-school", controller.addSchoolDetails);
router.get("/:id", controller.getByIdSchoolDetails);
router.post("/signin", controller.schoolAdminLogin);
router.get("/school/details/",controller.GetSchoolDetailsPagination);
router.get("/details_page/:id",controller.GetbyidSchoolDetailsPagination);

module.exports = router;
