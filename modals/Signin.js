const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SigninSchema = new Schema(
  {
    user_id: { type: String,min:2,max:50},
    pwd: { type: String,min:2,max:50 },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("signin", SigninSchema);
