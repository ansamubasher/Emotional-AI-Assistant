const express = require("express");
const router = express.Router();

const empathyController = require("../controllers/empathyController");

// Node endpoint → calls Flask empathy model
router.post("/empathy", empathyController.getEmpathyResponse);

module.exports = router;