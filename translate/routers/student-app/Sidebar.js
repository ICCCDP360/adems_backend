const express = require("express");
const SidebarRouter = express.Router();

const controller = require("../../controllers/student_app/sidebar");

SidebarRouter.get("/sidebar/content", controller.GetSidebar);
SidebarRouter.post("/sidebar/content", controller.PostSidebar);

module.exports = SidebarRouter;
