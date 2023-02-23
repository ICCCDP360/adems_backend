const express = require("express");
const registerauthrouter = express.Router();

const controller = require("../../controller/registerAuth")
;
registerauthrouter.post("/registerAuth", controller.PostRegisterauth);

module.exports = registerauthrouter;
