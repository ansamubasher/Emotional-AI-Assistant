import os
import pandas as pd
import joblib
from collections import Counter

# ----------------------------------------------------------------------
# 1. Get script directory and base paths
# ----------------------------------------------------------------------

import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))  # → .../scripts/
BASE_DIR = os.path.dirname(SCRIPT_DIR)                   # → .../ai backend/

MODEL_DIR = os.path.join(BASE_DIR, "flask_api", "models")  # ← add "flask_api" here
DATA_DIR = os.path.join(BASE_DIR, "data")


STRESS_MODEL_PATH = os.path.join(MODEL_DIR, "stressDetectionModel.joblib")
FEATURE_COLS_PATH = os.path.join(MODEL_DIR, "stress_feature_cols.joblib")
GENDER_CLASSES_PATH = os.path.join(MODEL_DIR, "gender_classes.joblib")

# ----------------------------------------------------------------------
# 2. Load models
# ----------------------------------------------------------------------
stress_model = joblib.load(STRESS_MODEL_PATH)
FEATURE_COLS = joblib.load(FEATURE_COLS_PATH)
GENDER_CLASSES = joblib.load(GENDER_CLASSES_PATH)

# ----------------------------------------------------------------------
# 3. Load and clean psychological dataset
# ----------------------------------------------------------------------
PSYCH_CSV = os.path.join(DATA_DIR, "Psychological_Assessment_Dataset.csv")
psych_df = pd.read_csv(PSYCH_CSV)

# Clean column names: keep only the part before colon (if any)
psych_df.columns = [col.split(':')[0].strip() for col in psych_df.columns]

# Now columns are e.g. "Coping Strategies", "Condition Summary", etc.
condition_to_stress = {
    "Mood Disorders": "High",
    "Generalized Anxiety Disorder": "High",
    "Post-Traumatic Stress Disorder": "High",
    "Stress-Related Conditions": "Medium",
    "Sleep Disorders": "Medium",
    "Cognitive Impairments": "Medium",
    "Eating Disorders": "Medium",
    "Coping and Resilience": "Low",
    "General Mental Health": "Low"
}

psych_df["stress_level_inferred"] = psych_df["Condition Summary"].map(condition_to_stress)

# Build top coping strategies per stress level
top_strategies = {}
for level in ["Low", "Medium", "High"]:
    subset = psych_df[psych_df["stress_level_inferred"] == level]
    strategies = [s.strip().lower() for s in subset["Coping Strategies"].dropna()]
    counts = Counter(strategies).most_common(5)
    top_strategies[level] = [s for s, _ in counts]

# ----------------------------------------------------------------------
# 4. Configurable thresholds
# ----------------------------------------------------------------------
THRESHOLDS = {
    "sleep_low": 6,
    "sleep_high": 9,
    "screen_high": 8,
    "caffeine_high": 3,
    "academic_pressure_high": 2,
    "study_low": 2
}

# ----------------------------------------------------------------------
# 5. Validation helper
# ----------------------------------------------------------------------
def _validate_features(features: dict) -> None:
    missing = [col for col in FEATURE_COLS if col not in features]
    if missing:
        raise KeyError(f"Missing features: {missing}")

    numeric_cols = ["age", "sleep_hours", "screen_time_hours", "study_hours", "caffeine_intake"]
    for col in numeric_cols:
        if col in features and not isinstance(features[col], (int, float)):
            raise ValueError(f"{col} must be a number, got {type(features[col]).__name__}")

    if not isinstance(features.get("physical_activity"), int):
        raise ValueError("physical_activity must be an integer (0 or 1)")
    if not isinstance(features.get("academic_pressure"), int):
        raise ValueError("academic_pressure must be an integer (0, 1, 2)")

    if not (0 <= features["age"] <= 100):
        raise ValueError("age must be between 0 and 100")
    if not (0 <= features["sleep_hours"] <= 24):
        raise ValueError("sleep_hours must be between 0 and 24")
    if not (0 <= features["screen_time_hours"] <= 24):
        raise ValueError("screen_time_hours must be between 0 and 24")
    if not (0 <= features["study_hours"] <= 24):
        raise ValueError("study_hours must be between 0 and 24")
    if features["physical_activity"] not in (0, 1):
        raise ValueError("physical_activity must be 0 or 1")
    if features["academic_pressure"] not in (0, 1, 2):
        raise ValueError("academic_pressure must be 0, 1, or 2")
    if not (0 <= features["caffeine_intake"] <= 10):
        raise ValueError("caffeine_intake must be between 0 and 10")

    gender_map = {v: i for i, v in enumerate(GENDER_CLASSES)}
    if features["gender"] not in gender_map:
        raise ValueError(f"Invalid gender '{features['gender']}'. Expected one of {list(gender_map.keys())}")

