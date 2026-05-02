import os
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib


def load_dataset(csv_path: str) -> pd.DataFrame:
    """Load the student lifestyle dataset from a CSV file."""
    return pd.read_csv(csv_path)


def perform_eda(df: pd.DataFrame) -> None:
    """Perform basic exploratory data analysis and print dataset summaries."""
    print("=== First 5 Rows ===")
    print(df.head(), end="\n\n")

    print("=== Dataset Info ===")
    df.info()
    print("\n=== Missing Values ===")
    print(df.isnull().sum(), end="\n\n")

    print("=== Stress Level Distribution ===")
    print(df['Stress_Level'].value_counts(), end="\n\n")


def preprocess_data(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    """Drop the Student_ID column and encode stress labels."""
    df = df.copy()
    if 'Student_ID' in df.columns:
        df = df.drop(columns=['Student_ID'])

    label_mapping = {'Low': 0, 'Moderate': 1, 'High': 2}
    df['Stress_Level'] = df['Stress_Level'].map(label_mapping)

    X = df.drop(columns=['Stress_Level'])
    y = df['Stress_Level']
    return X, y


def split_dataset(X: pd.DataFrame, y: pd.Series):
    """Split the dataset into training and test sets."""
    return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)


def train_random_forest(X_train: pd.DataFrame, y_train: pd.Series) -> RandomForestClassifier:
    """Train a Random Forest classifier."""
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model


def evaluate_model(model: RandomForestClassifier, X_test: pd.DataFrame, y_test: pd.Series) -> None:
    """Evaluate the trained model and print key metrics."""
    y_pred = model.predict(X_test)

    print("=== Evaluation Results ===")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")

    cm = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix:")
    print(cm)

    report = classification_report(y_test, y_pred, target_names=['Low', 'Moderate', 'High'])
    print("\nClassification Report:")
    print(report)


def plot_feature_importance(model: RandomForestClassifier, feature_names: list[str]) -> None:
    """Plot the feature importances from the Random Forest model."""
    importances = model.feature_importances_
    importance_df = pd.DataFrame({
        'Feature': feature_names,
        'Importance': importances
    }).sort_values(by='Importance', ascending=False)

    print("=== Feature Importances ===")
    for feature, importance in zip(importance_df['Feature'], importance_df['Importance']):
        print(f"{feature}: {importance:.4f}")

    plt.figure(figsize=(10, 6))
    plt.barh(importance_df['Feature'], importance_df['Importance'], color='skyblue')
    plt.xlabel('Importance')
    plt.title('Feature Importance for Student Stress Classification')
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig('models/stress_detection_feature_importance.png')
    plt.show()


def save_model(model: RandomForestClassifier, model_path: str) -> None:
    """Save the trained Random Forest model to disk."""
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    print(f"Trained model saved to: {model_path}")


def main() -> None:
    dataset_path = os.path.join('data', 'student_lifestyle_dataset.csv')
    model_path = os.path.join('models', 'stressDetectionModel.joblib')

    df = load_dataset(dataset_path)
    perform_eda(df)

    X, y = preprocess_data(df)
    X_train, X_test, y_train, y_test = split_dataset(X, y)

    model = train_random_forest(X_train, y_train)
    evaluate_model(model, X_test, y_test)
    plot_feature_importance(model, X.columns.tolist())
    save_model(model, model_path)


if __name__ == '__main__':
    main()
