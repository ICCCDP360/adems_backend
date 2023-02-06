const express =require("express");
const teacherdetailsrouter = express.Router();

const controller = require("../../controller/teacherdetails");

teacherdetailsrouter.get("/teacherdetails",controller.GetTeacherdetails);
teacherdetailsrouter.post("/teacherdetails",controller.PostTeacherdetails);
teacherdetailsrouter.put("/teacherdetails/:id",controller.PutTeacherdetails);
teacherdetailsrouter.delete("/teacherdetails/:id",controller.DeleteTeacherdetails);
teacherdetailsrouter.get("/teacherdetails/:id",controller.GetbyidTeacherdetails);

module.exports = teacherdetailsrouter;