# ----------------------------------------------------------------------
# 6. Stress prediction
# ----------------------------------------------------------------------
def predict_stress_level(features_dict: dict) -> str:
    features = features_dict.copy()
    _validate_features(features)

    gender_map = {v: i for i, v in enumerate(GENDER_CLASSES)}
    features["gender"] = gender_map[features["gender"]]

    input_data = pd.DataFrame(
        [[features[col] for col in FEATURE_COLS]],
        columns=FEATURE_COLS
    )
    pred_class = stress_model.predict(input_data)[0]
    return {0: "Low", 1: "Medium", 2: "High"}[pred_class]

# ----------------------------------------------------------------------
# 7. Full recommendation
# ----------------------------------------------------------------------
def get_recommendations(features_dict: dict) -> dict:
    stress_level = predict_stress_level(features_dict)
    strategies = top_strategies.get(stress_level, [])
    tips = []

    sleep = features_dict["sleep_hours"]
    if sleep < THRESHOLDS["sleep_low"]:
        tips.append(f"Get at least {THRESHOLDS['sleep_low']} hours of sleep. Maintain a consistent bedtime and limit evening screen use.")
    elif sleep > THRESHOLDS["sleep_high"]:
        tips.append("More than 9 hours of sleep may indicate low energy. Try to increase daytime activity and consult a doctor if this persists.")

    if features_dict["screen_time_hours"] > THRESHOLDS["screen_high"]:
        tips.append("High screen time is linked to stress. Take a 5‑minute break every hour and reduce social media use in the evening.")

    if features_dict["physical_activity"] == 0:
        tips.append("You are not physically active. Even a 10‑minute daily walk can lower cortisol levels.")
    else:
        tips.append("Great that you are physically active – keep it up! It naturally reduces stress.")

    if features_dict["caffeine_intake"] > THRESHOLDS["caffeine_high"]:
        tips.append("Caffeine intake above 3 units per day can worsen anxiety. Switch to decaf or herbal tea after 2 pm.")

    if features_dict["academic_pressure"] == THRESHOLDS["academic_pressure_high"]:
        tips.append("High academic pressure is a major stressor. Break large tasks into small chunks and talk to your teachers or counsellors.")

    if stress_level != "Low" and features_dict["study_hours"] < THRESHOLDS["study_low"]:
        tips.append("Your study hours are very low. Set a daily 20‑minute study goal to rebuild momentum without overwhelming yourself.")

    return {
        "predicted_stress_level": stress_level,
        "general_coping_strategies": [s.capitalize() for s in strategies],
        "personalised_tips": tips
    }

# ----------------------------------------------------------------------
# 8. Quick test
# ----------------------------------------------------------------------
if __name__ == "__main__":
    sample = {
        "age": 22,
        "gender": "Female",
        "sleep_hours": 5.5,
        "screen_time_hours": 8.0,
        "study_hours": 7.4,
        "physical_activity": 0,
        "caffeine_intake": 3,
        "academic_pressure": 2
    }
    result = get_recommendations(sample)
    print(f"Predicted stress: {result['predicted_stress_level']}")
    print("\nGeneral coping strategies:")
    for s in result["general_coping_strategies"]:
        print("  •", s)
    print("\nPersonalised tips:")
    for tip in result["personalised_tips"]:
        print("  •", tip)