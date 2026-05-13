

# PART IV — ADVANCED TOPICS & CAREER


# Chapter 14: Model Evaluation & Feature Engineering

> **📋 Prerequisites:** Chapter 9 (CV, train/test split), Chapter 13 (ensemble methods, Pipelines).


## 14.1 — Why Evaluation Is Hard

A model that scores 99% accuracy in your notebook but 70% in production is a failure. Robust evaluation requires three things: the right metric for your problem, the right splitting strategy for your data type, and zero data leakage from preprocessing to evaluation.

> 💡 **Why This Matters:** Every time you look at the test set to make a decision — even to choose a hyperparameter or add a feature — you are implicitly leaking information. This is why serious practitioners never touch the test set until the very end.


## 14.2 — Cross-Validation Strategies

```python
# Different CV strategies for different data types
from sklearn.model_selection import (KFold, StratifiedKFold, TimeSeriesSplit,
                                      cross_validate)

# Standard K-Fold — for regression, roughly balanced classes
kf  = KFold(n_splits=5, shuffle=True, random_state=42)

# Stratified K-Fold — for classification
# Ensures each fold has the same class proportions as the full dataset
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Time Series Split — NO shuffling (preserves temporal order)
# Train on past, validate on future — never the reverse
tscv = TimeSeriesSplit(n_splits=5)

# Compute multiple metrics simultaneously
results = cross_validate(model, X, y, cv=skf,
                         scoring=['accuracy', 'f1', 'roc_auc'],
                         return_train_score=True)
for metric in ['test_accuracy', 'test_f1', 'test_roc_auc']:
    vals = results[metric]
    print(f'{metric}: {vals.mean():.4f} +/- {vals.std():.4f}')
```

```
# test_accuracy : 0.8134 +/- 0.0198
# test_f1       : 0.7891 +/- 0.0231
# test_roc_auc  : 0.8763 +/- 0.0142
```

## 14.3 — Learning Curves — Diagnosing Model Problems

```python
# Learning curves reveal whether a model needs more data or more complexity
from sklearn.model_selection import learning_curve
from sklearn.ensemble import RandomForestClassifier
import numpy as np, matplotlib.pyplot as plt

train_sizes, train_scores, val_scores = learning_curve(
    RandomForestClassifier(n_estimators=100, random_state=42),
    X, y, cv=5,
    train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='f1', n_jobs=-1
)

fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(train_sizes, train_scores.mean(axis=1), 'b-o', label='Train F1')
ax.fill_between(train_sizes,
    train_scores.mean(1)-train_scores.std(1),
    train_scores.mean(1)+train_scores.std(1), alpha=0.1, color='b')
ax.plot(train_sizes, val_scores.mean(axis=1), 'r-o', label='Validation F1')
ax.fill_between(train_sizes,
    val_scores.mean(1)-val_scores.std(1),
    val_scores.mean(1)+val_scores.std(1), alpha=0.1, color='r')
ax.set_xlabel('Training set size')
ax.set_ylabel('F1 Score')
ax.set_title('Learning Curve')
ax.legend(); plt.show()

# Reading the learning curve:
# Both curves LOW -> underfitting -> try more complex model
# Train HIGH, Val LOW, large gap -> overfitting -> regularize or get more data
# Both curves HIGH and converging -> healthy model
# Val still rising at max train size -> more data would help
```

## 14.4 — Hyperparameter Tuning

```python
# GridSearchCV — exhaustive search (every combination)
# Use when search space is small (< 100 combinations)
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators':      [100, 200, 300],
    'max_depth':         [5, 10, None],
    'min_samples_split': [2, 5, 10]
}  # 3 x 3 x 3 = 27 combinations x 5 folds = 135 model fits

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42), param_grid,
    cv=5, scoring='f1', n_jobs=-1, verbose=1
)
grid_search.fit(X_train, y_train)
print(f'Best params: {grid_search.best_params_}')
print(f'Best CV F1:  {grid_search.best_score_:.4f}')
```

