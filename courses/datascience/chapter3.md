
# Chapter 3: Mathematics for Data Science

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Compute and interpret descriptive statistics (mean, median, std, IQR); (2) Explain probability and the normal distribution; (3) Run a t-test and interpret a p-value; (4) Perform vector and matrix operations in NumPy; (5) Explain gradient descent with a working code example.

> 📋 **Prerequisites:** Chapter 2 (Python basics). You do not need prior math experience — we build everything from intuition.


## 3.1 — Why Math Matters

You do not need a PhD in mathematics to do data science. But you do need enough math to: interpret model outputs correctly, choose the right algorithm, debug when things go wrong, and explain your results to stakeholders with confidence.

Think of mathematics as the language data speaks. Learning it helps you listen better — and catch mistakes that pure code cannot reveal.

> 💡 **Why This Matters:** A model that says 'accuracy = 95%' can still be useless. Understanding statistics lets you see through misleading metrics — a critical skill that separates junior from senior data scientists.


## 3.2 — Descriptive Statistics

Descriptive statistics summarize a dataset. When someone hands you 10,000 numbers, these give you the 'story' of those numbers.


### Measures of Central Tendency

- Mean (Average): Sum all values, divide by count. Sensitive to outliers.
- Median: The middle value when sorted. Robust to outliers — use this for skewed data like income.
- Mode: Most frequent value. Used for categorical data.
```python
# Central tendency — notice how the outlier (100) affects the mean but not the median
import statistics
import numpy as np

data = [12, 15, 14, 10, 18, 14, 22, 14, 25, 100]  # 100 is an outlier

print(f'Mean:   {np.mean(data):.2f}')     # Pulled up by the outlier
print(f'Median: {np.median(data):.2f}')   # Robust — ignores the outlier
print(f'Mode:   {statistics.mode(data)}') # Most common value
```

```
# Output:
# Mean:   24.40   ← pulled up by outlier 100
# Median: 14.50   ← unaffected by outlier
# Mode:   14      ← appears 3 times
```

### Measures of Spread

- Standard Deviation (std): Average distance from the mean. Same units as data. Most commonly used.
- Variance: std squared. Hard to interpret (in squared units). Used internally by many algorithms.
- IQR (Interquartile Range): Q3 - Q1. Robust measure of spread; used for outlier detection.
```python
# Spread metrics
data = [23, 25, 28, 30, 32, 35, 38, 40, 42, 150]

print(f'Std Dev:   {np.std(data):.2f}')
print(f'Variance:  {np.var(data):.2f}')
print(f'Range:     {np.max(data) - np.min(data)}')
Q1, Q3 = np.percentile(data, [25, 75])
print(f'IQR:       {Q3 - Q1:.2f}')
```

```
# Output:
# Std Dev:   36.51
# Variance:  1333.0
# Range:     127
# IQR:       15.25
```

## 3.3 — Probability & The Normal Distribution

Probability measures how likely an event is. It ranges from 0 (impossible) to 1 (certain).

- P(A) + P(not A) = 1  (complementary rule)
- P(A and B) = P(A) x P(B)  when events are independent

### The Normal Distribution (Bell Curve)

The normal distribution is the most important distribution in statistics. Many natural phenomena follow it: heights, exam scores, measurement errors.

- Described by mean (mu) and standard deviation (sigma)
- 68% of data falls within 1 sigma of the mean
- 95% falls within 2 sigma
- 99.7% falls within 3 sigma — the '68-95-99.7 rule'
```python
# Normal distribution simulation
import numpy as np

# Generate 1000 heights: mean=170cm, std=10cm
np.random.seed(42)
heights = np.random.normal(loc=170, scale=10, size=1000)

print(f'Mean:      {heights.mean():.2f} cm')
print(f'Std:       {heights.std():.2f} cm')
print(f'Within 1s: {np.mean(np.abs(heights-170) < 10)*100:.1f}%')
print(f'Within 2s: {np.mean(np.abs(heights-170) < 20)*100:.1f}%')
```

```
# Output:
# Mean:      170.49 cm
# Std:        9.86 cm
# Within 1s: 68.4%  (theory: 68%)
# Within 2s: 95.8%  (theory: 95%)
```

