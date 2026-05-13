
# Chapter 13: Ensemble Methods & Advanced ML

> **📋 Prerequisites:** Chapter 11 (Classification fundamentals), Chapter 9 (bias-variance tradeoff, cross-validation).


## 13.1 — The Wisdom of Crowds

In 1906, statistician Francis Galton visited a county fair where 800 people attempted to guess the weight of an ox. No single person was correct — but the median of all 800 guesses was within 1% of the true answer. This is the wisdom of crowds: diverse independent estimates, averaged together, outperform any single estimate.

Ensemble methods apply this same principle to machine learning: instead of one model, train many 'weak learners' and combine them into a powerful 'strong learner.'

> 💡 **Why This Matters:** Random Forest and XGBoost consistently rank among the top-performing algorithms on tabular data in Kaggle competitions — not deep learning. For structured/tabular data (the vast majority of business problems), ensemble methods are often the best starting point.


## 13.2 — Bagging: Bootstrap Aggregating

Bagging trains many models independently on different random subsets of training data (sampled with replacement = bootstrapping), then averages their predictions. This reduces variance without increasing bias.

```python
# Bagging Classifier example
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier

bagging = BaggingClassifier(
    estimator=DecisionTreeClassifier(max_depth=5),
    n_estimators=100,    # Number of base models
    max_samples=0.8,     # Use 80% of training rows per model (bootstrap)
    max_features=0.8,    # Use 80% of features per model
    random_state=42
)
bagging.fit(X_train, y_train)
print(f'Single Tree: {DecisionTreeClassifier(max_depth=5).fit(X_train,y_train).score(X_test,y_test):.4f}')
print(f'Bagging 100: {bagging.score(X_test, y_test):.4f}')
```

```
# Single Tree: 0.7989
# Bagging 100: 0.8324   <- ensemble wins
```

## 13.3 — Random Forest

Random Forest is bagging of Decision Trees with an additional trick: at each split, only a random subset of features is considered. This extra randomness decorrelates the trees, making the ensemble more powerful.

```python
# Random Forest — the reliable workhorse of data science
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import pandas as pd

rf = RandomForestClassifier(
    n_estimators=200,        # More trees = more stable (but diminishing returns after ~200)
    max_depth=None,          # Grow until pure leaves
    min_samples_split=5,     # Min samples required to split a node
    max_features='sqrt',     # sqrt(n_features) features per split — default for classification
    class_weight='balanced', # Handle class imbalance
    random_state=42,
    n_jobs=-1                # Use all CPU cores
)

scores = cross_val_score(rf, X, y, cv=5, scoring='f1')
print(f'RF F1: {scores.mean():.4f} +/- {scores.std():.4f}')
```

```
# RF F1: 0.8012 +/- 0.0241
```

```python

rf.fit(X_train, y_train)

# Feature Importance — which features does the forest rely on most?
importances = pd.Series(rf.feature_importances_, index=features)
importances.sort_values().plot(kind='barh', figsize=(9, 5), color='steelblue')
plt.title('Random Forest Feature Importances')
plt.xlabel('Mean Decrease in Impurity')
plt.tight_layout(); plt.show()
```

## 13.4 — Gradient Boosting

Unlike bagging (parallel), boosting trains models sequentially. Each new model focuses on the errors (residuals) of the previous ensemble — gradually correcting mistakes.

```python
# Gradient Boosting Classifier
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(
    n_estimators=200,     # Number of boosting stages (trees)
    learning_rate=0.05,   # Shrinkage: smaller = more conservative, needs more trees
    max_depth=4,          # Shallow trees work well for boosting
    subsample=0.8,        # Fraction of samples per tree (reduces overfitting)
    random_state=42
)
gb.fit(X_train, y_train)
print(f'Gradient Boosting F1: {cross_val_score(gb, X, y, cv=5, scoring=\"f1\").mean():.4f}')
```

```
# Gradient Boosting F1: 0.8134
```

## 13.5 — XGBoost: Extreme Gradient Boosting

XGBoost is a regularized, optimized version of gradient boosting. It consistently outperforms other algorithms on tabular data in Kaggle competitions. Key improvements: L1/L2 regularization, parallel tree building, built-in handling of missing values.

