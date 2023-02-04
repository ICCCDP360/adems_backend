const express = require("express");
const router = express.Router();
const app = express();

// All Router
const mainRouter = require("./routers/main_router.js");
app.use(mainRouter);
app.listen(3300, () => {
  console.log(`server is running on port :`, 3300);
});
