
# Chapter 11: Supervised Learning — Classification

> **📋 Prerequisites:** Chapter 9 (ML fundamentals, train/test split), Chapter 10 (Scikit-learn API and Pipelines).


## 11.1 — What Is Classification?

Classification predicts which category or class a new data point belongs to. Unlike regression, the output is a discrete label, not a continuous number.


## 11.2 — Evaluation Metrics First

Accuracy alone is often misleading — especially with imbalanced data. Here's the full picture. Always choose your metric BEFORE training your model.

```python
# Understanding the Confusion Matrix — ALWAYS start here

# Actual vs Predicted 2x2 grid:
#                     Predicted NO    Predicted YES
#   Actual NO:     [True Negative (TN)  |  False Positive (FP)]
#   Actual YES:    [False Negative (FN)  |  True Positive (TP) ]

# Derived metrics:
# Precision = TP / (TP + FP)  -> of predicted positives, how many are correct?
# Recall    = TP / (TP + FN)  -> of actual positives, how many did we catch?
# F1 Score  = 2 * (P * R) / (P + R)  -> harmonic mean
# Accuracy  = (TP + TN) / total      -> misleading with imbalanced classes
```

## 11.3 — Logistic Regression

Despite the name, Logistic Regression is a classification algorithm. It models the probability of a binary outcome using the sigmoid function, which squashes any value into [0, 1]. Output > 0.5 = positive class.

```python
# Logistic Regression for Titanic survival prediction
import pandas as pd, numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns, matplotlib.pyplot as plt

# Load and prepare Titanic data
df = pd.read_csv('titanic.csv')
df['Sex']  = (df['Sex'] == 'male').astype(int)
df['Age'].fillna(df['Age'].median(), inplace=True)
features  = ['Pclass', 'Sex', 'Age', 'Fare', 'SibSp', 'Parch']
X, y = df[features], df['Survived']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

pipeline = Pipeline([('scaler', StandardScaler()),
                     ('clf',    LogisticRegression(random_state=42, max_iter=1000))])
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

print(classification_report(y_test, y_pred, target_names=['Died', 'Survived']))
```

```
# Output:
#               precision    recall  f1-score   support
#         Died       0.82      0.87      0.85       111
#     Survived       0.78      0.70      0.74        68
#     accuracy                           0.81       179
```

```python
# Confusion Matrix Visualization
cm = confusion_matrix(y_test, y_pred)
fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax,
            xticklabels=['Predicted: Died', 'Predicted: Survived'],
            yticklabels=['Actual: Died',    'Actual: Survived'])
ax.set_title('Confusion Matrix')
plt.tight_layout(); plt.show()
```

```
# Output grid (example values):
#  [[97, 14],   <- 97 correct 'Died', 14 predicted Survived but actually Died
#   [20, 48]]   <- 20 missed survivors, 48 correct 'Survived'
```

```python
# ROC Curve — threshold-independent model comparison
from sklearn.metrics import roc_curve, roc_auc_score

y_prob = pipeline.predict_proba(X_test)[:, 1]   # probability of class 1 (Survived)
fpr, tpr, _ = roc_curve(y_test, y_prob)
auc = roc_auc_score(y_test, y_prob)

plt.figure(figsize=(7, 5))
plt.plot(fpr, tpr, label=f'Logistic Regression (AUC = {auc:.3f})', lw=2)
plt.plot([0, 1], [0, 1], 'k--', label='Random (AUC = 0.500)')
plt.xlabel('False Positive Rate'); plt.ylabel('True Positive Rate')
plt.title('ROC Curve'); plt.legend(); plt.show()
```

```
# AUC = 0.872  -> strong model (perfect = 1.0, random = 0.5)
```

## 11.4 — Decision Trees

A Decision Tree splits the data on feature thresholds, creating a tree of if/else decisions. Highly interpretable — you can visualize exactly why any prediction was made.

```python
# Decision Tree with feature importance
from sklearn.tree import DecisionTreeClassifier, plot_tree

tree = DecisionTreeClassifier(max_depth=4, random_state=42)
tree.fit(X_train, y_train)
print(f'Train Accuracy: {tree.score(X_train, y_train):.4f}')
print(f'Test  Accuracy: {tree.score(X_test,  y_test):.4f}')
```

