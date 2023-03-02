const express = require("express");
const router = express.Router();

const controller = require("../../controller/teacherdetails");

router.get("/details", controller.getDetails);
router.post("/details", controller.createDetails);
router.put("/details/:id", controller.updateDetails);
router.delete("/details/:id", controller.deleteDetails);
router.get("/details/:id", controller.getByIdDetails);

module.exports = router;
