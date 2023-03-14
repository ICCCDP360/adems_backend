const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PdfSchema = new Schema(
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
        type:Array,
        require:["type Required"],
        min:6,
        max:16
    },
    url:{type:String},
    duration:{type:String},
    size:{type:String},
    created_by:{type:String},
    reviewed_by:{type:String},
    approved_by:{type:String}
},
{ timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
)

module.exports=mongoose.model("pdf",PdfSchema)
    