const express = require("express");
const mainTranslateRouter = express.Router();
const RouterDashboard = require("./student-app/Dashboard");
const RouterSidebar = require("./student-app/Sidebar");

mainTranslateRouter.use("/dashboard", RouterDashboard);
mainTranslateRouter.use("/sidebar", RouterSidebar);

module.exports = mainTranslateRouter;
