# Introduction to Machine Learning

Machine Learning is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed.

## What is Machine Learning?

Traditional programming: **Data + Rules → Output**
Machine Learning: **Data + Output → Rules**

Instead of coding every rule, you feed examples to an algorithm and it learns the patterns.

## Types of Machine Learning

### 1. Supervised Learning
The model learns from **labeled** training data.

**Examples:**
- Email spam detection (spam / not spam)
- House price prediction
- Image classification

### 2. Unsupervised Learning
The model finds patterns in **unlabeled** data.

**Examples:**
- Customer segmentation
- Anomaly detection
- Topic modeling

### 3. Reinforcement Learning
The model learns by **trial and error**, receiving rewards or penalties.

**Examples:**
- Game playing (Chess, Go, video games)
- Robot navigation
- Recommendation systems

## The Machine Learning Workflow

```
1. Define Problem
2. Collect Data
3. Prepare Data (clean, transform, split)
4. Choose Algorithm
5. Train Model
6. Evaluate Model
7. Tune Hyperparameters
8. Deploy
```

## Your First ML Model

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. Load data
iris = load_iris()
X, y = iris.data, iris.target

# 2. Split into train/test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Create and train the model
model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

# 4. Make predictions
y_pred = model.predict(X_test)

# 5. Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2%}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
```

## Key Concepts

### Overfitting vs Underfitting

```
Underfitting:          Good Fit:          Overfitting:
Model too simple    Model just right    Model too complex
High bias           Low bias            Low bias
Low variance        Low variance        High variance
Bad on train data   Good on all data    Great on train data
                                        Bad on new data
```

### Train/Validation/Test Split

```python
# Always split your data!
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5)

# Typical split: 70% train / 15% validation / 15% test
```

### Feature Scaling

Many ML algorithms require scaled features:

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization (mean=0, std=1) — use for most algorithms
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Only transform, don't fit!

# Normalization (0 to 1) — use for neural networks
min_max = MinMaxScaler()
X_normalized = min_max.fit_transform(X_train)
```

## Evaluation Metrics

### Classification

```python
from sklearn.metrics import confusion_matrix, roc_auc_score

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
# [[TN, FP],
#  [FN, TP]]

# Key metrics
# Accuracy = (TP + TN) / Total
# Precision = TP / (TP + FP)  — "Of predicted positives, how many were right?"
# Recall = TP / (TP + FN)     — "Of actual positives, how many did we catch?"
# F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

### Regression

```python
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)  # 1.0 = perfect, 0 = baseline mean

print(f"RMSE: {rmse:.2f}")
print(f"R² Score: {r2:.4f}")
```

## Algorithm Cheat Sheet

| Algorithm | Type | Best For | Weakness |
|-----------|------|---------|---------|
| Linear Regression | Supervised | Continuous prediction | Assumes linearity |
| Logistic Regression | Supervised | Binary classification | Non-linear data |
| Decision Tree | Supervised | Interpretable models | Overfitting |
| Random Forest | Supervised | General purpose | Less interpretable |
| SVM | Supervised | High-dimensional data | Slow on large data |
| K-Means | Unsupervised | Clustering | Must specify K |
| Neural Networks | Supervised | Complex patterns | Needs lots of data |

## Summary

Machine learning is about finding patterns in data and using them to make predictions. The key is understanding when to apply which technique and how to properly evaluate your models.

**Next Lesson →** Supervised Learning in Depth