```python
# XGBoost — install with: pip install xgboost
from xgboost import XGBClassifier

xgb = XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,  # Fraction of features per tree
    reg_alpha=0.1,         # L1 regularization on weights
    reg_lambda=1.0,        # L2 regularization on weights
    eval_metric='logloss',
    random_state=42,
    n_jobs=-1
)

# Early stopping: stop when validation score stops improving
# CRITICAL: use a VALIDATION set here, NOT the test set
# Using the test set for early stopping = data leakage
X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.15, random_state=42)

xgb.fit(X_tr, y_tr,
        eval_set=[(X_val, y_val)],     # <- validation set, not test set
        early_stopping_rounds=50,
        verbose=False)

print(f'XGBoost (best iteration: {xgb.best_iteration})')
print(f'XGBoost F1: {cross_val_score(xgb, X, y, cv=5, scoring=\"f1\").mean():.4f}')
```

```
# XGBoost (best iteration: 312)
# XGBoost F1: 0.8289   <- typically best among all classifiers
```

## 13.6 — Stacking: Meta-Learning

Stacking trains a meta-model (level 2) on the predictions of base models (level 1). The meta-model learns which base model to trust for which types of inputs.

```python
# Stacking Classifier
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

base_models = [
    ('lr',   Pipeline([('s', StandardScaler()), ('m', LogisticRegression(max_iter=1000))])),
    ('tree', DecisionTreeClassifier(max_depth=5, random_state=42)),
    ('knn',  Pipeline([('s', StandardScaler()), ('m', KNeighborsClassifier(n_neighbors=11))])),
]

stacking = StackingClassifier(
    estimators=base_models,
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5            # Uses 5-fold CV to prevent leakage — do not change
)
stacking.fit(X_train, y_train)
print(f'Stacking Accuracy: {stacking.score(X_test, y_test):.4f}')
```

```
# Stacking Accuracy: 0.8436  <- often a small improvement over best single model
```

## 13.7 — Comparing All Ensemble Methods


## 13.8 — Hands-On Exercises

1. On the House Prices dataset (Kaggle), build a Random Forest. Use the feature importance to select the top 20 features. Retrain on only those features — does RMSE improve?
1. Compare Gradient Boosting with learning_rate = 0.001, 0.01, 0.1, 0.5 and n_estimators = 100, 500. Plot a 2D heatmap of validation RMSE for all combinations.
1. Implement XGBoost with early stopping on the Credit Card Fraud dataset. Use a proper validation set (not the test set). Report the best iteration and final AUC.
1. Build a Stacking classifier using 4 diverse base models. Compare its cross-validated F1 score to each individual base model. Did stacking help?

## 13.9 — Mini Project: Kaggle Competition Workflow

Simulate a Kaggle competition using the House Prices dataset:

- Step 1: Baseline — LinearRegression (establish a benchmark RMSE)
- Step 2: Random Forest — tune n_estimators and max_depth with RandomizedSearchCV
- Step 3: XGBoost — tune with RandomizedSearchCV (50 iterations), use early stopping on a validation split
- Step 4: Ensemble — simple average blend of RF + XGBoost predictions
- Step 5: Stacking — use Ridge as the meta-learner
- Document the RMSE improvement at each step in a comparison table
- This is your main portfolio regression project — push to GitHub with a detailed README

## 13.10 — Key Terms


## 13.11 — Interview Questions


### Basic

- What is the difference between bagging and boosting?
- Why does Random Forest usually outperform a single Decision Tree?
- What is feature importance in Random Forest and how is it computed?

### Intermediate

- Explain how Gradient Boosting trains iteratively on residuals.
- What hyperparameters are most important to tune in XGBoost? What does each control?
- What is the interaction between learning_rate and n_estimators in boosting?

### Advanced

- What is the mathematical objective function that XGBoost optimizes? How does it differ from standard Gradient Boosting?
- What is the difference between XGBoost, LightGBM, and CatBoost? When would you choose each?
- How does StackingClassifier in Scikit-learn prevent data leakage during training?

## 13.12 — Summary

- Ensembles combine multiple models to reduce variance (bagging) or bias (boosting).
- Random Forest: bagging + feature randomness. Robust, interpretable, great default choice.
- Gradient Boosting: sequential residual correction. Powerful but slower to train and more hyperparameters.
- XGBoost: regularized, parallelized gradient boosting. Best performer on tabular data.
- Stacking: meta-model learns from base-model predictions. Use cv=5 to prevent leakage.
- Early stopping: always use a validation set (not the test set) to prevent leakage.
> **➡️ What's Next:** Chapter 14 covers Model Evaluation and Feature Engineering — the skills that separate good data scientists from great ones. Proper evaluation prevents silent failure; great features can make even simple models powerful.

---

