
# PART III — MACHINE LEARNING


# Chapter 9: Introduction to Machine Learning

> **📋 Prerequisites:** Chapter 2 (Python basics), Chapter 4 (NumPy arrays), Chapter 5 (Pandas DataFrames).


## 9.1 — What Is Machine Learning?

Traditional programming: you write rules → computer follows them → output.

Machine learning: you provide data + desired output → computer learns the rules automatically.


## 9.2 — Types of Machine Learning

> 💡 **Why This Matters:** Identifying the learning type first determines everything: which algorithms to try, how to measure success, and what data you need to collect. Skipping this step is one of the most common reasons projects fail.


## 9.3 — The ML Workflow

1. Define the problem: What are you predicting? What data do you have?
1. Collect & prepare data: Load, clean, encode, scale.
1. Split data: Train set (70–80%), Validation set (10–15%), Test set (10–15%).
1. Choose a model: Based on problem type and data characteristics.
1. Train the model: Fit it on training data only.
1. Evaluate: Measure performance on the held-out test set.
1. Tune: Adjust hyperparameters to improve performance.
1. Deploy: Serve the model for real-world use.

## 9.4 — Bias-Variance Tradeoff

This is the fundamental tradeoff in machine learning — every model faces it, and understanding it separates good data scientists from great ones.

```python
# Visualizing underfitting vs good fit vs overfitting
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
X = np.sort(np.random.rand(30, 1), axis=0)
y = np.sin(2 * np.pi * X).ravel() + np.random.randn(30) * 0.3
X_plot = np.linspace(0, 1, 100).reshape(-1, 1)

degrees = [1, 4, 15]   # degree 1 = underfit | 4 = good | 15 = overfit
labels  = ['Degree 1 (Underfit)', 'Degree 4 (Good Fit)', 'Degree 15 (Overfit)']

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for ax, degree, label in zip(axes, degrees, labels):
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(X, y)
    ax.scatter(X, y, color='steelblue', alpha=0.7, label='Data')
    ax.plot(X_plot, model.predict(X_plot), color='red', lw=2)
    ax.set_title(label, fontsize=12)
    ax.set_ylim(-2, 2)
plt.suptitle('Bias-Variance Tradeoff Visualized', fontsize=14)
plt.tight_layout()
plt.show()
```
> 💡 **Why This Matters:** Every hyperparameter you tune (depth of a tree, regularization strength, number of neurons) is essentially a dial on the bias-variance tradeoff. Knowing this lets you debug model failures systematically: high train error = increase complexity; low train error + high test error = reduce complexity.


## 9.5 — Train/Test Split & Cross-Validation

```python
# Train-Test Split — the foundation of honest model evaluation
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% for testing
    random_state=42,     # Reproducibility
    stratify=y           # Classification: maintain class ratios
)
print(f'Train size: {len(X_train)}, Test size: {len(X_test)}')
```

```
# Output:
# Train size: 712, Test size: 179
```

```python

# K-Fold Cross-Validation — more reliable than a single split
# Trains 5 models, each on a different 80/20 partition, averages results
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

model = LinearRegression()
scores = cross_val_score(model, X, y, cv=5, scoring='r2')
print(f'CV Scores: {scores.round(3)}')
print(f'Mean: {scores.mean():.3f} +/- {scores.std():.3f}')
```

```
# Output:
# CV Scores: [0.812 0.798 0.823 0.805 0.817]
# Mean: 0.811 +/- 0.009
```

## 9.6 — The Scikit-learn API

Scikit-learn has a beautifully consistent API. Every model follows the same four-step pattern — once you learn it for one algorithm, you know it for all of them.

```python
# The Scikit-learn API — same pattern for EVERY model
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.cluster import KMeans

# Step 1: Create the model (set hyperparameters)
model = LinearRegression()

# Step 2: Train (fit) — ONLY on training data
model.fit(X_train, y_train)

# Step 3: Make predictions
y_pred = model.predict(X_test)

# Step 4: Evaluate
score = model.score(X_test, y_test)
print(f'R2 Score: {score:.3f}')
```

```
# Output:
# R2 Score: 0.814
```

## 9.7 — Data Preprocessing

```python
# Feature Scaling — essential for distance-based and gradient-based algorithms
# (KNN, SVM, Neural Nets, Logistic Regression all need it)
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# StandardScaler: z-score normalization (mean=0, std=1)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)   # fit AND transform
X_test_scaled  = scaler.transform(X_test)         # transform ONLY — no fit!

# MinMaxScaler: scales to [0, 1]
mm_scaler = MinMaxScaler()
X_train_mm = mm_scaler.fit_transform(X_train)
X_test_mm  = mm_scaler.transform(X_test)

# Encoding categorical variables
import pandas as pd

# pd.get_dummies() — quick exploration (use in notebooks)
df = pd.get_dummies(df, columns=['color', 'size'], drop_first=True)

# OneHotEncoder inside a Pipeline — production standard
# (covered in detail in Chapter 14)
from sklearn.preprocessing import OneHotEncoder
enc = OneHotEncoder(handle_unknown='ignore', sparse_output=False)

# Decision guide for encoding:
# pd.get_dummies()   -> quick EDA / exploration
# OneHotEncoder      -> inside Pipeline for production
# LabelEncoder       -> ONLY for ordinal data (S < M < L < XL)
# NEVER LabelEncoder -> for nominal data (red/blue/green has no order)
```

