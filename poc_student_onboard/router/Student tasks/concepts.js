const express = require("express");
const ConceptRouter = express.Router();

const controller = require("../../controller/Student tasks/concept");

ConceptRouter.get("/concept", controller.GetConcept);
ConceptRouter.post("/concept",controller.PostConcept);
ConceptRouter.get("/concept/:id",controller.GetbyidConcept)
ConceptRouter.get("/conceptPdf/:id", controller.GetbyidConceptPdf);
ConceptRouter.get("/conceptAssessment/:id", controller.GetbyidConceptAssessment);
ConceptRouter.get("/conceptVideo/:id", controller.GetbyidConceptVideo);
ConceptRouter.get("/conceptPractice/:id", controller.GetbyidConceptPractice);
ConceptRouter.get("/conceptBySchool", controller.GetConceptBySchId);
ConceptRouter.get("/conceptPage",controller.GetConceptpagination);
ConceptRouter.get("/conceptSchoolPage",controller.GetConceptSchoolPagination);


module.exports = ConceptRouter;
