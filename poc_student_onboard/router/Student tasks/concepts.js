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
// ConceptRouter.get("/conceptpage",controller.GetConceptpagination);
// ConceptRouter.get("/conceptpage",controller.GetConceptPagination);
// ConceptRouter.get("/conceptpage",controller.GetConceptVideoPagination);
// ConceptRouter.get("/conceptpage",controller.GetConceptPdfPagination);
// ConceptRouter.get("/conceptpage",controller.GetConceptAssessmentPagination);
// ConceptRouter.get("/conceptpage",controller.GetConceptPracticePagination);


module.exports = ConceptRouter;
