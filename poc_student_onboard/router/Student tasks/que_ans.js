const express = require("express");
const Que_ansRouter = express.Router();

const controller = require("../../controller/Student tasks/que_Ans");

Que_ansRouter.get("/que_Ans", controller.GetQue_ans);
Que_ansRouter.post("/que_Ans", controller.PostQue_ans);
Que_ansRouter.get("/que&ans_page",controller.GetQue_ansPagination)

module.exports = Que_ansRouter;