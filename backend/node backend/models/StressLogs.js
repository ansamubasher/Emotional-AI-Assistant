const mongoose = require("mongoose");

const stressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Psychological Factors
  anxiety_level: { type: Number, required: true },
  self_esteem: { type: Number, required: true },
  mental_health_history: { type: Number, required: true },
  depression: { type: Number, required: true },

  // Physiological Factors
  headache: { type: Number, required: true },
  blood_pressure: { type: Number, required: true },
  sleep_quality: { type: Number, required: true },
  breathing_problem: { type: Number, required: true },

  // Environmental Factors
  noise_level: { type: Number, required: true },
  living_conditions: { type: Number, required: true },
  safety: { type: Number, required: true },
  basic_needs: { type: Number, required: true },

  // Academic Factors
  academic_performance: { type: Number, required: true },
  study_load: { type: Number, required: true },
  teacher_student_relationship: { type: Number, required: true },
  future_career_concerns: { type: Number, required: true },

  // Social Factors
  social_support: { type: Number, required: true },
  peer_pressure: { type: Number, required: true },
  extracurricular_activities: { type: Number, required: true },
  bullying: { type: Number, required: true },

  stress_level: { type: String }, // Predicted: Low, Medium, High
  confidence: {
      Low: Number,
      Medium: Number,
      High: Number
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StressLog", stressLogSchema);
