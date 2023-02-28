const express = require("express");
const VideosRouter = express.Router();

const controller = require("../../controller/Student tasks/video");

VideosRouter.post("/video", controller.PostVideo);
VideosRouter.get("/video/:id", controller.GetbyidVideo);
VideosRouter.get("/video", controller.GetVideo);


module.exports = VideosRouter;
