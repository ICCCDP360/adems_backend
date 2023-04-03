const express = require("express");
const IssuesRouter = express.Router();

const controller = require("../../controller/Student tasks/issues");

IssuesRouter.get("/issues", controller.GetIssues);
IssuesRouter.post("/issues", controller.PostIssues);
IssuesRouter.get("/issues/student/:student_id", controller.GetbystudentidIssues);
IssuesRouter.get("/issues/student_page/:student_id", controller.GetbystudentidIssuesPagination);


module.exports = IssuesRouter;