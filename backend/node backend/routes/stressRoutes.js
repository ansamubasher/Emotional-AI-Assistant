const express = require("express");
const router = express.Router();

const stressController = require("../controllers/stressController");

// Node route → calls Flask internally
router.post("/stress/predict", stressController.predictStress);

module.exports = router;





