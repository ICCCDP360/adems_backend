const express = require("express");
const AssessmentRouter = express.Router();

const controller = require("../../controller/Student tasks/assessment");

AssessmentRouter.post("/assessment", controller.PostAssessment);
AssessmentRouter.get("/assessment/:id", controller.GetbyidAssessment);
AssessmentRouter.get("/assessment", controller.GetAssessment);
AssessmentRouter.post("/assessmentquestions", controller.getAssesmentQuestionsByLanguageType);

module.exports = AssessmentRouter;
