const express = require("express");
const router = express.Router();

const stressController = require("../controller/stressController");

// Node route → calls Flask internally
router.post("/predict", stressController.predictStress);
router.post("/save", stressController.saveStressEvaluation);
router.get("/latest-result/:userId", stressController.getLatestStressLog);

module.exports = router;





