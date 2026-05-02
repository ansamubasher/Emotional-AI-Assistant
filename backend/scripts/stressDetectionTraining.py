"""
Stress Level Classifier — student_stress_sleep_screen dataset
Target:  stress_level (Low / Medium / High)
Model:   RandomForestClassifier
Output:  models/stressDetectionModel.joblib  (same path your existing code expects)
"""

import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# ──────────────────────────────────────────────
# 1. LOAD
# ──────────────────────────────────────────────
CSV_PATH = os.path.join('data', 'student_stress_sleep_screen.csv')
model_path = os.path.join('models', 'student_stress_sleep_screen.csv.joblib')

df = pd.read_csv(CSV_PATH)
print(f"Loaded {len(df)} rows")
print(f"Columns: {df.columns.tolist()}\n")

# Drop the ID column — not a feature
if "student_id" in df.columns:
    df.drop(columns=["student_id"], inplace=True)

# ──────────────────────────────────────────────
# 2. ENCODE CATEGORICALS
# ──────────────────────────────────────────────

# Gender: Male / Female / Other → 0 / 1 / 2
le_gender = LabelEncoder()
df["gender"] = le_gender.fit_transform(df["gender"].astype(str))
gender_classes = le_gender.classes_.tolist()
print(f"Gender encoding: { {v: i for i, v in enumerate(gender_classes)} }")

# Academic pressure: Low / Medium / High → 0 / 1 / 2
pressure_map = {"Low": 0, "Medium": 1, "High": 2}
df["academic_pressure"] = df["academic_pressure"].map(pressure_map)

# Physical activity: handles Yes/No strings, True/False strings, and actual booleans
# Convert to string first to normalise across pandas object, StringDtype, and bool dtypes
df["physical_activity"] = (
    df["physical_activity"]
    .astype(str)
    .str.strip()
    .str.lower()
    .map({"yes": 1, "no": 0, "true": 1, "false": 0, "1": 1, "0": 0})
    .fillna(0)
    .astype(int)
)

# Target: stress_level Low / Medium / High → 0 / 1 / 2
target_map = {"Low": 0, "Medium": 1, "High": 2}
df["stress_level"] = df["stress_level"].map(target_map)

print(f"\nStress level distribution:")
print(df["stress_level"].value_counts().rename({0:"Low",1:"Medium",2:"High"}).to_string())

# ──────────────────────────────────────────────
# 3. FEATURES — same order used at inference time
# ──────────────────────────────────────────────
FEATURE_COLS = [
    "age",
    "gender",
    "sleep_hours",
    "screen_time_hours",
    "study_hours",
    "physical_activity",
    "caffeine_intake",
    "academic_pressure",
]

X = df[FEATURE_COLS].fillna(df[FEATURE_COLS].median())
y = df["stress_level"]

print(f"\nFeatures ({len(FEATURE_COLS)}): {FEATURE_COLS}")

# ──────────────────────────────────────────────
# 4. TRAIN / TEST SPLIT
# ──────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"\nTrain: {len(X_train)} | Test: {len(X_test)}")

# ──────────────────────────────────────────────
# 5. TRAIN
# ──────────────────────────────────────────────
print("\nTraining RandomForestClassifier...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    min_samples_leaf=3,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)
model.fit(X_train, y_train)
print("Training complete.")

# ──────────────────────────────────────────────
# 6. EVALUATE
# ──────────────────────────────────────────────
y_pred = model.predict(X_test)

print("\n── Classification report ──")
print(classification_report(y_test, y_pred, target_names=["Low", "Medium", "High"]))

print("── Confusion matrix (rows=actual, cols=predicted) ──")
cm = confusion_matrix(y_test, y_pred)
cm_df = pd.DataFrame(cm, index=["Actual Low","Actual Med","Actual High"],
                          columns=["Pred Low","Pred Med","Pred High"])
print(cm_df.to_string())

cv_scores = cross_val_score(model, X, y, cv=5, scoring="f1_macro")
print(f"\n5-fold cross-val macro F1: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ──────────────────────────────────────────────
# 7. FEATURE IMPORTANCE
# ──────────────────────────────────────────────
feat_imp = pd.Series(model.feature_importances_, index=FEATURE_COLS).sort_values(ascending=False)
print("\n── Feature importances ──")
print(feat_imp.round(4).to_string())

# ──────────────────────────────────────────────
# 8. EXPORT  ← same filename your existing code loads
# ──────────────────────────────────────────────
os.makedirs("models", exist_ok=True)
joblib.dump(model,        "models/stressDetectionModel.joblib")
joblib.dump(FEATURE_COLS, "models/stress_feature_cols.joblib")
joblib.dump(gender_classes, "models/gender_classes.joblib")
print("\nSaved: models/stressDetectionModel.joblib")
print("Saved: models/stress_feature_cols.joblib")
print("Saved: models/gender_classes.joblib")