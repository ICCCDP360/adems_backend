const express = require("express");
const mainTasksRouter = express.Router();
const RouterVideo = require("./Student tasks/video");
const RouterPdf = require("./Student tasks/pdf")
const RouterPractice = require("./Student tasks/practice")
const RouterAssessment = require("./Student tasks/assessment")

mainTasksRouter.use("/video", RouterVideo);
mainTasksRouter.use("/pdf", RouterPdf);
mainTasksRouter.use("/practice",RouterPractice)
mainTasksRouter.use("/assessment",RouterAssessment)


module.exports = mainTasksRouter;
