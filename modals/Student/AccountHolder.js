const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountHolderSchema = new Schema(
  {
    type: { type: String,unique:false},
    lang: {
      english: {type:String},
      tamil: {type:String},
    },  
    ph_code: {
      type: String,
      min: 2,
      max: 6,
      require: ["phone country code is required"],
    },
    phone: {
      type: String,
      min: 8,
      max: 16,
      require: ["phone Number is required"],
    },
    name: {
      type: String,
      min: 0,
      max: 20,
      require: ["Account Holder Name  is required (parents or guardian)"],
    },
    lang_type:{
      type:String,
      require:["type Required"],
      enum:["english","tamil"],
      default:"english"
  },
    relation: { type: String },
    email: { type: String },
    stu_id: { type: Array },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    verify: { type: Boolean },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("AccountHolder", AccountHolderSchema);
