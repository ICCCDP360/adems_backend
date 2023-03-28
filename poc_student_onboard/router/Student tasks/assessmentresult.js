const express = require("express");
const AssessmentResultRouter = express.Router();

const controller = require("../../controller/Student tasks/assessmentresult");

AssessmentResultRouter.get("/assessmentresult", controller.GetAssessmentRsult);
AssessmentResultRouter.post("/assessmentresult", controller.getAssesmentQuestionsByLanguageType);

module.exports = AssessmentResultRouter;