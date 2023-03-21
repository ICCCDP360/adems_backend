const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MytaskSchema = new Schema(
  {
    name: { type: String, unique: false },
    std:{
      type:String,
      enum:["VI","VII","VIII","XI","X","XI","XII"],
      default:"XI"
    },
    assessment: { type: Array },
    pdf: { type: Array },
    practice: { type: Array },
    video: { type: Array },
    category: { type: String },
    assessment_count: { type: Number, default: 0 },
    practice_count: { type: Number, default: 0 },
    video_count: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    assign_to: { type: Array },//school id call
    myconcept_id: { type: String, default: 10 },
    stu_id:{type:Array},
    completed_status:{type:Boolean},
    completed_percentage:{type:Number,min:10,max:100},
    additional:{type:Array},
    lang_type:{
      type:String,
      require:["type Required"],
      enum:["english","tamil"],
      default:"english"
  },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("mytask", MytaskSchema);
