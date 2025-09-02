// backend/models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Rejected", "Offer"],
      default: "Applied"
    },
    notes: { type: String },
    dateApplied: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
