const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String },
  type: { 
    type: String, 
    enum: ["text", "audio"], 
    required: true 
  },
  content: {
    type: String,
    // Required if type is 'text', optional for 'audio' transcriptions
    required: function() { return this.type === 'text'; }
  },
  audioUrl: { 
    type: String 
  },
  audioData: { 
    type: String // Can be used to store base64 data if needed
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);