const path = require('path');
const { PythonShell } = require('python-shell');
const fs = require('fs');

/**
 * Predict stress level and get recommendations
 * @route POST /api/predict
 */
const predictStress = async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields
        const requiredFields = [
            'age', 'gender', 'sleep_hours', 'screen_time_hours',
            'study_hours', 'physical_activity', 'caffeine_intake',
            'academic_pressure'
        ];

        const missingFields = requiredFields.filter(field => !(field in userData));
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing required features',
                message: `Missing features: ${missingFields.join(', ')}`,
                required_features: requiredFields
            });
        }

        // Validate data types and ranges
        const validationErrors = [];

        if (typeof userData.age !== 'number' || userData.age < 0 || userData.age > 100) {
            validationErrors.push('Age must be a number between 0 and 100');
        }

        if (!['Male', 'Female', 'Other'].includes(userData.gender)) {
            validationErrors.push('Gender must be one of: Male, Female, Other');
        }

        if (typeof userData.sleep_hours !== 'number' || userData.sleep_hours < 0 || userData.sleep_hours > 24) {
            validationErrors.push('Sleep hours must be a number between 0 and 24');
        }

        if (typeof userData.screen_time_hours !== 'number' || userData.screen_time_hours < 0 || userData.screen_time_hours > 24) {
            validationErrors.push('Screen time hours must be a number between 0 and 24');
        }

        if (typeof userData.study_hours !== 'number' || userData.study_hours < 0 || userData.study_hours > 24) {
            validationErrors.push('Study hours must be a number between 0 and 24');
        }

        if (![0, 1].includes(userData.physical_activity)) {
            validationErrors.push('Physical activity must be 0 or 1');
        }

        if (typeof userData.caffeine_intake !== 'number' || userData.caffeine_intake < 0 || userData.caffeine_intake > 10) {
            validationErrors.push('Caffeine intake must be a number between 0 and 10');
        }

        if (![0, 1, 2].includes(userData.academic_pressure)) {
            validationErrors.push('Academic pressure must be 0, 1, or 2');
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid feature values',
                details: validationErrors
            });
        }

        // Call Python script using PythonShell
        const scriptPath = path.join(__dirname, '..', 'backend');

        const options = {
            mode: 'json',
            pythonPath: process.env.PYTHON_PATH || 'python3', // or 'python' depending on system
            scriptPath: scriptPath,
            args: [JSON.stringify(userData)]
        };

        // Execute Python script
        const results = await PythonShell.run('recommender_wrapper.py', options);

        if (!results || results.length === 0) {
            throw new Error('No response from Python script');
        }

        const predictionResult = results[0];

        return res.status(200).json({
            success: true,
            data: predictionResult
        });

    } catch (error) {
        console.error('Prediction error:', error.message);

        // Handle Python script errors
        if (error.message.includes('PythonShell')) {
            return res.status(500).json({
                success: false,
                error: 'Model execution error',
                message: 'Failed to execute prediction model'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again.'
        });
    }
};

/**
 * Alternative: Direct implementation without Python script (pure JS)
 * This replicates the Python logic in JavaScript
 */
const predictStressDirect = async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields (same as above)
        const requiredFields = [
            'age', 'gender', 'sleep_hours', 'screen_time_hours',
            'study_hours', 'physical_activity', 'caffeine_intake',
            'academic_pressure'
        ];

        const missingFields = requiredFields.filter(field => !(field in userData));
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing required features',
                message: `Missing features: ${missingFields.join(', ')}`
            });
        }

        // Simple rule-based prediction (fallback if ML model unavailable)
        let stressScore = 0;

        if (userData.sleep_hours < 6) stressScore += 2;
        else if (userData.sleep_hours > 9) stressScore += 1;

        if (userData.screen_time_hours > 8) stressScore += 2;
        else if (userData.screen_time_hours > 6) stressScore += 1;

        if (userData.physical_activity === 0) stressScore += 2;

        if (userData.caffeine_intake > 3) stressScore += 2;
        else if (userData.caffeine_intake > 2) stressScore += 1;

        if (userData.academic_pressure === 2) stressScore += 2;
        else if (userData.academic_pressure === 1) stressScore += 1;

        if (userData.study_hours < 2) stressScore += 1;

        let predictedStressLevel;
        if (stressScore >= 7) predictedStressLevel = 'High';
        else if (stressScore >= 4) predictedStressLevel = 'Medium';
        else predictedStressLevel = 'Low';

        // Coping strategies based on stress level
        const copingStrategies = {
            Low: ['Maintain your healthy routine', 'Practice mindfulness', 'Regular exercise', 'Stay socially connected', 'Get adequate sleep'],
            Medium: ['Practice deep breathing', 'Take regular breaks', 'Talk to someone', 'Time management', 'Limit caffeine intake'],
            High: ['Seek professional help', 'Practice relaxation techniques', 'Join support groups', 'Meditation and yoga', 'Reduce workload']
        };

        // Generate personalized tips
        const tips = [];

        if (userData.sleep_hours < 6) {
            tips.push(`Get at least 6 hours of sleep. Maintain a consistent bedtime and limit evening screen use.`);
        } else if (userData.sleep_hours > 9) {
            tips.push('More than 9 hours of sleep may indicate low energy. Try to increase daytime activity and consult a doctor if this persists.');
        }

        if (userData.screen_time_hours > 8) {
            tips.push('High screen time is linked to stress. Take a 5-minute break every hour and reduce social media use in the evening.');
        }

        if (userData.physical_activity === 0) {
            tips.push('You are not physically active. Even a 10-minute daily walk can lower cortisol levels.');
        } else {
            tips.push('Great that you are physically active – keep it up! It naturally reduces stress.');
        }

        if (userData.caffeine_intake > 3) {
            tips.push('Caffeine intake above 3 units per day can worsen anxiety. Switch to decaf or herbal tea after 2 PM.');
        }

        if (userData.academic_pressure === 2) {
            tips.push('High academic pressure is a major stressor. Break large tasks into small chunks and talk to your teachers or counsellors.');
        }

        if (predictedStressLevel !== 'Low' && userData.study_hours < 2) {
            tips.push('Your study hours are very low. Set a daily 20-minute study goal to rebuild momentum without overwhelming yourself.');
        }

        const result = {
            predicted_stress_level: predictedStressLevel,
            stress_score: stressScore,
            general_coping_strategies: copingStrategies[predictedStressLevel],
            personalised_tips: tips
        };

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('Direct prediction error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'An unexpected error occurred during prediction'
        });
    }
};

