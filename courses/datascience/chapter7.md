
# Chapter 7: Exploratory Data Analysis (EDA)

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Apply the 5-step EDA framework to any dataset; (2) Detect and handle outliers using IQR and Z-score methods; (3) Compute and interpret a correlation matrix; (4) Interpret skewness, kurtosis, and Q-Q plots; (5) Generate a professional EDA report.

> 📋 **Prerequisites:** Chapters 3 (Statistics), 5 (Pandas), 6 (Visualization). Install: pip install seaborn scipy


## 7.1 — What Is EDA?

EDA is the critical first step before any modeling. It is the process of getting to know your data — understanding its shape, quirks, patterns, and anomalies before making any assumptions or building any models.

John Tukey, who coined the term in 1977, said: 'It is important to understand what you CAN DO before you learn to measure how WELL you seem to have done it.' In other words: explore before you model.


## 7.2 — The EDA Framework


## 7.3 — Step 1: Data Overview

```python
# Reusable data overview function — run this first on every new dataset
import pandas as pd
import numpy as np

def data_overview(df):
    print('='*60)
    print('DATASET OVERVIEW')
    print('='*60)
    print(f'Shape:       {df.shape[0]:,} rows x {df.shape[1]} columns')
    print(f'Memory:      {df.memory_usage(deep=True).sum() / 1e6:.2f} MB')
    print(f'Duplicates:  {df.duplicated().sum():,}')
    print()
    print('COLUMN TYPES:')
    print(df.dtypes.value_counts())
    print()
    print('MISSING VALUES (columns with any missing):')
    missing = df.isnull().sum()
    pct = (missing / len(df) * 100).round(2)
    summary = pd.concat([missing, pct], axis=1,
                        keys=['Count','Percent']).query('Count > 0')
    print(summary if len(summary) > 0 else 'No missing values!')

# Usage
import seaborn as sns
df = sns.load_dataset('titanic')
data_overview(df)
```

```
# Output:
# DATASET OVERVIEW
# Shape:       891 rows x 15 columns
# Memory:      0.11 MB
# Duplicates:  0
# MISSING VALUES:
#          Count  Percent
# age        177    19.87
# embarked     2     0.22
# deck       688    77.22
```

## 7.4 — Step 2: Univariate Analysis


### Understanding Skewness and Kurtosis

Two statistics you will encounter when analyzing numerical columns:

> 📊 **Skewness:** Measures asymmetry of a distribution. Near 0 = symmetric (normal). Positive skew = long tail to the RIGHT (e.g., income — most people earn modestly, a few earn enormously). Negative skew = long tail to the LEFT. Rule of thumb: |skewness| > 1 suggests a log transformation before modeling.

> 📊 **Kurtosis:** Measures 'tailedness.' High kurtosis means more extreme values (outliers) than a normal distribution. The normal distribution has kurtosis = 3, or 0 in 'excess kurtosis' form (what pandas returns). High excess kurtosis > 3 means heavy tails — outliers are more common than expected.

```python
# Q-Q Plot: Is this column normally distributed?
# If points fall on the diagonal line → approximately normal
# Points curving away → non-normal (consider log transform)
from scipy import stats
import matplotlib.pyplot as plt

def analyze_numerical(df, col):
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))
    fig.suptitle(f'Univariate Analysis: {col}', fontsize=14)

    data = df[col].dropna()

    # 1. Histogram — shows the distribution shape
    axes[0].hist(data, bins=30, color='steelblue', edgecolor='white')
    axes[0].set_title('Distribution')

    # 2. Box plot — shows spread and outlier dots
    axes[1].boxplot(data, vert=False)
    axes[1].set_title('Box Plot (dots = outliers)')

    # 3. Q-Q Plot — points on line = normal distribution
    stats.probplot(data, plot=axes[2])
    axes[2].set_title('Q-Q Plot (on line = normal)')

    plt.tight_layout(); plt.show()

    print(f'Skewness: {data.skew():.3f}   (|>1| = likely needs log transform)')
    print(f'Kurtosis: {data.kurtosis():.3f}  (|>3| = heavy tails / many outliers)')
    print(data.describe())
```

## 7.5 — Detecting & Handling Outliers

Outliers are data points far from the rest. They can be genuine extreme values, data entry errors, or measurement mistakes. Always investigate the reason before deciding to remove or keep them.

```python
# Method 1: IQR Method (robust, most common for general use)
def detect_outliers_iqr(df, col):
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower  = Q1 - 1.5 * IQR
    upper  = Q3 + 1.5 * IQR
    outliers = df[(df[col] < lower) | (df[col] > upper)]
    n = len(outliers)
    print(f'{col}: {n} outliers ({n/len(df)*100:.2f}%) — bounds: [{lower:.2f}, {upper:.2f}]')
    return outliers

# Method 2: Z-Score Method (assumes normal distribution)
from scipy import stats
z_scores   = np.abs(stats.zscore(df.select_dtypes('number').dropna()))
outliers_z = (z_scores > 3).any(axis=1)
print(f'Z-score outliers (|z|>3): {outliers_z.sum()} rows')
```

