from flask import Flask, request, jsonify
import os
import joblib

app = Flask(__name__)

# ---- Load model once ----
MODEL_PATH = os.path.join("models", "stressDetectionModel.joblib")


if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

model = joblib.load(MODEL_PATH)


# ---- Prediction functions (same as yours) ----
def predict_stress(model, sample_input: list) -> str:
    prediction = model.predict([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}
    return label_map.get(int(prediction), "Unknown")


def predict_stress_with_confidence(model, sample_input: list) -> dict:
    prediction = model.predict([sample_input])[0]
    probabilities = model.predict_proba([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}

    return {
        "predicted": label_map[int(prediction)],
        "confidence": {
            "Low": round(float(probabilities[0]), 3),
            "Medium": round(float(probabilities[1]), 3),
            "High": round(float(probabilities[2]), 3),
        }
    }


# ---- Flask Route ----
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Expecting JSON like:
        # {
        #   "age": 22,
        #   "gender": 1,
        #   "sleep_hours": 5.5,
        #   "screen_time_hours": 8.0,
        #   "study_hours": 7.4,
        #   "physical_activity": 0,
        #   "caffeine_intake": 3,
        #   "academic_pressure": 2
        # }

        required_fields = [
            "age", "gender", "sleep_hours", "screen_time_hours",
            "study_hours", "physical_activity", "caffeine_intake", "academic_pressure"
        ]

        # Validate input
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        sample_input = [
            data["age"],
            data["gender"],
            data["sleep_hours"],
            data["screen_time_hours"],
            data["study_hours"],
            data["physical_activity"],
            data["caffeine_intake"],
            data["academic_pressure"]
        ]

        result = predict_stress_with_confidence(model, sample_input)

        return jsonify({
            "stress_level": result["predicted"],
            "confidence": result["confidence"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
