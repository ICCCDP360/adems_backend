const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conceptSchema = new Schema(
  {
    name: { type: String },
    assessment: { type: String },
    pdf: { type: String },
    practice: { type: String },
    video: { type: String },
    category: { type: String },
    status: { type: Boolean, default: false },
    assign_to: { type: Array },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("concept", conceptSchema);
