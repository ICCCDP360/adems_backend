const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    type: { type: String,unique:false},
    lang: {
      english: {type:String},
      tamil: {type:String},
    },  
    teacher_id: {
      type: String,
      min: 5,
      max: 10,
    },
    sch_id: {
      type: String,
      min: 4,
      max: 25,
    },
    name: {
      type: String,
      min: 4,
      max: 25,
    },
    phone: {
      type: Array,
      min: 5,
      max: 15,
    },
    classes: {
      type: Array,
      min: 2,
      max: 16,
    },
    subjects: {
      type: Array,
      min: 2,
      max: 50,
    },
    lang_type:{
      type:String,
      require:["type Required"],
      enum:["english","tamil"],
      default:"english"
  },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("TeacherDetails", TeacherSchema);
