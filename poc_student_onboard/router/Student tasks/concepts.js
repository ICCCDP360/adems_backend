const express = require("express");
const ConceptRouter = express.Router();

const controller = require("../../controller/Student tasks/concept");

ConceptRouter.get("/concept", controller.GetConcept);
ConceptRouter.post("/concept",controller.PostConcept);
ConceptRouter.get("/concept/:id",controller.GetbyidConcept)
ConceptRouter.post("/conceptPdf", controller.GetbyidConceptPdf);
ConceptRouter.post("/conceptAssessment", controller.GetbyidConceptAssessment);
ConceptRouter.post("/conceptVideo", controller.GetbyidConceptVideo);
ConceptRouter.post("/conceptPractice", controller.GetbyidConceptPractice);


module.exports = ConceptRouter;
