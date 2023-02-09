const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountHolderSchema = new Schema(
  {
    phn_code: { type: String,min:0,max:6},
    phn_num: { type: Array,min:0,max:20 },
    holder_name: { type: String,min:0,max:20 },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("AccountHolder", AccountHolderSchema);
