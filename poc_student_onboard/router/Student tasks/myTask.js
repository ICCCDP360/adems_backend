const express = require("express");
const MytaskRouter = express.Router();

const controller = require("../../controller/Student tasks/mytask");

MytaskRouter.get("/mytask", controller.GetMytask);
MytaskRouter.post("/mytask",controller.PostMytask);
MytaskRouter.get("/mytask/:id",controller.GetbyidMytask)
MytaskRouter.get("/mytask/:stu_id", controller.GetbyidMytask);
MytaskRouter.get("/completed/:stu_id",controller.GetbyidCompleted)


module.exports = MytaskRouter;
