const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    type:{type:String},
    lang: {
      english: {type:String},
      tamil: {type:String},
    },
    title:{
        type:String,
        require:["type Required"],
        min:4,
        max:20
    },
    thumnail:{
        type:String,
        require:["type Optional"],
        min:5,
        max:50
    },
    catageroy:{
        type:Array,
        require:["type Required"],
        min:6,
        max:16
    },
    url:{type:Date}, 
    token:{type:String}, 
    key:{type:String},
    assign_to:{type:Array},
    duration:{type:String},
    relation:{type:String},
    size:{type:String},
    reviewed_by:{type:String},
    approved_by:{type:String}
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("video", VideoSchema);
