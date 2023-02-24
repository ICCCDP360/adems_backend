const express = require("express");
const router = express.Router();

const controller = require("../../controller/school principal/school");

router.get("/school",controller.GetSchool);
router.post("/school",controller.PostSchool);
router.get("/school/:id",controller.GetbyidSchool);
router.post("/signin",controller.SchoolLogin);


module.exports = router;
