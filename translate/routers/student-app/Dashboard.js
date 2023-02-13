const express = require("express");
const router = express.Router();

const controller = require("../../controllers/student_app/dashboard");

router.get("/dashboard", controller.GetDashboard); 
router.post("/dashboard", controller.PostDashboard);

module.exports = router;
