const express = require("express");
const PracticeRouter = express.Router();

const controller = require("../../controller/Student tasks/practice");

PracticeRouter.post("/practice", controller.PostPractice);
PracticeRouter.get("/practice/:id", controller.GetbyidPractice);
PracticeRouter.get("/practice", controller.GetPractice);
PracticeRouter.get("/getPracticeQuestion", controller.GetPracticeQuestion);
PracticeRouter.get("/practice_page",controller.GetPracticePagination)
PracticeRouter.get("practice_page/:id",controller.GetbyidPracticePagination)


module.exports = PracticeRouter;