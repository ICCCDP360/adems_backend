const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const bcrypt = require("bcrypt")
const RegisterauthSchema = new Schema (
    {
        stu_id:{type:String},
        stu_name: { type: String, min: 4, max: 20 },
        email: { type: String, min: 5, max: 50 },
        std: { type: String, min: 1, max: 4 },
        acc_holder: { type: String },
        dob: { type: Date },
        gender: { type: String },
        city: { type: String },
        sch_id: { type: Array },
        acc_id: { type: String },
        p_g_name: { type: String },
        relation: { type: String },
        p_g_email: { type: String },
        p_g_contact: { type: Array },
        passcode: {
          type: String,
          trim: true,
          required: ['Password is required'],
          minlength: [8, 'Password should be at least 8 characters long']
      },
        assign_teacher: { type: String },
        verify: { type: Boolean },
       
    },
     { timestamps: { createdAt:"dt", updatedAt:"u_dt"}}
);
RegisterauthSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.pwd, salt);
  this.pwd = hash;
  next();
}),
module.exports =mongoose.model("registerauth",RegisterauthSchema);