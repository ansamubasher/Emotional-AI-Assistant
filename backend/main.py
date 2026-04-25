"""
Stress level inference — student_stress_sleep_screen model
Drop-in replacement for your existing inference script.
Same load_model / predict_stress / main pattern.
"""

import os
import joblib


def load_model(model_path: str):
    """Load a trained model from disk."""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    return joblib.load(model_path)


def predict_stress(model, sample_input: list) -> str:
    """
    Predict stress level for a single sample.

    sample_input order must match FEATURE_COLS from training:
      [age, gender, sleep_hours, screen_time_hours, study_hours,
       physical_activity, caffeine_intake, academic_pressure]

    gender:            0=Female, 1=Male, 2=Other  (check gender_classes.joblib)
    physical_activity: 1=Yes/True, 0=No/False
    academic_pressure: 0=Low, 1=Medium, 2=High
    """
    prediction = model.predict([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}
    return label_map.get(int(prediction), "Unknown")


def predict_stress_with_confidence(model, sample_input: list) -> dict:
    """Extended version — also returns probability per class."""
    prediction = model.predict([sample_input])[0]
    probabilities = model.predict_proba([sample_input])[0]
    label_map = {0: "Low", 1: "Medium", 2: "High"}
    return {
        "predicted": label_map[int(prediction)],
        "confidence": {
            "Low":    round(float(probabilities[0]), 3),
            "Medium": round(float(probabilities[1]), 3),
            "High":   round(float(probabilities[2]), 3),
        }
    }


def main() -> None:
    model_path = os.path.join("models", "stressDetectionModel.joblib")

    # ── Sample input — edit these values to test ──
    age               = 22
    gender            = 1       # 0=Female, 1=Male, 2=Other
    sleep_hours       = 5.5     # hours per night
    screen_time_hours = 8.0     # hours per day
    study_hours       = 7.4     # hours per day
    physical_activity = 0       # 1=Yes, 0=No
    caffeine_intake   = 3       # cups / units per day (0-4)
    academic_pressure = 2       # 0=Low, 1=Medium, 2=High

    sample_input = [
        age, gender, sleep_hours, screen_time_hours,
        study_hours, physical_activity, caffeine_intake, academic_pressure
    ]

    model  = load_model(model_path)
    stress = predict_stress(model, sample_input)
    result = predict_stress_with_confidence(model, sample_input)

    print(f"Sample input : {sample_input}")
    print(f"Predicted    : {stress}")
    print(f"Confidence   : Low={result['confidence']['Low']}  "
          f"Medium={result['confidence']['Medium']}  "
          f"High={result['confidence']['High']}")


if __name__ == "__main__":
    main()

    
# import os
# import joblib


# def load_model(model_path: str):
#     """Load a trained model from disk."""
#     if not os.path.exists(model_path):
#         raise FileNotFoundError(f"Model file not found: {model_path}")
#     return joblib.load(model_path)


# def predict_stress(model, sample_input):
#     """Predict the stress level for a sample input."""
#     prediction = model.predict([sample_input])[0]
#     label_map = {0: 'Low', 1: 'Moderate', 2: 'High'}
#     return label_map.get(prediction, 'Unknown')


# def main() -> None:
#     model_path = os.path.join('models', 'stressDetectionModel.joblib')

#     study_hours = 10
#     extracurricular_hours = 0
#     sleep_hours = 7.8
#     social_hours = 3.0
#     physical_activity_hours = 0.5
#     gpa = 3.65
#     sample_input = [study_hours, extracurricular_hours, sleep_hours, social_hours, physical_activity_hours, gpa]

#     model = load_model(model_path)
#     stress = predict_stress(model, sample_input)

#     print(f"Sample input: {sample_input}")
#     print(f"Predicted stress level: {stress}")


# if __name__ == '__main__':
#     main()