```
# Best params: {'max_depth': 10, 'min_samples_split': 5, 'n_estimators': 300}
# Best CV F1:  0.8124
```

```python

# RandomizedSearchCV — sample from distributions (use for large spaces)
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

param_dist = {
    'n_estimators':      randint(100, 600),
    'max_depth':         randint(3, 20),
    'min_samples_split': randint(2, 25),
    'max_features':      uniform(0.2, 0.8)
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42), param_dist,
    n_iter=50, cv=5, scoring='f1', random_state=42, n_jobs=-1
)
random_search.fit(X_train, y_train)
print(f'RandomSearch Best F1: {random_search.best_score_:.4f}')
```

```
# RandomSearch Best F1: 0.8197   <- often beats GridSearch in less time
```

## 14.5 — Feature Engineering

Feature engineering is the process of using domain knowledge to create features that make machine learning algorithms work better. Great features can make a simple model outperform a complex model with raw features.

```python
# Feature engineering example on a sales dataset
import pandas as pd, numpy as np

df = pd.read_csv('sales.csv', parse_dates=['date'])

# Date decomposition
df['year']        = df['date'].dt.year
df['month']       = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek   # 0=Mon, 6=Sun
df['is_weekend']  = df['day_of_week'].isin([5, 6]).astype(int)
df['quarter']     = df['date'].dt.quarter

# Interaction features
df['revenue']     = df['quantity'] * df['unit_price']
df['log_revenue'] = np.log1p(df['revenue'])   # log(x+1) handles zeros

# Aggregation — per-customer statistics
cust_stats = df.groupby('customer_id')['revenue'].agg(
    cust_mean_revenue='mean',
    cust_total_revenue='sum',
    cust_n_orders='count',
    cust_std_revenue='std'
).reset_index()
df = df.merge(cust_stats, on='customer_id', how='left')
```

## 14.6 — Feature Selection

```python
# Three methods — choose based on your situation
from sklearn.feature_selection import SelectKBest, f_classif, RFE, SelectFromModel
from sklearn.ensemble import RandomForestClassifier

# Method 1: Statistical tests — fast, model-agnostic
selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X_train, y_train)
selected_features = X.columns[selector.get_support()].tolist()
print('Statistical test selected:', selected_features)

# Method 2: Recursive Feature Elimination (RFE)
# Trains model repeatedly, removes least important feature each time
rfe = RFE(RandomForestClassifier(n_estimators=50, random_state=42),
          n_features_to_select=10)
rfe.fit(X_train, y_train)
print('RFE selected:', X.columns[rfe.support_].tolist())

# Method 3: Lasso-based — L1 regularization zeros irrelevant coefficients
from sklearn.linear_model import LassoCV
lasso_sel = SelectFromModel(LassoCV(cv=5, random_state=42))
lasso_sel.fit(X_train, y_train)
print('Lasso selected:', X.columns[lasso_sel.get_support()].tolist())
```

## 14.7 — Production-Ready Pipelines

```python
# Full ML Pipeline: preprocessing + model in one reusable object
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier

numeric_features     = ['age', 'salary', 'tenure']
categorical_features = ['department', 'gender', 'region']

numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler())
])

# sparse_output=False for sklearn >= 1.2; older: use sparse=False
categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer([
    ('num', numeric_transformer,     numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        GradientBoostingClassifier(n_estimators=100, random_state=42))
])

full_pipeline.fit(X_train, y_train)
print(f'Pipeline Test F1: {cross_val_score(full_pipeline, X, y, cv=5, scoring=\"f1\").mean():.4f}')
```

```
# Pipeline Test F1: 0.8342
```

```python

# Save the entire pipeline (preprocessing + model) as a single file
import joblib
joblib.dump(full_pipeline, 'model_pipeline.pkl')

# Load later and make predictions — preprocessing is automatically applied
loaded_pipeline = joblib.load('model_pipeline.pkl')
new_predictions = loaded_pipeline.predict(new_data_raw)   # raw data, no manual scaling
```

