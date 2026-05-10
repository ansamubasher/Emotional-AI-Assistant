from flask import Blueprint, request, jsonify
import sys
import os

# Add scripts folder to Python path
scripts_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'scripts')
scripts_path = os.path.abspath(scripts_path)
sys.path.insert(0, scripts_path)

from recommender import get_recommendations

recommendation_bp = Blueprint('recommendation', __name__)

@recommendation_bp.route('/predict', methods=['POST'])
def predict_stress():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'error': 'No data provided',
                'message': 'Please send JSON data with required features'
            }), 400
        
        result = get_recommendations(data)
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
            'message': str(e)
        }), 500


@recommendation_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Stress prediction API is running'
    }), 200


@recommendation_bp.route('/features', methods=['GET'])
def get_required_features():
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


@recommendation_bp.route('/my-stress', methods=['GET'])
def get_my_stress():
    """Get stress prediction using previously stored user data"""
    
    # Replace this with actual stored user data (from database/session/file)
    stored_user_data = {
        "age": 22,
        "gender": "Female",
        "sleep_hours": 5.5,
        "screen_time_hours": 8.0,
        "study_hours": 7.4,
        "physical_activity": 0,
        "caffeine_intake": 3,
        "academic_pressure": 2
    }
    
    # TODO: Replace above with actual data retrieval, like:
    # stored_user_data = get_user_data_from_database(user_id)
    # or
    # stored_user_data = session.get('user_data')
    
    result = get_recommendations(stored_user_data)
    
    return jsonify({
        'success': True,
        'data': result
    }), 200