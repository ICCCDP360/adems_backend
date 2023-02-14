const express = require("express");
const CourseRouter = express.Router();

const controller = require("../../controllers/student_app/sidebar");

CourseRouter.get("/content", controller.GetCourse);
CourseRouter.post("/content", controller.PostCourse);

module.exports = CourseRouter;
