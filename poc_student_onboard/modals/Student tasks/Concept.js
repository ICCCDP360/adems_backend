const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConceptSchema = new Schema(
  {
    name: { type: String,unique:true },
    assessment: { type: String },
    pdf: { type: String },
    practice: { type: String },
    video: { type: String },
    category: { type: String },
    assessment_count:{type:Number,default:0},
    practice_count:{type:Number,default:0},
    video_count:{typer:Number,default:0},
    status: { type: Boolean, default: false },
    assign_to: { type: Array },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("concept", ConceptSchema);
