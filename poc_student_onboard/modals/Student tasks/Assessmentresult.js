const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentResultSchema = new Schema({
  student_id: {
    type: String,
  },
  assessment_id: {
    type: String,
  },
  lang_type: {
    type: String,
    require: ["lang_type Required"],
    enum: ["english", "tamil"],
    default: "english",
  },
  assessment_result:[{
    assessment_id: { type: String},
    attended: { type: Array},
    not_attended: { type: Array},
    total_time_spent: { type: String}
  }]
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" }
});

module.exports=mongoose.model("ASSESSMENTRESULT",AssessmentResultSchema)