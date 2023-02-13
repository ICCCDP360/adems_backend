const express = require("express");
const router = express.Router();

const controller = require("../../controllers/student_app/dashboard");

<<<<<<< HEAD:translate/routers/student-app/dash_board.js
router.get("/dashboard/content", controller.GetDashboard);
router.post("/dashboard/content", controller.PostDashboard);
=======
router.get("/dashboard", controller.GetDashboard); 
router.post("/dashboard", controller.PostDashboard);
>>>>>>> 0a8e3a22d0f55df26d0dc5557614a0a5d2c91742:translate/routers/student-app/Dashboard.js

module.exports = router;
