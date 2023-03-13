const express = require("express");
const mainLandingpageRouter = express.Router();
const ContactusRouter = require("./router/contactus");

mainLandingpageRouter.use("/contactus", ContactusRouter);

module.exports = mainLandingpageRouter;
