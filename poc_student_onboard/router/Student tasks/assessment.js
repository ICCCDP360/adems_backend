const express = require("express");
const AssessmentRouter = express.Router();

const controller = require("../../controller/Student tasks/assessment");

AssessmentRouter.post("/assessment", controller.PostAssessment);
AssessmentRouter.get("/assessment/:id", controller.GetbyidAssessment);
AssessmentRouter.get("/assessment", controller.GetAssessment);
AssessmentRouter.post("/assessmentquestions", controller.getAssesmentQuestionsByLanguageType);
AssessmentRouter.get("/assessment_page",controller.GetAssessmentPagination);
AssessmentRouter.get("/assessment_page/:id",controller.GetbyidAssessmentPagination)

module.exports = AssessmentRouter;
