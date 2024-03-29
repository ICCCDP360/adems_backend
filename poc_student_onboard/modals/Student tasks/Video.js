const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    type: { type: String },
    lang: {
      english: { type: String },
      tamil: { type: String },
    },
    title: {
      type: String,
      require: ["type Required"],
      min: 4,
      max: 20,
    },
    thumnail: {
      type: String,
      require: ["type Optional"],
      min: 5,
      max: 50,
    },
    category:{
      type:String,
      require:["type Required"],
      enum:["Science","Mathematics"],
      default:"Science"
    },
    lang_type:{
      type:String,
      require:["type Required"],
      enum:["english","tamil"],
      default:"english"
  },
  task_id:{type:Number,default:0,unique:false },
    faqs: [
      {
        contentId: { type: Number },
        content: { type: String },
        likesCount: { type: Number, default: 0 },
        dislikesCount: { type: Number, default: 0 },
        replies: [
          {
            contentId: { type: Number },
            content: { type: String },
            likesCount: { type: Number, default: 0 },
            dislikesCount: { type: Number, default: 0 },
            replies: { type: String },
          },
        ],
      },
    ],
    url: { type: String },
    token: { type: String },
    key: { type: String },
    duration: { type: String },
    relation: { type: String },
    size: { type: String },
    completed_percentage: { type:String, default:"0"},
    reviewed_by: { type: String },
    approved_by: { type: String },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("video", VideoSchema);
