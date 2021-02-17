const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionDate: { type: Date },
  sessionCreated: { type: Date, default: new Date() }, // timestamp of when they created their goals
  author_id: { type: String },
  repertoire: { type: mongoose.Schema.Types.Mixed },
  objectives: { type: mongoose.Schema.Types.Mixed },
  notes: { type: String },
  hours: { type: Number },
  minutes: { type: Number }, 
  listened: { type: Boolean, default: false },
  recorded: { type: Boolean, default: false },
  repeat: { type: Boolean, default: false },
  technique: { type: Boolean, default: false },
});

module.exports = mongoose.model("Session", sessionSchema, "sessions");