```
# Train Accuracy: 0.9242  <- potential overfitting
# Test  Accuracy: 0.8156
```

```python

# Feature importance — which features matter most?
importances = pd.Series(tree.feature_importances_, index=features)
importances.sort_values(ascending=True).plot(kind='barh', figsize=(8, 4))
plt.title('Feature Importances (Decision Tree)'); plt.show()
```

```
# Typically: Sex, Fare, and Age are the top 3 predictors of Titanic survival
```

## 11.5 — K-Nearest Neighbors (KNN)

KNN classifies a point based on the majority class of its K nearest neighbors. Simple and intuitive — like asking your K closest friends for a recommendation.

> 💡 **Why This Matters:** KNN requires no training phase (it just memorizes the data), but it's slow at prediction time for large datasets. It's also highly sensitive to scale — always use StandardScaler before KNN.

```python
# Find the optimal K with a validation loop
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

k_range = range(1, 31)
scores  = []
for k in k_range:
    knn = Pipeline([('scaler', StandardScaler()),
                    ('clf', KNeighborsClassifier(n_neighbors=k))])
    knn.fit(X_train, y_train)
    scores.append(knn.score(X_test, y_test))

optimal_k = list(k_range)[scores.index(max(scores))]
print(f'Optimal K: {optimal_k}, Accuracy: {max(scores):.4f}')
```

```
# Optimal K: 11, Accuracy: 0.8101
```

```python

plt.plot(list(k_range), scores, 'bo-', markersize=6)
plt.axvline(optimal_k, color='red', linestyle='--', label=f'Best K={optimal_k}')
plt.xlabel('K'); plt.ylabel('Accuracy'); plt.title('K vs Accuracy'); plt.legend(); plt.show()
```

## 11.6 — Support Vector Machine (SVM)

SVM finds the hyperplane that maximally separates classes — the 'widest street' between them. Points on the boundary are called support vectors.

```python
# SVM with different kernels
from sklearn.svm import SVC

for kernel in ['linear', 'rbf', 'poly']:
    svm = Pipeline([('scaler', StandardScaler()),
                    ('svm',   SVC(kernel=kernel, probability=True, random_state=42))])
    svm.fit(X_train, y_train)
    acc = svm.score(X_test, y_test)
    print(f'SVM ({kernel:6s}): {acc:.4f}')
```

```
# SVM (linear): 0.8101
# SVM (rbf   ): 0.8324   <- best
# SVM (poly  ): 0.8156
```

## 11.7 — Naive Bayes

Naive Bayes uses Bayes' theorem with the 'naive' assumption that features are independent given the class. Despite this simplification, it works surprisingly well for text classification and when training data is limited.

```python
# Naive Bayes for Spam Detection (text classification)
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import pandas as pd

# Load SMS Spam Collection dataset
df = pd.read_csv('spam.csv', encoding='latin-1')[['v1','v2']]
df.columns = ['label', 'text']
X = df['text']
y = (df['label'] == 'spam').astype(int)
X_train_t, X_test_t, y_train_t, y_test_t = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

spam_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', max_features=5000)),
    ('clf',   MultinomialNB())
])
spam_pipeline.fit(X_train_t, y_train_t)
print(classification_report(y_test_t, spam_pipeline.predict(X_test_t),
                            target_names=['Ham', 'Spam']))
```

```
# precision    recall  f1-score
# Ham   0.98      0.99      0.99
# Spam  0.96      0.93      0.94
# accuracy                 0.98
```

## 11.8 — Comparing All Classifiers

```python
# Head-to-head comparison on Titanic survival (5-fold CV, F1 score)
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_val_score

classifiers = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Decision Tree':       DecisionTreeClassifier(max_depth=5),
    'K-NN (k=11)':         KNeighborsClassifier(n_neighbors=11),
    'SVM (RBF)':           SVC(kernel='rbf', probability=True),
    'Naive Bayes':         GaussianNB()
}

for name, clf in classifiers.items():
    pipe = Pipeline([('scaler', StandardScaler()), ('clf', clf)])
    scores = cross_val_score(pipe, X, y, cv=5, scoring='f1')
    print(f'{name:25s}: {scores.mean():.4f} +/- {scores.std():.4f}')
```

