const mongoose = require("mongoose");

const lifestyleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  age: Number,
  gender: String,

  sleep_hours: Number,
  screen_time_hours: Number,
  study_hours: Number,
  physical_activity: Number,
  caffeine_intake: Number,
  academic_pressure: Number,

  stress_level: {
    type: String,
    enum: ["low", "moderate", "high"]
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LifestyleLog", lifestyleSchema);