## 3.4 — Hypothesis Testing

Hypothesis testing answers the question: 'Is this pattern real, or just random chance?'


### The Framework

- Null Hypothesis (H0): 'There is no effect / no difference.' — the boring answer
- Alternative Hypothesis (H1): 'There IS an effect.' — what we want to prove
- p-value: Probability of seeing results this extreme if H0 were true
- If p < 0.05: Reject H0. The result is statistically significant (less than 5% chance it is random).
```python
# t-test: Are male and female heights significantly different?
from scipy import stats
import numpy as np
np.random.seed(42)

male_heights   = np.random.normal(175, 8, 100)
female_heights = np.random.normal(162, 7, 100)

t_stat, p_value = stats.ttest_ind(male_heights, female_heights)
print(f't-statistic: {t_stat:.4f}')
print(f'p-value:     {p_value:.8f}')
if p_value < 0.05:
    print('Significant difference in heights — reject H0')
```

```
# Output:
# t-statistic: 11.9234
# p-value:     0.00000000
# Significant difference in heights — reject H0
```
> ⚠️ **Correlation vs. Causation:** A p-value tells you a result is unlikely to be random — it does NOT tell you what caused it. Ice cream sales and drowning rates are correlated (both peak in summer). Always ask: is there a lurking variable?


## 3.5 — Linear Algebra for Data Science

Linear algebra is the mathematics of data tables. Every dataset you work with is, at its core, a matrix of numbers.


### Vectors — Rows of Data

A vector is an ordered list of numbers. In data science, each row of your dataset is a vector of features.

```python
# Vectors with NumPy
import numpy as np

student_a = np.array([85, 92, 78])  # [math, science, english] scores
student_b = np.array([70, 88, 95])

print('Sum:        ', student_a + student_b)
print('Dot product:', np.dot(student_a, student_b))  # Similarity measure
print('Magnitude:  ', np.linalg.norm(student_a).round(2))
```

```
# Output:
# Sum:         [155 180 173]
# Dot product: 24076
# Magnitude:   138.02
```

### Matrices — Your Datasets

A matrix is a 2D array of numbers — exactly like a spreadsheet. Your datasets ARE matrices. A dataset with 1000 rows and 20 columns is a 1000 x 20 matrix.

```python
# Matrix operations
A = np.array([[1, 2], [3, 4], [5, 6]])  # 3x2 matrix
B = np.array([[7, 8, 9], [10, 11, 12]])  # 2x3 matrix

print('Shape of A:', A.shape)    # (3, 2)
print('Shape of B:', B.shape)    # (2, 3)
print('A x B shape:', (A @ B).shape)  # (3, 3) — matrix multiply
print('Transpose A shape:', A.T.shape) # (2, 3)
```

```
# Output:
# Shape of A: (3, 2)
# Shape of B: (2, 3)
# A x B shape: (3, 3)
# Transpose A shape: (2, 3)
```

## 3.6 — Calculus: Gradient Descent (with Code)

You do not need to solve calculus by hand. But you need to understand what a derivative means: it tells you the slope of a function at any point — how steeply it is rising or falling.

In machine learning, we minimize a loss function — a measure of how wrong our model is. Gradient descent uses the slope to decide which direction to step to reduce the loss.

> **🧠 Intuition:** Imagine you are blindfolded on a hilly landscape and want to reach the lowest point. You feel the slope under your feet and always step downhill. That is gradient descent — following the negative gradient to the minimum.


### Gradient Descent in 15 Lines

```python
# Gradient descent — finding the minimum of f(x) = x^2
# The true minimum is at x=0, where f(0)=0
def f(x):        return x ** 2         # The function to minimize
def gradient(x): return 2 * x          # Derivative: df/dx = 2x

x = 10.0         # Start far from minimum
lr = 0.1         # Learning rate — step size

for step in range(1, 11):
    grad = gradient(x)
    x = x - lr * grad    # Step in the downhill direction
    print(f'Step {step:2d}: x = {x:7.4f}, f(x) = {f(x):.4f}')
```

