const express =require("express");
const router = express.Router();

const controller = require("../../controller/stu_ac_holder");

router.post("/stu_ac_holder",controller.PostStu_ac_holder);
router.get("/stu_ac_holder/:id",controller.GetbyidStu_ac_holder);

module.exports = router;