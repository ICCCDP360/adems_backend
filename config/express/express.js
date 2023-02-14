const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger_output.json");
const auth = require("../../middleware/auth");
const cors = require("cors");
const corsOrgin = require("../../middleware/cors");
const mainRouter = require("../../routers/main_router");
const logger = require("morgan");
module.exports = (app) => {
  // db connections
  require("../mongodb/mongoose");
  app.use(corsOrgin);
  app.use(logger("dev"));
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://student.cdp360.in"],
      credentials: true,
    })
  );

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
  // All Router
  app.use("/api/v1", mainRouter);
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // app.use(auth);
};
