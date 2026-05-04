const axios = require("axios");

const FLASK_URL = "http://127.0.0.1:5001/api/stress/predict";

exports.predictStress = async (req, res) => {
    try {
        //const inputData = req.body;
        const inputData = {
            "age": 22,
            "gender": 1,
            "sleep_hours": 5.5,
            "screen_time_hours": 8.0,
            "study_hours": 7.4,
            "physical_activity": 0,
            "caffeine_intake": 3,
            "academic_pressure": 2
        }
        // call Flask API
        const response = await axios.post(FLASK_URL, inputData);

        console.log("Flask Response:", response.data);

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





