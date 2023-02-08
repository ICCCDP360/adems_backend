const express = require("express");
const mainRouter = express.Router();

const AccountHolderRouter = require("./student/account_holder");
const DetailsRouter = require("./student/details");
const TeacherRouter = require("./teacher/teacher_details");
const SchoolRouter = require("./schoolPrincipal/school");
const RouterSignin = require("./Sign in/signin");
//sample router
mainRouter.get("/", (req, res) => {
  res.status(200).json({ title: "admes & cdp360 backend", version: "v1.0.0" });
});
 
mainRouter.use(AccountHolderRouter);  
mainRouter.use(DetailsRouter);  //for student
mainRouter.use(TeacherRouter);  
mainRouter.use(SchoolRouter);
mainRouter.use(RouterSignin);   

module.exports = mainRouter;
