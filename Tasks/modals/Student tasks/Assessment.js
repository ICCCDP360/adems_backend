const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema(
{
    que_id:{
        type:String,
        require:["type Required"],
        min:5,
        max:10
    },
    que_title:{
        type:String,
        require:["type Required"],
        min:4,max:20
    },
    thumnail_url:{
        type:String,
        require:["type Required"],
        min:5,
        max:50
    },
    que_cat:{
        type:Array,
        require:["type Required"],
        min:6,
        max:16
    },
    questions:{type:Date},
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
    