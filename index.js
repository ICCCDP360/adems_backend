const express = require("express");
const { token } = require("morgan");
const { PORT } = require("./config/credentials/config.js");
const app = express();
require("./config/express/express")(app);
app.listen(PORT, () => {
  console.log(`ADMES BACKEND - CDP360`);
  console.log(`server is running on port : http://localhost:${PORT}`);
  console.log(
    `swagger restfull api is running on port : http://localhost:${PORT}/doc`
  );
});
   


