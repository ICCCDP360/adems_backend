const express = require("express");
const AssessmentResultRouter = express.Router();

const controller = require("../../controller/Student tasks/assessmentresult");

AssessmentResultRouter.get("/assessmentresult", controller.GetAssessmentResult);
AssessmentResultRouter.post("/assessmentresult", controller.PostAssessmentResult);
AssessmentResultRouter.get("/assessmentresult/student/:student_id", controller.GetbystudentidAssessmentResult);
AssessmentResultRouter.get("/assessmentresult/student_page/:student_id", controller.GetbystudentidAssessmentResultPagination);


module.exports = AssessmentResultRouter;