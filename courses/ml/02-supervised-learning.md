# Supervised Learning in Depth

Supervised learning is the most widely used type of ML. You train models on labeled examples and they learn to predict labels for new, unseen data.

## Linear Regression

The simplest ML algorithm — predicts a **continuous** value.

```
y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
```

Where `w` are weights (learned), `x` are features, and `b` is bias.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Generate sample data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

print(f"Coefficient (slope): {model.coef_[0][0]:.2f}")
print(f"Intercept: {model.intercept_[0]:.2f}")

# Evaluate
y_pred = model.predict(X_test)
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")
print(f"R²: {r2_score(y_test, y_pred):.4f}")
```

## Logistic Regression

Despite the name, this is a **classification** algorithm — it predicts probabilities.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.metrics import classification_report, roc_auc_score

# Generate binary classification data
X, y = make_classification(n_samples=1000, n_features=10, 
                            n_informative=5, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train
clf = LogisticRegression(max_iter=1000, random_state=42)
clf.fit(X_train, y_train)

# Predictions
y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print(f"AUC-ROC: {roc_auc_score(y_test, y_proba):.4f}")
```

## Decision Trees & Random Forests

### Decision Tree

```python
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.datasets import load_wine

data = load_wine()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Limit depth to prevent overfitting
tree = DecisionTreeClassifier(max_depth=4, min_samples_split=10, random_state=42)
tree.fit(X_train, y_train)

print(f"Train accuracy: {tree.score(X_train, y_train):.2%}")
print(f"Test accuracy:  {tree.score(X_test, y_test):.2%}")

# View feature importances
for name, importance in zip(data.feature_names, tree.feature_importances_):
    print(f"{name}: {importance:.3f}")
```

### Random Forest — Ensemble of Trees

```python
from sklearn.ensemble import RandomForestClassifier

# Random Forest = many decision trees, each on a random subset of data
rf = RandomForestClassifier(
    n_estimators=100,    # Number of trees
    max_depth=6,
    max_features='sqrt', # Features per split
    n_jobs=-1,           # Use all CPU cores
    random_state=42
)
rf.fit(X_train, y_train)

print(f"Test accuracy: {rf.score(X_test, y_test):.2%}")
```

## Support Vector Machines (SVM)

SVMs find the optimal **hyperplane** that separates classes with the maximum margin.

```python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# SVM requires feature scaling
svm_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', SVC(kernel='rbf', C=1.0, gamma='scale', probability=True))
])

svm_pipeline.fit(X_train, y_train)
print(f"SVM accuracy: {svm_pipeline.score(X_test, y_test):.2%}")
```

## Cross-Validation

Never evaluate your model on training data — use cross-validation.

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold

# 5-fold cross-validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(rf, X, y, cv=cv, scoring='accuracy')

print(f"CV Scores: {scores}")
print(f"Mean: {scores.mean():.2%} (+/- {scores.std() * 2:.2%})")
```

## Hyperparameter Tuning

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Grid search — tries all combinations (slow but thorough)
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)
grid_search.fit(X_train, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.2%}")

# Use best model
best_model = grid_search.best_estimator_
```

## Pipelines — Production-Ready Code

```python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import GradientBoostingClassifier

# Complete preprocessing + model pipeline
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),  # Handle missing values
    ('scaler', StandardScaler()),                    # Scale features
    ('model', GradientBoostingClassifier(           # Final model
        n_estimators=100,
        learning_rate=0.1,
        max_depth=3
    ))
])

pipeline.fit(X_train, y_train)
print(f"Pipeline accuracy: {pipeline.score(X_test, y_test):.2%}")

# Save the pipeline
import joblib
joblib.dump(pipeline, 'model_pipeline.pkl')

# Load and predict on new data
loaded_model = joblib.load('model_pipeline.pkl')
predictions = loaded_model.predict(X_new)
```

## When to Use What?

| Scenario | Recommended Algorithm |
|----------|-----------------------|
| Few features, interpretable | Decision Tree |
| General tabular data | Random Forest / XGBoost |
| High-dimensional data | SVM, Logistic Regression |
| Large datasets | Gradient Boosting, Neural Nets |
| Need probabilities | Logistic Regression, Random Forest |

## Summary

Supervised learning covers classification and regression tasks. Key takeaways:
- Always split your data into train/test sets
- Use cross-validation for reliable evaluation
- Tune hyperparameters systematically
- Use pipelines for clean, reproducible code

**Next Lesson →** Unsupervised Learning & Clustering