```
# Logistic Regression     : 0.7423 +/- 0.0312
# Decision Tree           : 0.7189 +/- 0.0421
# K-NN (k=11)             : 0.7091 +/- 0.0388
# SVM (RBF)               : 0.7612 +/- 0.0290  <- best
# Naive Bayes             : 0.7018 +/- 0.0445
```

## 11.9 — Handling Class Imbalance

> 💡 **Why This Matters:** With imbalanced datasets (e.g., 95% not-fraud, 5% fraud), a model that always predicts 'not fraud' achieves 95% accuracy while detecting zero fraud cases. Always check class balance before training.

```python
# Method 1: class_weight='balanced' — adjusts loss function automatically
from sklearn.linear_model import LogisticRegression

model_balanced = Pipeline([
    ('scaler', StandardScaler()),
    ('clf',    LogisticRegression(class_weight='balanced', max_iter=1000))
])

# Method 2: SMOTE — Synthetic Minority Over-sampling Technique
# pip install imbalanced-learn
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline

smote_pipeline = ImbPipeline([
    ('scaler', StandardScaler()),
    ('smote',  SMOTE(random_state=42)),
    ('clf',    LogisticRegression(max_iter=1000))
])
```

## 11.10 — Hands-On Exercises

1. On the Breast Cancer dataset (sklearn.datasets.load_breast_cancer), train all 5 classifiers. Use GridSearchCV to optimize each. Create a comparison table showing precision, recall, F1, and AUC for all five.
1. Build a spam email classifier using the SMS Spam Collection dataset from Kaggle. Use Naive Bayes + TF-IDF. Report accuracy, precision, and recall specifically for spam detection.
1. Visualize KNN decision boundaries with K=1, K=5, K=15 on the Iris dataset (use only petal_length and petal_width). What changes as K increases?
1. On the Credit Card Fraud dataset (Kaggle), compare model performance with and without class_weight='balanced'. How does recall for the fraud class change?

## 11.11 — Mini Project: Credit Card Fraud Detector

Using the Kaggle Credit Card Fraud dataset (highly imbalanced: ~0.17% fraud):

- EDA: visualize the severity of class imbalance
- Baseline: train with no imbalance handling — note the misleading accuracy
- Handle imbalance: compare class_weight='balanced' vs SMOTE
- Build 3 classifiers: LogisticRegression, RandomForest, XGBoost
- Evaluate with confusion matrix, precision, recall, F1, and AUC
- Key insight: for fraud detection, recall for fraud matters more than overall accuracy
- Portfolio deliverable: 1-page business summary of findings with cost-benefit analysis

## 11.12 — Key Terms


## 11.13 — Interview Questions


### Basic

- What is the difference between precision and recall? Give a medical example where recall is more important.
- Explain how a Decision Tree makes a splitting decision (Gini impurity / information gain).
- Why is accuracy a poor metric for imbalanced datasets? Give a concrete example.

### Intermediate

- What is the ROC curve and what does the AUC score represent?
- Explain the kernel trick in SVM. What problem does it solve?
- How does regularization work in Logistic Regression (C parameter)?
- What is SMOTE and when should you use it instead of class_weight='balanced'?

### Advanced

- Derive the Logistic Regression loss function (binary cross-entropy) from first principles.
- How do you handle multi-class classification with a binary classifier (OvR vs OvO)?
- Compare the decision boundaries of Logistic Regression, Decision Trees, and SVM. When does each fail?

## 11.14 — Summary

- Classification predicts discrete categories. Always choose your evaluation metric BEFORE training.
- Logistic Regression: probabilistic, linear decision boundary, fast, interpretable.
- Decision Trees: interpretable, can overfit, provides feature importance natively.
- KNN: simple, non-parametric, sensitive to scale and K — always scale first.
- SVM: maximum margin classifier; kernel trick handles non-linear boundaries.
- Naive Bayes: fast, excellent for text, assumes feature independence.
- Class imbalance: use class_weight='balanced' as a first fix; SMOTE for more severe cases.
> **➡️ What's Next:** Chapter 12 covers Unsupervised Learning — finding patterns in data when we have no labels. We'll cover K-Means clustering, Hierarchical Clustering, DBSCAN, and PCA for dimensionality reduction.

---
