const express = require("express");
const router = express.Router();

const controller = require("../../controllers/student_app/dashboard");

router.get("/content", controller.GetDashboard);
router.post("/content", controller.PostDashboard);

module.exports = router;
