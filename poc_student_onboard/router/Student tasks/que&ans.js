const express = require("express");
const Question_answerRouter = express.Router();

const controller = require("../../controller/Student tasks/que&Ans");

Question_answerRouter.get("/que&ans", controller.GetQuestion_answer);
Question_answerRouter.post("/que&ans", controller.PostQuestion_answer);


module.exports = Question_answerRouter;