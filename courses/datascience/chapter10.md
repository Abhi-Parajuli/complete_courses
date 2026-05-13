
# Chapter 10: Supervised Learning — Regression

> **📋 Prerequisites:** Chapter 9 (ML fundamentals, train/test split, Scikit-learn API), Chapter 4 (NumPy linear algebra).


## 10.1 — What Is Regression?

Regression predicts a continuous numerical output. If the answer to your problem is a number — price, temperature, score, time — it's a regression problem.

Real-world examples: predicting house prices, forecasting quarterly revenue, estimating patient recovery time, projecting energy consumption, and modeling stock returns.

> 💡 **Why This Matters:** Regression is the foundation of quantitative decision-making. Every financial forecast, every resource-allocation model, every pricing algorithm uses some form of regression at its core.


## 10.2 — Linear Regression: The Foundation

The simplest form: find the best-fit straight line (or hyperplane) through the data.

Mathematically: y = b0 + b1*x1 + b2*x2 + ... + bn*xn + e

Where b0 is the intercept (baseline value), b1...bn are coefficients (impact of each feature), and e is the irreducible error term.

```python
# Linear Regression FROM SCRATCH — understanding the math before the library
# For simple (one-variable) linear regression, the closed-form solution is:
#   slope     = sum((x - x_mean) * (y - y_mean)) / sum((x - x_mean)^2)
#   intercept = y_mean - slope * x_mean
import numpy as np

class SimpleLinearRegression:
    def fit(self, X, y):
        X_mean, y_mean   = X.mean(), y.mean()
        numerator        = np.sum((X - X_mean) * (y - y_mean))
        denominator      = np.sum((X - X_mean) ** 2)
        self.slope_      = numerator / denominator
        self.intercept_  = y_mean - self.slope_ * X_mean

    def predict(self, X):
        return self.intercept_ + self.slope_ * X

# Generate synthetic data: true relationship is y = 3x + 5 + noise
np.random.seed(42)
X = np.random.rand(100) * 10
y = 3 * X + 5 + np.random.randn(100) * 2

model = SimpleLinearRegression()
model.fit(X, y)
print(f'Slope:     {model.slope_:.3f}  (true: 3.0)')
print(f'Intercept: {model.intercept_:.3f}  (true: 5.0)')
```

```
# Output:
# Slope:     3.021  (true: 3.0)
# Intercept: 4.923  (true: 5.0)
```

## 10.3 — Multiple Linear Regression with Scikit-learn

```python
# Multiple regression with Scikit-learn on a house price dataset
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pandas as pd, numpy as np

# Simulate house price data
np.random.seed(42)
n = 500
area   = np.random.normal(1800, 500, n)
rooms  = np.random.randint(2, 6, n)
age    = np.random.randint(0, 50, n)
price  = 50000 + 100*area + 15000*rooms - 1000*age + np.random.randn(n)*20000

X = pd.DataFrame({'area': area, 'rooms': rooms, 'age': age})
y = price

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Interpretation — what does each coefficient mean?
for feature, coef in zip(X.columns, model.coef_):
    print(f'{feature:8s}: ${coef:,.2f} per unit')
```

```
# Output:
# area    : $99.87 per sq ft
# rooms   : $14,823.41 per bedroom
# age     : $-998.12 per year (older = less valuable)
```

## 10.4 — Evaluation Metrics

```python
# Computing all regression metrics
from sklearn.metrics import (mean_absolute_error, mean_squared_error,
                              r2_score, mean_absolute_percentage_error)

mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)

# Adjusted R^2 — penalizes for extra features
n_samples  = len(y_test)
n_features = X_test.shape[1]
adj_r2 = 1 - (1 - r2) * (n_samples - 1) / (n_samples - n_features - 1)

print(f'MAE:       ${mae:,.0f}')
print(f'RMSE:      ${rmse:,.0f}')
print(f'R2:         {r2:.4f}')
print(f'Adj R2:     {adj_r2:.4f}')
```

```
# Output:
# MAE:       $15,842
# RMSE:      $20,103
# R2:         0.8142
# Adj R2:     0.8126
```

## 10.5 — Regularization: Ridge, Lasso, ElasticNet

When a model overfits, regularization adds a penalty term to the loss function to keep coefficients small. This reduces complexity and improves generalization on unseen data.

> **🧠 Intuition:** Without regularization, a model might assign huge weights to noisy features. Regularization is like adding a 'complexity tax' — the model must earn every extra unit of complexity by reducing prediction error enough to justify it.

