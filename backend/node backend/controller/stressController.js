const axios = require("axios");
const LifestyleLog = require("../models/LifestyleLogs");

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