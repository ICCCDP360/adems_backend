const express =require("express");
const stu_detailsrouter = express.Router();

const controller = require("../../controller/stu_details");

stu_detailsrouter.get("/stu_details",controller.GetStu_details);
stu_detailsrouter.post("/stu_details",controller.PostStu_details);
stu_detailsrouter.put("/stu_details/:id",controller.PutStu_details);
stu_detailsrouter.get("/stu_details/:id",controller.GetbyidStu_details);

module.exports = stu_detailsrouter;