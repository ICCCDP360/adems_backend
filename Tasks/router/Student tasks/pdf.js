const express = require("express");
const PdfRouter = express.Router();

const controller = require("../../controller/Student tasks/pdf");

PdfRouter.post("/pdf", controller.PostPdf);
PdfRouter.get("/pdf/:id", controller.GetbyidPdf);
PdfRouter.get("/pdf", controller.GetPdf);


module.exports = PdfRouter;
