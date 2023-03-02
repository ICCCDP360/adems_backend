const express = require("express");
const mainRouter = express.Router();

const AccountHolderRouter = require("./student/account_holder");
const DetailsRouter = require("./student/details");
const TeacherRouter = require("./teacher/teacher_details");
const SchoolRouter = require("./schoolPrincipal/school");
const AuthRouter = require("./auth_router/student/signin");
const TranslateRouter = require("../translate/routers/main_translate_router");
const TasksRouter = require("../Tasks/router/main_Tasks_router")

mainRouter.use("/student", AccountHolderRouter);
mainRouter.use("/student", DetailsRouter); //for student
mainRouter.use("/teacher", TeacherRouter);
mainRouter.use("/school", SchoolRouter);
mainRouter.use("/student", AuthRouter);
mainRouter.use("/student", TranslateRouter);
mainRouter.use("/tasks",TasksRouter)

module.exports = mainRouter;
