const express =require("express");
const router = express.Router();

const controller = require("../../controller/dashboard");

router.get("/dashboard",controller.GetDashboard);
router.post("/dashboard",controller.PostDashboard);

module.exports = router;