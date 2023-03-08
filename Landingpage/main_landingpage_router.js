const express = require("express");
const mainLandingpageRouter = express.Router();
const RouterContactus = require("./router/contactus");

mainLandingpageRouter.use("/contactus", RouterContactus);

module.exports = mainLandingpageRouter;