## 14.8 — SHAP Values: Model Interpretability

SHAP (SHapley Additive exPlanations) values explain why a model made a specific prediction. Unlike feature importance (which is global), SHAP gives a per-prediction explanation.

> 💡 **Why This Matters:** SHAP has become the industry standard for model interpretability. It answers 'why did the model predict X for this specific customer?' — which is what business stakeholders actually need. It's also required for regulatory compliance in many industries (finance, healthcare).

```python
# SHAP values — install with: pip install shap
import shap
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Tree-based SHAP explainer (works for RF, XGBoost, GBM)
explainer   = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Summary plot — global feature importance with direction
shap.summary_plot(shap_values[:,:,1], X_test, feature_names=features)
# Red = high feature value, Blue = low feature value
# Right of center = pushes toward positive class
# Left of center  = pushes toward negative class

# Force plot — explain ONE specific prediction
shap.force_plot(
    explainer.expected_value[1],
    shap_values[0, :, 1],
    X_test.iloc[0],
    matplotlib=True
)
```

## 14.9 — Hands-On Exercises

1. On the California Housing dataset, compare KFold vs StratifiedKFold (after binning the target into quartiles). Does stratification improve CV stability (lower std)?
1. Using GridSearchCV, tune a GradientBoostingClassifier on the Titanic dataset. Then use RandomizedSearchCV with 50 iterations on a wider search space. Which finds a better F1?
1. Engineer 5 new features on the House Prices dataset (e.g., total_sf = 1stFlrSF + 2ndFlrSF, house_age = YrSold - YearBuilt). Measure the RMSE improvement from each feature using ablation testing.
1. Build a ColumnTransformer Pipeline for a mixed dataset (numeric + categorical + text). Save it with joblib, reload it, and verify predictions match.

## 14.10 — Mini Project: Employee Attrition Predictor

IBM HR Analytics dataset — predict which employees will leave:

- Complete EDA with business interpretation of key patterns
- Feature engineering: create 5+ new features from existing columns
- Build a full ColumnTransformer Pipeline (numeric + categorical)
- Tune with RandomizedSearchCV (50 iterations, StratifiedKFold CV)
- Evaluate: confusion matrix, precision, recall, F1, AUC
- SHAP values: identify top 5 factors driving attrition
- Save the pipeline, reload it, and score 5 new employee records
- Deliverable: 1-page business report with SHAP-based recommendations

## 14.11 — Key Terms


## 14.12 — Interview Questions


### Basic

- What is data leakage? Give a concrete example.
- Why should you use StratifiedKFold for classification instead of regular KFold?
- Name 3 feature engineering techniques with examples.

### Intermediate

- What is the difference between GridSearchCV and RandomizedSearchCV? When would you choose each?
- How does target encoding work and what is its risk (leakage)?
- What is the difference between feature selection and dimensionality reduction?

### Advanced

- Explain Bayesian hyperparameter optimization (e.g., Optuna, Hyperopt). Why is it more efficient than random search?
- What are SHAP values and why are they preferred over feature importance from Random Forest?
- How would you design a robust ML pipeline for a production system that retrains weekly?

## 14.13 — Summary

- CV strategies: KFold for regression, StratifiedKFold for classification, TimeSeriesSplit for temporal data.
- Learning curves diagnose overfitting (train high, val low) vs underfitting (both low).
- Hyperparameter tuning: GridSearch (exhaustive, small spaces), RandomSearch (efficient, large spaces), Bayesian (smart).
- Feature engineering can improve a simple model more than switching to a complex one.
- Pipelines prevent leakage by bundling preprocessing and the model into one deployable object.
- SHAP values provide per-prediction explanations — now the industry standard for interpretability.
> **➡️ What's Next:** Chapter 15 introduces Deep Learning — the technology behind modern AI. We'll cover neural networks, backpropagation, and how to build your first model with Keras.

---

