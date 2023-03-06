const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SchoolSchema = new Schema(
  {
    sch_id: {
      type: String,
      Unique:true,
      min: 5,
      max: 10,
    },
    sch_name: {
      type: String,
      min: 4,
      max: 20,
    },
    address: {
      type: String,
      min: 50,
      max: 20,
    },
    city: {
      type: String,
      min: 2,
      max: 16,
    },
    doj:{type:Date},
    principal_name:{type:String},
    spoc_name:{type:String},
    sch_email:{type:String},
    logo: { type: String, default:"https://www.shutterstock.com/image-vector/school-building-logo-260nw-769246243.jpg" },
    teacher: { type: Array },
    student: { type: Array },
    ph_num: { type: String },
    state:{type:String},
    pincode:{type:String},
    proof:{type:String},
    passcode: {
      type: String,
      trim: true,
      required: ["Password is required"],
      minlength: [8, "Password should be at least 8 characters long"],
    },
    goadem_admin: { type: String },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
SchoolSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.passcode, salt);
  this.passcode = hash;
  next();
});
module.exports = mongoose.model("Schooldetails", SchoolSchema);
