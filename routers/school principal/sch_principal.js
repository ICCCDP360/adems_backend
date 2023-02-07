const express = require("express");
const sch_principalrouter = express.Router();

const controller = require("../../controller/sch_principal");

sch_principalrouter.get("/sch_principal",controller.GetSch_principal);
sch_principalrouter.post("/sch_principal",controller.PostSch_principal);
sch_principalrouter.get("/sch_principal/:id",controller.GetbyidSch_principal);

module.exports = sch_principalrouter;
