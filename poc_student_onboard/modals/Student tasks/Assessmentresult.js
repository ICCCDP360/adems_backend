const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentResultSchema = new Schema({
  user_id: {
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
    notattended: { type: Array},
    totaltimespent: { type: String}
  }]
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" }
});

module.exports=mongoose.model("assessmentresult",AssessmentResultSchema)