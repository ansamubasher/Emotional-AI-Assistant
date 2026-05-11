from flask import Blueprint, Flask, request, jsonify
import os
import joblib

stress_level_bp = Blueprint("stress_level", __name__)

# ---- Load model once ----
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "xgboost_model.joblib")

if not os.path.exists(MODEL_PATH):
    MODEL_PATH = os.path.join("models", "xgboost_model.joblib")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)


# ---- Prediction functions ----
def predict_stress_level(model, sample_input: list) -> str:
    prediction = model.predict([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}
    return label_map.get(int(prediction), "Unknown")


def predict_stress_level_with_confidence(model, sample_input: list) -> dict:
    prediction = model.predict([sample_input])[0]
    probabilities = model.predict_proba([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}

    return {
        "predicted": label_map[int(prediction)],
        "confidence": {
            "Low": round(float(probabilities[0]), 3),
            "Medium": round(float(probabilities[1]), 3),
            "High": round(float(probabilities[2]), 3),
        },
    }


# ---- Flask Route ----
@stress_level_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Expecting JSON like:
        # {
        #   "anxiety_level": 3,
        #   "self_esteem": 20,
        #   "mental_health_history": 0,
        #   "depression": 2,
        #   "headache": 2,
        #   "blood_pressure": 1,
        #   "sleep_quality": 2,
        #   "breathing_problem": 1,
        #   "noise_level": 2,
        #   "living_conditions": 3,
        #   "safety": 3,
        #   "basic_needs": 3,
        #   "academic_performance": 2,
        #   "study_load": 3,
        #   "teacher_student_relationship": 3,
        #   "future_career_concerns": 3,
        #   "social_support": 2,
        #   "peer_pressure": 3,
        #   "extracurricular_activities": 2,
        #   "bullying": 2
        # }

        required_fields = [
            "anxiety_level",
            "self_esteem",
            "mental_health_history",
            "depression",
            "headache",
            "blood_pressure",
            "sleep_quality",
            "breathing_problem",
            "noise_level",
            "living_conditions",
            "safety",
            "basic_needs",
            "academic_performance",
            "study_load",
            "teacher_student_relationship",
            "future_career_concerns",
            "social_support",
            "peer_pressure",
            "extracurricular_activities",
            "bullying",
        ]

        # Validate all required fields are present
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Build input vector in the same column order as training (X = df.drop('stress_level'))
        sample_input = [
            data["anxiety_level"],
            data["self_esteem"],
            data["mental_health_history"],
            data["depression"],
            data["headache"],
            data["blood_pressure"],
            data["sleep_quality"],
            data["breathing_problem"],
            data["noise_level"],
            data["living_conditions"],
            data["safety"],
            data["basic_needs"],
            data["academic_performance"],
            data["study_load"],
            data["teacher_student_relationship"],
            data["future_career_concerns"],
            data["social_support"],
            data["peer_pressure"],
            data["extracurricular_activities"],
            data["bullying"],
        ]

        result = predict_stress_level_with_confidence(model, sample_input)

        return jsonify(
            {
                "stress_level": result["predicted"],
                "confidence": result["confidence"],
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(stress_level_bp)
    app.run(debug=True, port=5003)