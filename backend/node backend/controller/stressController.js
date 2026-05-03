const axios = require("axios");

const FLASK_URL = "http://127.0.0.1:5000/p  redict";

exports.predictStress = async (req, res) => {
    try {
        const inputData = req.body;

        // call Flask API
        const response = await axios.post(FLASK_URL, inputData);

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





