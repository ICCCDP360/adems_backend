const express = require("express");
const mainTasksRouter = express.Router();
const RouterVideo = require("./Student tasks/video");
const RouterPdf = require("./Student tasks/pdf")
const RouterPractice = require("./Student tasks/practice")
const RouterAssessment = require("./Student tasks/assessment")
const RouterConcept = require("./Student tasks/concepts")
const RouterQues_answer= require("./Student tasks/que&ans")

mainTasksRouter.use("/video", RouterVideo);
mainTasksRouter.use("/pdf", RouterPdf);
mainTasksRouter.use("/practice",RouterPractice)
mainTasksRouter.use("/assessment",RouterAssessment)
mainTasksRouter.use("/concept",RouterConcept)
mainTasksRouter.use("/que&ans",RouterQues_answer)

module.exports = mainTasksRouter;
