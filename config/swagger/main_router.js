const express = require("express");
const mainRouter = express.Router();

//sample router
mainRouter.get("/", (req, res) => {
  res.status(200).json({ title: "admes & cdp360 backend", version: "v1.0.0" });
});
mainRouter.get("/get", (req, res) => {
  res.status(200).json({ title: "admes & cdp360 backend", version: "v1.0.0" });
});

module.exports = mainRouter;
