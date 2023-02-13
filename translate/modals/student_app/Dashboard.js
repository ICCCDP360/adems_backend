const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DashboardSchema = new Schema(
  {
    task_rem: [
      {
        english: {
          title: { type: String },
          subject: { type: String },
          total: { type: Array },
        },
        tamil: {
          title: { type: String },
          subject: { type: String },
          total: { type: Array },
        },
      },
    ],
    notic_board: [
      {
        english: {
          title: { type: String },
          contenet: { type: String },
          total: { type: Array },
        },
        tamil: {
          title: { type: String },
          contenet: { type: String },
          total: { type: Array },
        },
      },
    ],
    standing: [
      {
        english: {
          standing: { type: String },
          avergescore: { type: String },
          totaltimespent: { type: Array },
        },
        tamil: {
          standing: { type: String },
          avergescore: { type: String },
          totaltimespent: { type: Array },
        },
      },
    ],
    performance_score: [
      {
        english: {
          title: { type: String },
          maths: { type: String },
          science: { type: String },
        },
        tamil: {
          title: { type: String },
          maths: { type: String },
          science: { type: String },
        },
      },
    ],
    topics_completed: [
      {
        english: {
          title: { type: String },
          topics: { type: Array },
        },
        tamil: {
          title: { type: String },
          topics: { type: Array },
        },
      },
    ],
  },
  { timestamps: { createdAt: "dt", updatedAt: "u_dt" } }
);

module.exports = mongoose.model("Dashboard", DashboardSchema);
