const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssuesSchema = new Schema({
  student_id: {
    type: String,
    require: ["student id Required"],
  },
  assessment_id: {
    type: String,
    require: ["assessment id  Required"],
  },
  question_id: {
    type: String,
    require: ["question id  Required"],
  },
  lang_type: {
    type: String,
    require: ["lang_type Required"],
    enum: ["english", "tamil"],
    default: "english",
  },
  issues_type:{
    type: String,
    require: ["issues_type Required"],
    enum: ["Question has an error", "options has an error"],
    default: "Question has an error",
  }
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" }
});

module.exports=mongoose.model("ISSUES",IssuesSchema)