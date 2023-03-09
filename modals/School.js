const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema(
  {
    sch_id: { type: String, min: 5, max: 10 },
    sch_name: { type: String, min: 4, max: 20 },
    address: { type: String, min: 50, max: 20 },
    city: { type: String, min: 2, max: 16 },
    teacher: { type: Array },
    student: { type: Array },
    user_name: { type: String },
    passcode: { type: String },
    goadem_admin: { type: String },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("Schooldetails", SchoolSchema);