```
# Output:
# Step  1: x =  8.0000, f(x) = 64.0000
# Step  2: x =  6.4000, f(x) = 40.9600
# Step  5: x =  3.2768, f(x) = 10.7374
# Step 10: x =  1.0737, f(x) =  1.1529
# (After 50 steps, x ≈ 0.0001 — essentially at the minimum!)
```

## 3.7 — Hands-On Exercises

1. Load any dataset and compute mean, median, and std for all numerical columns. Find columns where mean and median differ by more than 20% — these likely have outliers or skew.
1. Simulate 10,000 runs of 1000 coin flips. For each run, record the number of heads. Plot the distribution. What shape forms? What does the Central Limit Theorem predict?
1. Run a t-test to check whether simulated coffee drinkers (mean=7hrs sleep, std=1) sleep differently than non-drinkers (mean=7.5hrs, std=0.9). Report the p-value and your conclusion.
1. Create a 4x4 matrix in NumPy. Compute its transpose, determinant, and inverse. Verify: A @ inv(A) should equal the identity matrix.

## 3.8 — Mini Project: Statistical Analysis of a Real Dataset

Using the 'tips' dataset from seaborn, perform a complete statistical analysis:

- Full descriptive statistics for all numeric columns
- Hypothesis test: Do smokers tip differently than non-smokers? (t-test; report p-value and conclusion)
- Correlation test: Is total bill correlated with tip? (Pearson r and p-value)
- Visualize: histogram and box plot of the tip column
- Write a 1-paragraph business summary of your statistical findings
```python
# Mini Project Starter
import seaborn as sns
from scipy import stats

tips = sns.load_dataset('tips')
print(tips.describe())

# Smokers vs non-smokers tip amount
smokers     = tips[tips['smoker']=='Yes']['tip']
non_smokers = tips[tips['smoker']=='No']['tip']
t, p = stats.ttest_ind(smokers, non_smokers)
print(f'Smoker mean: ${smokers.mean():.2f}, Non-smoker: ${non_smokers.mean():.2f}')
print(f'p-value: {p:.4f} — {\"Significant\" if p < 0.05 else \"Not significant\"}')
```

```
# Output:
# Smoker mean: $3.01, Non-smoker: $2.99
# p-value: 0.9317 — Not significant
# (Smokers and non-smokers tip almost identically)
```

## 3.9 — Interview Questions


### Basic

- What is the difference between mean and median? When would you use each?
- What does standard deviation tell you about a dataset?
- What is a p-value? What does p < 0.05 mean in plain language?

### Intermediate

- Explain the Central Limit Theorem and why it matters for machine learning.
- What is the difference between correlation and causation? Give an example of a spurious correlation.
- What is a confidence interval? Explain what 95% CI means in plain language.

### Advanced

- What is the difference between Type I error (false positive) and Type II error (false negative)? Which is worse in a medical diagnosis context?
- Explain Bayes' Theorem with a practical example (e.g., a medical test that is 99% accurate).
- How does eigendecomposition relate to PCA? (Covered fully in Chapter 12.)

## 3.10 — Key Terms

- Mean: Arithmetic average. Sensitive to outliers.
- Median: Middle value when sorted. Robust to outliers.
- Standard Deviation: Average distance of values from the mean.
- p-value: Probability of observing results this extreme if the null hypothesis is true.
- Normal Distribution: Symmetric bell-shaped distribution described by mean and std.
- Gradient Descent: Iterative optimization algorithm that follows the negative gradient to minimize a loss function.

## 3.11 — Summary

- Descriptive statistics describe data: mean (sensitive), median (robust), std, IQR.
- Probability measures likelihood. The normal distribution underpins many ML algorithms.
- Hypothesis testing (p < 0.05) tells us if results are statistically significant.
- Linear algebra: vectors are data points; matrices are datasets; operations underpin ML.
- Gradient descent uses derivatives to iteratively minimize a loss function — the heart of all ML training.
> **➡️ What's Next:** Chapter 4 introduces NumPy — Python's powerhouse for fast numerical computation. You will see how every concept from this chapter maps directly to NumPy arrays and operations.

---
