const axios = require("axios");

const FLASK_URL = "http://127.0.0.1:5000/empathy/";

exports.getEmpathyResponse = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "text field is required"
            });
        }

        const response = await axios.post(FLASK_URL, {
            text: text
        });

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



