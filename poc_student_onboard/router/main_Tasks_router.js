const express = require("express");
const mainTasksRouter = express.Router();
const RouterVideo = require("./Student tasks/video");
const RouterPdf = require("./Student tasks/pdf")
const RouterPractice = require("./Student tasks/practice")
const RouterAssessment = require("./Student tasks/assessment")
const RouterConcept = require("./Student tasks/concepts")
const RouterQue_ans= require("./Student tasks/que_ans")
const RouterMytask =require("./Student tasks/myTask")

mainTasksRouter.use("/video", RouterVideo);
mainTasksRouter.use("/pdf", RouterPdf);
mainTasksRouter.use("/practice",RouterPractice)
mainTasksRouter.use("/assessment",RouterAssessment)
mainTasksRouter.use("/concept",RouterConcept)
mainTasksRouter.use("/que_ans",RouterQue_ans)
mainTasksRouter.use("/mytask",RouterMytask)

module.exports = mainTasksRouter;
