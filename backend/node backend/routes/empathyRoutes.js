const express = require("express");
const router = express.Router();

const empathyController = require("../controller/empathyController");

// Node endpoint → calls Flask empathy model
router.post("/empathy", empathyController.getEmpathyResponse);

module.exports = router;