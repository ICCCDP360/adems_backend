const express = require("express");
const MytaskRouter = express.Router();

const controller = require("../../controller/Student tasks/mytask");

MytaskRouter.get("/mytask", controller.GetMytask);
MytaskRouter.post("/mytask",controller.PostMytask);
MytaskRouter.get("/mytask/:id",controller.GetbyidMytask)
MytaskRouter.get("/mytask/mystudent/:stu_id", controller.GetbyidStudentMytask);
MytaskRouter.get("/completed/:stu_id",controller.GetbyidCompleted)
MytaskRouter.get("/mytask_page",controller.GetMytaskPagination)
MytaskRouter.get("/student_page/:stu_id",controller.GetbyidStudentMytaskPagination)
MytaskRouter.get("/complete_page/:stu_id",controller.GetbyidCompletedPagination)


module.exports = MytaskRouter;
