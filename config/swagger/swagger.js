const swaggerAutogen = require("swagger-autogen");
// const mainRouter = "./main_router.js";
const PORT = require("../credentials/config").PORT;
const outputFile = "./config/swagger/swagger_output.json";
const endpointsFile = ["./routers/main_router.js"];

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "CDP360 Product - Swagger",
    description: "CDP360-ADEMS-LMS RestFull Api in Swagger Framework",
    contact: {
      email: "iam@vimalv.com",
    },
  },
  host: `localhost:${PORT}`,
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFile, doc).then((d) => {
  console.log(d);
  // require("../../index"); // Your project's root file
});
