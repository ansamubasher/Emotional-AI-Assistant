const express = require('express');
const router = express.Router();
const {
    predictStress,
    predictStressDirect,
    getFeatures,
    healthCheck,
    batchPredict
} = require('../controller/recommenderController');

// ============================================
// Stress Prediction Routes
// ============================================

// POST - Predict stress level using Python ML model
router.post('/predict', predictStress);

// POST - Alternative: Predict using pure JS logic (no Python dependency)
router.post('/predict/direct', predictStressDirect);

// POST - Batch prediction for multiple users
router.post('/predict/batch', batchPredict);

// GET - Get required features documentation
router.get('/features', getFeatures);

// GET - Health check endpoint
router.get('/health', healthCheck);

// ============================================
// Additional utility routes
// ============================================
