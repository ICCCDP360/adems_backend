const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    stu_name: { type: String, min: 4, max: 20 },
    email: { type: String, min: 5, max: 50 },
    acc_holder: { type: String },
    dob: { type: Date },
    gender: { type: String },
    city: { type: String },
    sch_id: { type: Array },
    p_g_name: { type: String },
    relation: { type: String },
    p_g_email: { type: String },
    p_g_contact: { type: Array },
    pwd: { type: String },
    assign_teacher: { type: String },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("StudentDetails", StudentSchema);
