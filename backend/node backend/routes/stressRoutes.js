const express = require("express");
const router = express.Router();

const stressController = require("../controller/stressController");

// Node route → calls Flask internally
router.post("/predict", stressController.predictStress);

module.exports = router;





