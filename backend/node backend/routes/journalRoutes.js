const express = require("express");
const router = express.Router();
const journalController = require("../controller/journalController");

// Create a new journal entry
router.post("/", journalController.createJournal);

// Get all journals for a specific user
router.get("/:userId", journalController.getJournals);

// Get a single journal by ID
router.get("/detail/:id", journalController.getJournalById);

// Delete a journal entry
router.delete("/:id", journalController.deleteJournal);

module.exports = router;