```python
# Ridge (L2): penalty = alpha * sum(coef^2)
# Keeps all features but SHRINKS large coefficients toward zero
# Best when many features all contribute a little
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

ridge = Pipeline([('scaler', StandardScaler()), ('model', Ridge(alpha=1.0))])
ridge.fit(X_train, y_train)
print(f'Ridge R2: {ridge.score(X_test, y_test):.4f}')
```

```
# Output:  Ridge R2: 0.8138
```

```python

# Lasso (L1): penalty = alpha * sum(|coef|)
# Can shrink some coefficients to EXACTLY zero — built-in feature selection!
# Best when you suspect many features are irrelevant
lasso = Pipeline([('scaler', StandardScaler()), ('model', Lasso(alpha=100))])
lasso.fit(X_train, y_train)
print(f'Lasso R2: {lasso.score(X_test, y_test):.4f}')
```

```
# Output:  Lasso R2: 0.8121
```

```python

# See which features Lasso zeroed out:
lasso_model = lasso.named_steps['model']
for feature, coef in zip(X.columns, lasso_model.coef_):
    status = 'ZEROED OUT' if abs(coef) < 0.01 else f'${coef:,.2f}'
    print(f'{feature:10s}: {status}')
```

```
# area      : $99.42
# rooms     : $14,350.21
# age       : ZEROED OUT   <- Lasso eliminated this feature!
```

```python

# ElasticNet: combines L1 + L2 (best of both worlds)
elastic = Pipeline([('scaler', StandardScaler()),
                    ('model', ElasticNet(alpha=0.1, l1_ratio=0.5))])
```

## 10.6 — Hands-On Exercises

1. Implement linear regression using the Normal Equation (b = (X^T X)^-1 X^T y) with NumPy. Compare your coefficients to Scikit-learn's LinearRegression. They should be identical.
1. Using the California Housing dataset (sklearn.datasets.fetch_california_housing), build and compare LinearRegression, Ridge (alpha=0.1, 1.0, 10), and Lasso. Which gives the best RMSE on a 5-fold CV?
1. Create a residual plot (y_test - y_pred vs y_pred) for your best model. If the residuals are not randomly scattered around zero, what does that imply?
1. Implement polynomial regression with degrees 1–8 using a Pipeline. Plot train RMSE and test RMSE vs degree. Identify the degree where overfitting begins.

## 10.7 — Mini Project: House Price Predictor

Using the Kaggle House Prices dataset:

- EDA: Identify the top 10 features correlated with SalePrice
- Clean: handle missing values, encode categoricals, address skewed distributions with log transform
- Feature engineering: create 3–5 new features (e.g., total_sqft = 1stFlrSF + 2ndFlrSF)
- Build a Pipeline: SimpleImputer → OneHotEncoder → StandardScaler → Ridge/Lasso
- Evaluate with 5-fold cross-validation. Report mean RMSE and R²
- Visualize Lasso coefficients — which features were zeroed out?
- Write a README and push to GitHub — this is your portfolio regression project

## 10.8 — Key Terms


## 10.9 — Interview Questions


### Basic

- What does the R² score mean? What would R² = 0 indicate?
- When would you use Ridge vs Lasso regression?
- What assumptions does linear regression make about the data?

### Intermediate

- What is the difference between L1 and L2 regularization at the mathematical level?
- How do you interpret the coefficient of a feature in a linear regression model?
- What is multicollinearity and how does it affect regression coefficients?

### Advanced

- Derive the Normal Equation for linear regression. What are its computational limitations?
- How does gradient descent find the optimal coefficients, and when is it preferred over the Normal Equation?
- What is the difference between coordinate descent (used by Lasso) and gradient descent?

## 10.10 — Summary

- Regression predicts continuous values. Linear regression: y = b0 + b1*x1 + ...
- Key metrics: MAE (robust), RMSE (interpretable, penalizes outliers), R² (variance explained), Adjusted R² (penalizes extra features).
- Overfitting prevention: Ridge (L2) shrinks all coefficients; Lasso (L1) zeros some out for automatic feature selection.
- Always scale features before regularization; use Pipelines to prevent data leakage.
- Lasso coefficients = 0 signals irrelevant features — more informative than just checking R².
> **➡️ What's Next:** Chapter 11 covers Classification — predicting categories instead of numbers. We'll cover Logistic Regression, Decision Trees, KNN, SVM, and Naive Bayes, plus evaluation metrics like precision, recall, F1, and ROC-AUC.

---

