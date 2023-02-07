const express = require("express");
const signinrouter = express.Router();

const controller = require("../../controller/signin");

signinrouter.post("/signin",controller.PostSignin);

module.exports = signinrouter;

