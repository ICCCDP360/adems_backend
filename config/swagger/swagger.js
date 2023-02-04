const swaggerAutogen = require("swagger-autogen");

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "CDP360 Product - Swagger",
    description: "CDP360 Product RestFull Api in swagger framework",
    contact: {
      email: "vimal@cdp360.com",
    },
  },
  host: "localhost:3300",
  schemes: ["http", "https"],
};
const outputFile = "./config/swagger/swagger_output.json";
const endpointsFile = ["./routers/main_router.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
