# Appendix A: Cheat Sheets

## Python Quick Reference

```python
# Core data types
str, int, float, bool, list, dict, tuple, set

# f-strings (use these for all string formatting)
name = 'Alice'; score = 95.5
print(f'{name} scored {score:.1f}%')   # -> Alice scored 95.5%
print(f'{score:,.2f}')                 # -> 95.50 (comma thousands)

# List ops: .append() .extend() .pop() .sort() .reverse() sorted()
# Dict ops: .keys() .values() .items() .get(key, default) .update()
# String ops: .strip() .split() .join() .lower() .upper() .replace()
# Control flow: if/elif/else | for x in iterable | while cond
# Functions: def name(arg, default=val, *args, **kwargs): return val
# Lambda: fn = lambda x, y: x + y
# Comprehensions: [f(x) for x in lst if cond]
# Generators:     (f(x) for x in lst) <- lazy, memory-efficient
# Error handling: try: ... except ValueError: ... finally: ...
```

---

## NumPy Quick Reference

```python
import numpy as np

np.array([1, 2, 3])               # From list
np.zeros((m,n))                   # m x n zeros
np.arange(start, stop, step)      # Integer range
np.linspace(start, stop, n)       # n evenly spaced floats
np.random.seed(42)                # Reproducibility — set once at top
np.random.randn(m,n)              # Standard normal
np.random.randint(low, high, n)   # Integer array

# Properties
arr.shape | arr.ndim | arr.size | arr.dtype

# Indexing and slicing
arr[row, col] | arr[r1:r2, c1:c2] | arr[arr > 0]  # Boolean mask

# Math operations (all vectorized — no loops needed)
arr + other | arr * scalar | arr ** 2 | np.sqrt(arr)
arr.sum() | .mean() | .std() | .max() | .min()
arr.sum(axis=0)   # Column-wise
arr.sum(axis=1)   # Row-wise

# Linear algebra
A @ B                  # Matrix multiply
A.T                    # Transpose
np.linalg.inv(A)       # Inverse
np.linalg.solve(A, b)  # Solve Ax = b
```

---

## Pandas Quick Reference

```python
import pandas as pd

# I/O
pd.read_csv('file.csv', parse_dates=['date'], na_values=['N/A'])
df.to_csv('out.csv', index=False)

# Inspection
df.head() | df.tail() | df.info() | df.describe() | df.shape

# Selection
df['col']            # Single column (Series)
df[['a','b']]        # Multiple columns (DataFrame)
df.loc[label, col]   # Label-based  — row label, col name
df.iloc[int, int]    # Position-based — integer position
df[df['col'] > val]  # Boolean filter
df.query('col > @val and dept == "IT"')  # SQL-like filter

# Cleaning
df.isnull().sum()                          # Count missing per column
df.dropna()                                # Drop rows with any null
df['col'].fillna(df['col'].median(), inplace=True)
df['col'].ffill()                          # Forward fill (Pandas 2.0+ syntax)
df.drop_duplicates()                       # Remove duplicate rows
df['col'] = df['col'].astype(int)          # Type conversion

# GroupBy & Aggregation
df.groupby('col').agg({'col2': ['mean', 'sum', 'count']})

# Merge / Join
pd.merge(df1, df2, on='key', how='left')
pd.concat([df1, df2], ignore_index=True)
```

---

## Scikit-learn Quick Reference

```python
# The universal pattern
model.fit(X_train, y_train)     # Train
model.predict(X_test)           # Predict
model.score(X_test, y_test)     # Evaluate

# Splitting
from sklearn.model_selection import train_test_split, cross_val_score
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y)

# Scaling (always fit on train, transform test)
from sklearn.preprocessing import StandardScaler, MinMaxScaler
scaler.fit_transform(X_train)   # fit + transform
scaler.transform(X_test)        # transform only — no fit!

# Regression metrics
from sklearn.metrics import mean_squared_error, r2_score
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

# Classification metrics
from sklearn.metrics import classification_report, roc_auc_score
print(classification_report(y_test, y_pred))

# Pipeline (always use for production code)
from sklearn.pipeline import Pipeline
pipe = Pipeline([('scaler', StandardScaler()), ('clf', clf)])

# Hyperparameter tuning
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
gs = GridSearchCV(model, param_grid, cv=5, scoring='f1', n_jobs=-1)
```

---

# Appendix B: Datasets Used in This Book

| Dataset | Where to Load | Used In |
|---|---|---|
| Titanic | `pd.read_csv('titanic.csv')` from Kaggle | Ch 1, 5, 9, 11 |
| Iris | `from sklearn.datasets import load_iris` or `sns.load_dataset('iris')` | Ch 1, 3, 11, 12 |
| Tips | `sns.load_dataset('tips')` | Ch 3, 6 |
| California Housing | `from sklearn.datasets import fetch_california_housing` | Ch 10 |
| Breast Cancer Wisconsin | `from sklearn.datasets import load_breast_cancer` | Ch 11, 15 |
| MNIST Digits | `from sklearn.datasets import load_digits` or `keras.datasets.mnist.load_data()` | Ch 12, 15 |
| IBM HR Attrition | Kaggle: IBM HR Analytics Employee Attrition | Ch 14 |
| IBM Telco Churn | Kaggle: Telco Customer Churn | Ch 16 |
| CIFAR-10 | `from tensorflow.keras.datasets import cifar10` | Ch 15 |
| House Prices | Kaggle: House Prices - Advanced Regression Techniques | Ch 10, 13 |
| Credit Card Fraud | Kaggle: Credit Card Fraud Detection | Ch 11 |

---

# Appendix C: Further Reading & Resources

## Books

- **Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow** (3rd ed.) — Aurélien Géron. The most comprehensive practical ML book available.
- **Python for Data Analysis** (3rd ed.) — Wes McKinney (creator of Pandas). The definitive Pandas reference.
- **The Hundred-Page Machine Learning Book** — Andriy Burkov. Concise, free to read online at themlbook.com.
- **The Elements of Statistical Learning** — Hastie, Tibshirani, Friedman. Free PDF at web.stanford.edu/~hastie/ElemStatLearn/. Rigorous mathematical foundation.
- **Storytelling with Data** — Cole Nussbaumer Knaflic. The best book on data visualization principles.
- **Deep Learning** — Goodfellow, Bengio, Courville. Free at deeplearningbook.org. The theoretical DL reference.

## Online Courses

- **fast.ai** — Practical Deep Learning for Coders (free). Top-down approach — build things first, understand theory second.
- **fast.ai Forums** — The most active beginner-friendly deep learning community online.
- **Andrew Ng's Machine Learning Specialization** — Coursera. The classic introductory ML course.
- **CS50's Introduction to AI with Python** — Harvard / edX (free). Excellent for foundations.
- **Kaggle Learn** — Free micro-courses on Python, Pandas, ML, SQL, Deep Learning with certificates.

## Communities & Practice

- **Kaggle** — Competitions, datasets, free GPU notebooks. Entering competitions is the single best way to improve rapidly.
- **Papers With Code** — Research papers with open-source implementations. Track the state of the art.
- **LeetCode (SQL section)** — Essential interview preparation for SQL at all difficulty levels.
- **Towards Data Science** — Practitioner articles on real problems, tools, and career advice.
- **StatQuest with Josh Starmer (YouTube)** — The clearest statistics and ML explanations online, full stop.