## 9.8 — Learning Curves — Diagnosing Your Model

A learning curve plots model performance vs training set size. It tells you whether you need more data or a more complex model.

```python
# Learning curve — is the model underfitting or overfitting?
from sklearn.model_selection import learning_curve
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import matplotlib.pyplot as plt

train_sizes, train_scores, val_scores = learning_curve(
    RandomForestClassifier(n_estimators=100, random_state=42),
    X, y, cv=5,
    train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='accuracy'
)

fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(train_sizes, train_scores.mean(axis=1), 'o-', label='Training score', color='blue')
ax.fill_between(train_sizes,
                train_scores.mean(axis=1) - train_scores.std(axis=1),
                train_scores.mean(axis=1) + train_scores.std(axis=1), alpha=0.1, color='blue')
ax.plot(train_sizes, val_scores.mean(axis=1), 'o-', label='Validation score', color='red')
ax.fill_between(train_sizes,
                val_scores.mean(axis=1) - val_scores.std(axis=1),
                val_scores.mean(axis=1) + val_scores.std(axis=1), alpha=0.1, color='red')
ax.set_xlabel('Training set size')
ax.set_ylabel('Accuracy')
ax.set_title('Learning Curve')
ax.legend()
plt.show()

# Interpretation guide:
# Both curves LOW -> underfitting -> try a more complex model
# Train HIGH, Val LOW, gap persists -> overfitting -> regularize or get more data
# Both curves HIGH and converging -> healthy model
```

## 9.9 — Hands-On Exercises

1. Load the Iris dataset. Split it 80/20 with stratify=y. Apply StandardScaler. Train a DecisionTreeClassifier. Report accuracy on both train and test sets — is the model overfitting?
1. Experiment with polynomial regression on the tips dataset. Try degrees 1, 3, 5, and 10. Plot the learning curve for each degree and identify where overfitting begins.
1. Implement 5-fold cross-validation for 3 different models on the same dataset. Compare their mean and standard deviation of scores. Which model is most consistent?
1. Create a Pipeline that combines preprocessing (StandardScaler + OneHotEncoder) with a classifier into a single object. Confirm that fitting the pipeline on train data does not touch the test set.

## 9.10 — Mini Project: First ML Pipeline

Build a complete ML pipeline on the Titanic dataset to predict survival:

- Step 1: Load and clean data (handle missing values, encode 'Sex' and 'Embarked')
- Step 2: EDA — which features correlate most with survival?
- Step 3: Build a Pipeline: SimpleImputer → StandardScaler → Classifier
- Step 4: Train 3 different models, compare with 5-fold cross-validation
- Step 5: Report — accuracy, confusion matrix, and which features mattered most
- Step 6: Plot learning curves for your best model. Does it need more data?

## 9.11 — Key Terms


## 9.12 — Interview Questions


### Basic

- What is the difference between supervised and unsupervised learning?
- What is overfitting? How do you detect it?
- What is the purpose of a test set? Why must you never train on it?

### Intermediate

- Explain the bias-variance tradeoff using a concrete example.
- What is cross-validation and why is it more reliable than a single train-test split?
- Why should you fit the scaler ONLY on training data and not on the full dataset?
- What is the difference between a parameter and a hyperparameter?

### Advanced

- What is data leakage? Give a concrete real-world example and explain how to prevent it.
- How would you handle severe class imbalance (e.g., 99% negative, 1% positive) in a classification problem?
- Explain the No Free Lunch theorem. What does it imply for algorithm selection?

## 9.13 — Summary

- ML lets computers learn patterns from data rather than following explicit rules.
- Types: Supervised (labeled data), Unsupervised (unlabeled), Reinforcement (rewards).
- Bias-variance tradeoff: underfitting (too simple) vs overfitting (too complex). Use learning curves to diagnose.
- Always split data into train/test; use cross-validation for a reliable performance estimate.
- Scikit-learn API: instantiate → fit → predict → score. The same pattern for every algorithm.
- CRITICAL: Fit scalers/encoders only on training data; transform test data separately.
> **➡️ What's Next:** Chapter 10 dives into Regression — predicting continuous values like prices, temperatures, and scores. We'll cover linear regression from mathematical intuition through implementation to regularization techniques that prevent overfitting.

---
