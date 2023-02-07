const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherdetailsSchema = new Schema(
  {
    teacher_id: { type: String,min:5,max:10},
    teacher_name: { type:String,min:4,max:25},
    phn_num: { type:Array,min:5,max:15},
    classes: { type: Array,min:2,max:16},
    subjects: { type: Array,min:2,max:50},
  },
  { timestamps: { createdAt:"dt", updatedAt:"u_dt"}}, 
);
module.exports = mongoose.model("teacherdetails", TeacherdetailsSchema);