/**
 * Get required features and their constraints
 * @route GET /api/features
 */
const getFeatures = async (req, res) => {
    try {
        const features = {
            required_features: {
                age: {
                    type: 'number',
                    range: '0-100',
                    required: true,
                    description: 'Age in years'
                },
                gender: {
                    type: 'string',
                    values: ['Male', 'Female', 'Other'],
                    required: true,
                    description: 'Gender identity'
                },
                sleep_hours: {
                    type: 'number',
                    range: '0-24',
                    required: true,
                    description: 'Average hours of sleep per night'
                },
                screen_time_hours: {
                    type: 'number',
                    range: '0-24',
                    required: true,
                    description: 'Average daily screen time in hours'
                },
                study_hours: {
                    type: 'number',
                    range: '0-24',
                    required: true,
                    description: 'Average daily study hours'
                },
                physical_activity: {
                    type: 'integer',
                    values: [0, 1],
                    required: true,
                    description: '0 for inactive, 1 for active'
                },
                caffeine_intake: {
                    type: 'number',
                    range: '0-10',
                    required: true,
                    description: 'Daily caffeine intake units'
                },
                academic_pressure: {
                    type: 'integer',
                    values: [0, 1, 2],
                    required: true,
                    description: '0=Low, 1=Medium, 2=High academic pressure'
                }
            },
            example: {
                age: 22,
                gender: 'Female',
                sleep_hours: 5.5,
                screen_time_hours: 8.0,
                study_hours: 7.4,
                physical_activity: 0,
                caffeine_intake: 3,
                academic_pressure: 2
            }
        };

        return res.status(200).json({
            success: true,
            data: features
        });

    } catch (error) {
        console.error('Features error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve feature information'
        });
    }
};

/**
 * Health check endpoint
 * @route GET /api/health
 */
const healthCheck = async (req, res) => {
    try {
        // Check if Python model files exist
        const modelDir = path.join(__dirname, '..', 'backend', 'models');
        const modelFiles = [
            'stressDetectionModel.joblib',
            'stress_feature_cols.joblib',
            'gender_classes.joblib'
        ];

        const modelStatus = {};
        modelFiles.forEach(file => {
            const filePath = path.join(modelDir, file);
            modelStatus[file] = fs.existsSync(filePath) ? 'available' : 'missing';
        });

        // Check if data file exists
        const dataPath = path.join(__dirname, '..', 'backend', 'data', 'Psychological_Assessment_Dataset.csv');
        const dataStatus = fs.existsSync(dataPath) ? 'available' : 'missing';

        return res.status(200).json({
            success: true,
            status: 'healthy',
            message: 'Stress prediction API is running',
            timestamp: new Date().toISOString(),
            models: modelStatus,
            data: dataStatus,
            python_available: true // You might want to check Python availability
        });

    } catch (error) {
        console.error('Health check error:', error.message);
        return res.status(500).json({
            success: false,
            status: 'unhealthy',
            message: 'Health check failed',
            error: error.message
        });
    }
};

/**
 * Batch prediction endpoint
 * @route POST /api/predict/batch
 */
const batchPredict = async (req, res) => {
    try {
        const { users } = req.body;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid request',
                message: 'Please provide an array of users in the request body'
            });
        }

        if (users.length > 100) {
            return res.status(400).json({
                success: false,
                error: 'Batch limit exceeded',
                message: 'Maximum 100 predictions per batch request'
            });
        }

        const results = [];
        const errors = [];

        for (let i = 0; i < users.length; i++) {
            try {
                // Use the direct prediction for batch processing (faster)
                let stressScore = 0;
                const user = users[i];

                if (user.sleep_hours < 6) stressScore += 2;
                else if (user.sleep_hours > 9) stressScore += 1;
                if (user.screen_time_hours > 8) stressScore += 2;
                else if (user.screen_time_hours > 6) stressScore += 1;
                if (user.physical_activity === 0) stressScore += 2;
                if (user.caffeine_intake > 3) stressScore += 2;
                else if (user.caffeine_intake > 2) stressScore += 1;
                if (user.academic_pressure === 2) stressScore += 2;
                else if (user.academic_pressure === 1) stressScore += 1;
                if (user.study_hours < 2) stressScore += 1;

                let predictedStressLevel;
                if (stressScore >= 7) predictedStressLevel = 'High';
                else if (stressScore >= 4) predictedStressLevel = 'Medium';
                else predictedStressLevel = 'Low';

                results.push({
                    index: i,
                    predicted_stress_level: predictedStressLevel,
                    stress_score: stressScore
                });
            } catch (error) {
                errors.push({
                    index: i,
                    error: error.message
                });
            }
        }

        return res.status(200).json({
            success: true,
            total: users.length,
            successful: results.length,
            failed: errors.length,
            data: results,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error('Batch prediction error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Batch prediction failed'
        });
    }
};

module.exports = {
    predictStress,
    predictStressDirect,
    getFeatures,
    healthCheck,
    batchPredict
};