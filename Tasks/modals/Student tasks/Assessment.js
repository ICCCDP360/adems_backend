const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema(
{
    type: { type: String, require: ["type require"] },
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
    catageory:{
        type:Array,
        require:["type Required"],
        min:6,
        max:16
    },
    questions:{type:Array},
    assign_to:{type:Array},
    duration:{type:String},
    size:{type:String},
    created_by:{type:String},
    reviewed_by:{type:String},
    approved_by:{type:String}
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
)

module.exports=mongoose.model("assessment",AssessmentSchema)
    