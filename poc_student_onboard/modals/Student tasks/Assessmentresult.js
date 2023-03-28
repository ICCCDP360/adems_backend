const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentResultSchema = new Schema({
  lang_type: {
    type: String,
    require: ["lang_type Required"],
    enum: ["english", "tamil"],
    default: "english",
  },
  user_id: {
    type: String,
  },
  assessment_id: {
    type: String,
  },
  assessment_result:[{
    assessment_id: { type: String},
    attended: { type: Array},
    notattended: { type: Array}
}]
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" }
});
