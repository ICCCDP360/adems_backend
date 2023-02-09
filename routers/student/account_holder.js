const express =require("express");
const router = express.Router();

const controller = require("../../controller/student/accountHolder");

router.get("/accountHolder/:id",controller.GetbyidAccountHolder);
router.post("/accountHolder",controller.PostAccountHolder);

module.exports = router;