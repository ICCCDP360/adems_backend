const express = require("express");
const router = express.Router();

const controller = require("../../controller/school");

router.get("/school",controller.GetSchool);
router.post("/school",controller.PostSchool);
router.get("/school/:id",controller.GetbyidSchool);

module.exports = router;
