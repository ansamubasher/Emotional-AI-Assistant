const express = require("express");
const router = express.Router();
const { getEmpathyResponse } = require("../controller/empathyController");

// POST /api/empathy
router.post("/", getEmpathyResponse);
 
module.exports = router;