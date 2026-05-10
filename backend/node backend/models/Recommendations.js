const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  lifestyleLogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LifestyleLog"
  },

  stress_level: String,

  recommendations: [
    {
      type: String
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recommendation", recommendationSchema);