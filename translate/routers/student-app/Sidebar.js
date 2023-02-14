const express = require("express");
const SidebarRouter = express.Router();

const controller = require("../../controllers/student_app/sidebar");

SidebarRouter.get("/content", controller.GetSidebar);
SidebarRouter.post("/content", controller.PostSidebar);

module.exports = SidebarRouter;
