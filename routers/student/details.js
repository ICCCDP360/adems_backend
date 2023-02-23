const express =require("express");
const router = express.Router();

const controller = require("../../controller/student/details");

router.get("/details",controller.GetDetails);
router.post("/details",controller.PostDetails);
router.put("/details/:id",controller.PutDetails);
router.get("/details/:id",controller.GetbyidDetails);

module.exports = router;