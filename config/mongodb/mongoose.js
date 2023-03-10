const mongoose = require("mongoose");
const { DB_CONNECTION } = require("../credentials/config");

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", console.log.bind(console, "DB connected!"));

module.exports = db;
