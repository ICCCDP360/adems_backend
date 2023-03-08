const express = require("express");
const ContactusRouter = express.Router();

const controller = require("../../Landingpage/controller/contactUs");

ContactusRouter.get("/contactUs", controller.GetContactus);
ContactusRouter.post("/contactUs", controller.PostContactus);

module.exports = ContactusRouter;
