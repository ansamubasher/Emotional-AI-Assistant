const Journal = require("../models/Journals");

// Create a new journal entry
exports.createJournal = async (req, res) => {
  try {
    const { userId, title, type, content, audioUrl, audioData } = req.body;

    if (!userId || !type) {
      return res.status(400).json({ message: "userId and type are required" });
    }

    const newJournal = new Journal({
      userId,
      title,
      type,
      content,
      audioUrl,
      audioData
    });

    await newJournal.save();
    res.status(201).json({ message: "Journal created successfully", journal: newJournal });
  } catch (error) {
    res.status(500).json({ message: "Error creating journal", error: error.message });
  }
};

// Get all journals for a specific user
exports.getJournals = async (req, res) => {
  try {
    const { userId } = req.params;
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journals", error: error.message });
  }
};

// Get a single journal by ID
exports.getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal", error: error.message });
  }
};

// Delete a journal entry
exports.deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJournal = await Journal.findByIdAndDelete(id);
    if (!deletedJournal) {
      return res.status(404).json({ message: "Journal not found" });
    }
    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting journal", error: error.message });
  }
};
