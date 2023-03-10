const swaggerAutogen = require("swagger-autogen");
// const mainRouter = "./main_router.js";
const PORT = require("../credentials/config").PORT;
const outputFile = "./config/swagger/swagger_output.json";
const endpointsFile = ["./config/express/express.js"];

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "ADEMS",
    description: "CDP360-ADEMS-LMS RestFull Api in Swagger Framework",
    contact: {
      email: "iam@vimalv.com",
    },
  },
  host: `localhost:${PORT}`,
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFile, doc);
