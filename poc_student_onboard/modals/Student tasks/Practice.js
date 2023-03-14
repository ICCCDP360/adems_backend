const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PracticeSchema = new Schema(
{
    type: { type: String },
    lang: {
      english: {type:String},
      tamil: {type:String},
    },
    title:{
        type:String,
        require:["type Required"],
        min:4,max:20
    },
    thumnail:{
        type:String,
        require:["type Required"],
        min:5,
        max:50
    },
    category:{
        type:String,
        require:["type Required"],
        enum:["Science","Mathematics"],
        default:"Science"
    },
    std:{
        type:String,
        enum:["VI","VII","VIII","XI","X","XI","XII"],
        default:"VI"
    },
    questions:[{
        question_id:{type:String},
        question:{type:String},
        options:[{label:{type:String},id:{type:Number}}],
        explanation:{type:String,default:null},
        answer:{type:Number},
        hint:{type:String,default:null},
        image:{type:String,default:null}
    }],
    noOfchapters:{type:Number,default:1},
    status:{type:Number,default:0},
    status_percentage:{type:Number,default:0},
    task_id:{type:Number,unique:true},
    assign_to:{type:Array},
    duration:{type:String},
    size:{type:String},
    created_by:{type:String},
    reviewed_by:{type:String},
    approved_by:{type:String}
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
)

module.exports=mongoose.model("practice",PracticeSchema)
    