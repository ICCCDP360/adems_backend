const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const StudentSchema = new Schema (
    {
      stu_id:{type:String,min:5,max:10},
      stu_name:{type:String,min:4,max:20}, 
      email:{type:String,min:5,max:50}, 
      contact:{type:Array,min:6,max:16},
      dob:{type:Date}, 
      gender:{type:String}, 
      city:{type:String}, 
      sch_id:{type:Array}, 
      p_g_name:{type:String}, 
      relation:{type:String}, 
      p_g_email:{type:String}, 
      p_g_contact:{type:Array}, 
      pwd:{type:String},
      assign_teacher:{type:String}, 
    },
     { timestamps: { createdAt:"dt", updatedAt:"u_dt"}},
);
module.exports =mongoose.model("StudentDetails",StudentSchema);