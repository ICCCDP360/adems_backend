const express = require("express");
const router = express.Router();

const controller = require("../../controllers/student_app/dashboard");

router.get("/dashboard/content", controller.GetDashboard);
router.post("/dashboard/content", controller.PostDashboard);

module.exports = router;
