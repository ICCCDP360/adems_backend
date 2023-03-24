const express = require("express");
const PdfRouter = express.Router();

const controller = require("../../controller/Student tasks/pdf");

PdfRouter.post("/pdf", controller.PostPdf);
PdfRouter.get("/pdf/:id", controller.GetbyidPdf);
PdfRouter.get("/pdf", controller.GetPdf);
PdfRouter.get("/pdf_page",controller.GetPdfPagination)
PdfRouter.get("/pdf_page/:id",controller.GetbyidPdfPagination)


module.exports = PdfRouter;
