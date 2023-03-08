const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactusSchema = new Schema(
  {
    Name:{type:String},
    Your_email:{type:String},
    School_Name:{type:String},
    Contact_Number:{type:Array},
    City:{type:String},
    Education_board:{type:String},
    NoOfStudent_in_6to12:{type:String},
    Your_message:{type:String}
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);
module.exports = mongoose.model("contactus", ContactusSchema);
