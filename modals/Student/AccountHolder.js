const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountHolderSchema = new Schema(
  {
    ph_code: {
      type: String,
      min: 2,
      max: 6,
      require: ["phone country code is required"],
    },
    ph_num: {
      type: Array,
      min: 8,
      max: 16,
      require: ["phone Number is required"],
    },
    holder: {
      type: String,
      min: 0,
      max: 20,
      require: ["Account Holder Name  is required (parents or guardian)"],
    },
    student_id: {type:Array},
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("AccountHolder", AccountHolderSchema);
