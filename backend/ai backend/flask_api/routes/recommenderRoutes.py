from flask import Flask, request, jsonify
from recommender import get_recommendations

app = Flask(__name__)

@app.route('/api/predict', methods=['POST'])
def predict_stress():
    """
    Endpoint to predict stress level and get recommendations.
   
    Expected JSON body:
    {
        "age": 22,
        "gender": "Female",
        "sleep_hours": 5.5,
        "screen_time_hours": 8.0,
        "study_hours": 7.4,
        "physical_activity": 0,
        "caffeine_intake": 3,
        "academic_pressure": 2
    }
    """
    try:
        # Get JSON data from request
        data = request.get_json()
       
        # Check if data is provided
        if not data:
            return jsonify({
                'error': 'No data provided',
                'message': 'Please send JSON data with required features'
            }), 400
       
        # Get recommendations from your existing function
        result = get_recommendations(data)
       
        # Return successful response
        return jsonify({
            'success': True,
            'data': result
        }), 200
       
    except KeyError as e:
        return jsonify({
            'error': 'Missing required features',
            'message': str(e),
            'required_features': [
                'age', 'gender', 'sleep_hours', 'screen_time_hours',
                'study_hours', 'physical_activity', 'caffeine_intake',
                'academic_pressure'
            ]
        }), 400
       
    except ValueError as e:
        return jsonify({
            'error': 'Invalid feature values',
            'message': str(e)
        }), 400
       
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': 'An unexpected error occurred. Please try again.'
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'message': 'Stress prediction API is running'
    }), 200


@app.route('/api/features', methods=['GET'])
def get_required_features():
    """Endpoint to get the list of required features and their constraints."""
    return jsonify({
        'required_features': {
            'age': {
                'type': 'number',
                'range': '0-100',
                'description': 'Age in years'
            },
            'gender': {
                'type': 'string',
                'values': ['Male', 'Female', 'Other'],
                'description': 'Gender identity'
            },
            'sleep_hours': {
                'type': 'number',
                'range': '0-24',
                'description': 'Average hours of sleep per night'
            },
            'screen_time_hours': {
                'type': 'number',
                'range': '0-24',
                'description': 'Average daily screen time in hours'
            },
            'study_hours': {
                'type': 'number',
                'range': '0-24',
                'description': 'Average daily study hours'
            },
            'physical_activity': {
                'type': 'integer',
                'values': [0, 1],
                'description': '0 for inactive, 1 for active'
            },
            'caffeine_intake': {
                'type': 'number',
                'range': '0-10',
                'description': 'Daily caffeine intake units'
            },
            'academic_pressure': {
                'type': 'integer',
                'values': [0, 1, 2],
                'description': '0=Low, 1=Medium, 2=High academic pressure'
            }
        }
    }), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)