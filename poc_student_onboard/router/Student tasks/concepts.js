const express = require("express");
const ConceptRouter = express.Router();

const controller = require("../../controller/Student tasks/concept");

ConceptRouter.get("/concept", controller.GetConcept);


module.exports = ConceptRouter;
