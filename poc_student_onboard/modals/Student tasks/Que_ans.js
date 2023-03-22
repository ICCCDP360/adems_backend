const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Que_ansSchema = new Schema(
  {
    question_id:{type:Array},
    question_ans:{type:Array},
    user_id:{type:Array},
    like:{type:Number,default:0},
    dislike:{type:Number,default:0},
    content_id:{type:Number},
    content:{type:String}
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("Que_ans", Que_ansSchema);
