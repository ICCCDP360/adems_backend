const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const StudentSchema = new Schema(
  {
    stu_id:{type:String},
    name: { type: String, min: 4, max: 20 },
    email: { type: String, min: 5, max: 50 },
    std: { type: String, min: 1, max: 4 },
    sec: { type: String },
    roll_no: { type: String }, 
    dob: { type: Date },
    gender: { type: String },
    city: { type: String },
    state: { type: String },
    sch_id: { type: String },
    acc_id: { type: String },
    phone: { type: String },
    points: { type: String, default: "100" },
    passcode: {
      type: String,
      trim: true,
      required: ["Password is required"],
      minlength: [8, "Password should be at least 8 characters long"],
    },
    assign_teacher: { type: String },
    verify: { type: Boolean },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
StudentSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.passcode, salt);
  this.passcode = hash;
  next();
});
module.exports = mongoose.model("StudentDetails", StudentSchema);
