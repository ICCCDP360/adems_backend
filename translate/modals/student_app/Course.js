const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseTranslateSchema = new Schema(
  {
    type: { type: String, require: ["type require"], unique: true },
    lang: {
      english: {},
      tamil: {},
    },
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("CourseTranslates", CourseTranslateSchema);