## 7.6 — Step 3: Bivariate Analysis

```python
# Correlation matrix with lower triangle only (no redundancy)
import seaborn as sns
import matplotlib.pyplot as plt

numeric_df  = df.select_dtypes('number')
corr_matrix = numeric_df.corr()

fig, ax = plt.subplots(figsize=(10, 8))
# Mask upper triangle to avoid showing each correlation twice
mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
sns.heatmap(corr_matrix, mask=mask, annot=True, fmt='.2f',
            cmap='RdYlGn', center=0, ax=ax,
            cbar_kws={'shrink': 0.8})
ax.set_title('Correlation Matrix', fontsize=14)
plt.tight_layout(); plt.show()

# Find top correlations with a target variable
# Note: .abs().sort_values() is universally compatible
target = 'survived'
top_corrs = corr_matrix[target].drop(target).abs().sort_values(ascending=False)
print('Top correlations with survived:')
print(top_corrs.head(5))
```

```
# Output:
# Top correlations with survived:
# fare       0.257   ← richer passengers more likely to survive
# parch      0.082   ← traveling with parents/children
# age        0.077
# sibsp      0.035
```

## 7.7 — Step 4: Multivariate Analysis

```python
# Pair plot — visualize all pairwise relationships at once
iris = sns.load_dataset('iris')

g = sns.pairplot(iris, hue='species', diag_kind='kde',
                 plot_kws={'alpha': 0.6, 's': 40})
g.fig.suptitle('Iris: Pairwise Relationships by Species', y=1.02)
plt.show()
# Insight: petal_length vs petal_width cleanly separates the 3 species
# → these two features alone could build a near-perfect classifier
```

## 7.8 — Hands-On Exercises

1. Download the 'House Prices' dataset from Kaggle. Run data_overview(). Then perform univariate analysis on every numeric column. Which columns have |skewness| > 1? Apply log1p transformation and re-check skewness.
1. Build a reusable EDA function that takes any DataFrame and saves an HTML report. (Bonus: compare your output to ydata-profiling: pip install ydata-profiling)
1. Investigate outliers in the house prices data. For each outlier found: Is it a likely data entry error or a genuine extreme value? How does removing it change the correlation with SalePrice?
1. For the Titanic dataset, build a bivariate analysis for every feature vs. 'survived'. Which single feature is most predictive? Support your answer with both a correlation value and a visualization.

## 7.9 — Mini Project: Complete EDA Report

Choose any Kaggle dataset in a domain you find interesting (sports, finance, health, movies). Produce a complete EDA notebook:

- Section 1: Dataset description and business context (what question does this data answer?)
- Section 2: Data overview using the data_overview() function
- Section 3: Univariate analysis for every column with chart + 2-3 sentence interpretation
- Section 4: Bivariate analysis — top 10 relationships with the target variable
- Section 5: 10 numbered insights ready to present to a non-technical stakeholder
- Section 6: Recommended next steps for modeling (which features to use, any needed transforms)

## 7.10 — Interview Questions


### Basic

- What is EDA and why do you always do it before modeling?
- How do you detect outliers? Name two methods and when you would use each.
- What does correlation measure? What is its range? What does -0.8 mean?

### Intermediate

- What is the difference between correlation and covariance? Which is easier to interpret?
- What is skewness? What transformation would you apply to a positively skewed feature before training a linear model?
- What does a Q-Q plot tell you? What does it mean when points curve away from the diagonal?

### Advanced

- What is multicollinearity and how does it affect linear models? How do you detect it? (Hint: VIF)
- Explain the curse of dimensionality and its implications for EDA with 200+ feature datasets.
- How would you automate EDA for a production data pipeline that receives new data weekly?

## 7.11 — Key Terms

- Skewness: Asymmetry of a distribution. Positive = right tail. Negative = left tail.
- Kurtosis: Tailedness of a distribution. High = more outliers than normal.
- Q-Q Plot: Quantile-Quantile plot. Points on the diagonal line indicate normality.
- IQR: Interquartile Range. Q3 - Q1. Used for outlier detection: outliers lie below Q1 - 1.5*IQR or above Q3 + 1.5*IQR.
- Correlation: Linear relationship strength between two variables. Range: -1 (perfect negative) to +1 (perfect positive).

## 7.12 — Summary

- EDA follows 5 steps: Overview → Univariate → Bivariate → Multivariate → Conclusions.
- Always check: shape, dtypes, missing values, duplicates before any analysis.
- Skewness > 1: consider log transform. Kurtosis > 3: expect many outliers.
- Outlier detection: IQR method (general use), Z-score (assumes normality).
- Correlation quantifies linear relationships (-1 to +1). High correlation does NOT imply causation.
> **➡️ What's Next:** Chapter 8 covers SQL — the universal language of databases. Whether you are pulling data for analysis or writing production queries, SQL is a must-have skill for every data scientist.

---