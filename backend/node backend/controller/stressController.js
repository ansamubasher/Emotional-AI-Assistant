const axios = require("axios");
const LifestyleLog = require("../models/LifestyleLogs");
const StressLog = require("../models/StressLogs");

const FLASK_URL = "http://127.0.0.1:5001/api/stress/predict";

exports.predictStress = async (req, res) => {
    try {
        const inputData = req.body;

        // 1. SAVE TO MONGODB FIRST
        const newLog = await LifestyleLog.create({
            userId: inputData.userId, // make sure frontend sends this
            age: inputData.age,
            gender: inputData.gender,
            sleep_hours: inputData.sleep_hours,
            screen_time_hours: inputData.screen_time_hours,
            study_hours: inputData.study_hours,
            physical_activity: inputData.physical_activity,
            caffeine_intake: inputData.caffeine_intake,
            academic_pressure: inputData.academic_pressure,
            stress_level: "moderate" // temporary, will update after prediction
        });

        // 2. CALL FLASK MODEL
        const response = await axios.post(FLASK_URL, inputData);

        console.log("Flask Response:", response.data);

        // 3. UPDATE DB WITH PREDICTION RESULT
        newLog.stress_level = response.data.prediction; 
        await newLog.save();

        return res.status(200).json({
            success: true,
            data: response.data,
            savedLog: newLog
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.saveStressEvaluation = async (req, res) => {
    try {
        const { userId, ...responses } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // 1. Call Flask for prediction
        let predictionData = { stress_level: "Unknown", confidence: null };
        try {
            const flaskResponse = await axios.post(FLASK_URL, responses);
            predictionData = flaskResponse.data;
        } catch (flaskErr) {
            console.error("Flask API error:", flaskErr.message);
            // We continue even if Flask fails, but with unknown level
        }

        // 2. Save to DB
        const newLog = await StressLog.create({
            userId,
            ...responses,
            stress_level: predictionData.stress_level,
            confidence: predictionData.confidence
        });

        return res.status(201).json({
            success: true,
            message: "Stress evaluation saved successfully",
            data: newLog
        });
    } catch (error) {
        console.error("Error saving stress evaluation:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getLatestStressLog = async (req, res) => {
    try {
        const { userId } = req.params;
        const latestLog = await StressLog.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestLog) {
            return res.status(404).json({ success: false, message: "No stress evaluation found for this user" });
        }

        return res.status(200).json({
            success: true,
            data: latestLog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};