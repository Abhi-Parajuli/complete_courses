# PART II — DATA EXPLORATION & VISUALIZATION


# Chapter 6: Data Visualization with Matplotlib & Seaborn

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Create line, bar, histogram, scatter, box, and heatmap charts; (2) Explain the Matplotlib Figure and Axes object model; (3) Apply the 7 principles of effective data storytelling; (4) Distinguish when to use Matplotlib vs Seaborn.

> 📋 **Prerequisites:** Chapter 5 (Pandas DataFrames). Install: pip install matplotlib seaborn scipy


## 6.1 — Why Visualization?

The human brain processes images 60,000 times faster than text. A well-made chart can reveal a pattern that would take hours to find in raw numbers.

Famous example: Anscombe's Quartet — four datasets with identical statistical properties (same mean, variance, correlation) but completely different patterns that only become visible when plotted. Statistics alone would call them identical. Your eyes immediately see they are wildly different.

> 💡 **Why This Matters:** Every model insight must eventually be communicated to a non-technical stakeholder. A clear chart is worth 10 pages of statistics. Data scientists who can't visualize effectively are invisible in organizations.


## 6.2 — The Matplotlib Object Model

Before writing any code, understand the two key objects: a Figure is the entire canvas (like a piece of paper). An Axes object is the actual plot area drawn on that canvas. One Figure can contain multiple Axes (subplots).

```python
# The anatomy of a Matplotlib figure
# fig = the whole canvas | ax = the plot area inside it
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(10, 6))  # Create figure + one axes

x = np.linspace(0, 2 * np.pi, 100)
ax.plot(x, np.sin(x), label='sin(x)', color='blue', linewidth=2)
ax.plot(x, np.cos(x), label='cos(x)', color='red', linestyle='--')

ax.set_title('Sine and Cosine', fontsize=16, fontweight='bold')
ax.set_xlabel('x (radians)', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('sine_cosine.png', dpi=150, bbox_inches='tight')
plt.show()
```
> 💡 **Matplotlib vs Seaborn:** Matplotlib gives you full control over every pixel but requires more code. Seaborn is built on top of Matplotlib and provides a higher-level interface with statistical capabilities and better default aesthetics. Use Seaborn for quick statistical plots; use Matplotlib when you need precise control. They can be combined freely — a Seaborn plot on a Matplotlib axes.


## 6.3 — Common Chart Types


### Bar Chart — Compare Categories

```python
# Horizontal bar chart — best for many categories or long labels
categories = ['Python', 'R', 'SQL', 'Julia', 'Scala']
popularity  = [85, 45, 75, 20, 30]
colors = ['#1A5276' if p == max(popularity) else '#85C1E9' for p in popularity]

fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.barh(categories, popularity, color=colors, edgecolor='white', height=0.6)

# Label each bar directly (no need for legend)
for bar, val in zip(bars, popularity):
    ax.text(val + 1, bar.get_y() + bar.get_height()/2,
            f'{val}%', va='center', fontsize=11)

ax.set_title('Data Language Popularity', fontsize=14, fontweight='bold')
ax.set_xlabel('Popularity Score')
ax.spines['top'].set_visible(False)   # Remove clutter
ax.spines['right'].set_visible(False)
plt.tight_layout(); plt.show()
```

### Histogram — Understand Distributions

```python
# Histogram with KDE curve overlaid
from scipy import stats
data = np.random.normal(170, 10, 1000)

fig, ax = plt.subplots(figsize=(9, 5))
ax.hist(data, bins=30, density=True, alpha=0.7, color='steelblue', edgecolor='white')

# Overlay KDE (smooth curve showing the distribution shape)
x_range = np.linspace(data.min(), data.max(), 200)
kde = stats.gaussian_kde(data)
ax.plot(x_range, kde(x_range), color='darkblue', linewidth=2.5, label='KDE')

ax.set_title('Distribution of Heights (n=1000)')
ax.set_xlabel('Height (cm)')
ax.set_ylabel('Density')
ax.legend(); plt.tight_layout(); plt.show()
```

### Scatter Plot — Find Relationships

```python
# Scatter plot with per-department color coding
np.random.seed(42)
n = 200
experience = np.random.exponential(5, n)
salary     = 30000 + experience * 8000 + np.random.normal(0, 15000, n)
department = np.random.choice(['IT','Finance','HR'], n)

colors = {'IT': '#1A5276', 'Finance': '#1E8449', 'HR': '#CA6F1E'}
fig, ax = plt.subplots(figsize=(9, 6))
for dept, color in colors.items():
    mask = department == dept
    ax.scatter(experience[mask], salary[mask], c=color, label=dept, alpha=0.7, s=40)

ax.set_xlabel('Years of Experience')
ax.set_ylabel('Annual Salary ($)')
ax.set_title('Experience vs Salary by Department')
ax.legend(); plt.tight_layout(); plt.show()
```

## 6.4 — Seaborn: Statistical Visualization

```python
# Seaborn examples using the built-in 'tips' dataset
import seaborn as sns
tips = sns.load_dataset('tips')

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Box plot — shows median, IQR, and outliers
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[0])
axes[0].set_title('Bill by Day')

# Violin plot — box plot + full distribution shape
sns.violinplot(data=tips, x='sex', y='tip', hue='smoker', ax=axes[1])
axes[1].set_title('Tips: Gender & Smoking')

# Heatmap — correlation matrix
corr = tips.select_dtypes('number').corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm',
            center=0, ax=axes[2], cbar_kws={'shrink': 0.8})
axes[2].set_title('Correlation Heatmap')

plt.tight_layout(); plt.show()
```
> 💡 **Seaborn: Figure-Level vs Axes-Level Functions:** Seaborn has two types of functions. Figure-level (sns.relplot, sns.catplot, sns.displot) create their own figure — you cannot pass an existing ax. Axes-level (sns.scatterplot, sns.boxplot, sns.histplot) accept an ax= parameter and integrate with Matplotlib subplots. In the code above, axes[0] etc. use axes-level functions.


## 6.5 — Subplots and Dashboards

```python
# Creating a 2x3 dashboard layout
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle('Data Science Dashboard', fontsize=18, fontweight='bold', y=1.02)

# axes is a 2x3 array — access with axes[row, col]
axes[0, 0].set_title('Chart 1: Overview')
axes[0, 1].set_title('Chart 2: Trend')
axes[0, 2].set_title('Chart 3: Distribution')
axes[1, 0].set_title('Chart 4: Comparison')
axes[1, 1].set_title('Chart 5: Correlation')
axes[1, 2].set_title('Chart 6: Scatter')

# Add your charts to each axes...
plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
```

## 6.6 — Data Storytelling Principles

A beautiful chart is useless if it does not communicate a clear insight. Here are 7 professional principles:


## 6.7 — Hands-On Exercises

1. Create a 4-panel figure: (1) line chart of a simulated stock price over 252 trading days, (2) bar chart of volume by day of week, (3) histogram of daily returns, (4) scatter of price vs volume. Add proper titles, axis labels, and grid.
1. Load the Iris dataset and create: (a) a pair plot (sns.pairplot with hue='species'), (b) a heatmap of feature correlations, (c) box plots comparing petal length across species. Interpret each chart in 1-2 sentences.
1. Find a chart from a business report or news article. Recreate it in Python using real or simulated data. Apply the 7 storytelling principles to improve on the original.
1. Practice chart selection: for each scenario below, name the best chart type and explain why: (a) sales by country, (b) website traffic over 12 months, (c) age distribution of customers, (d) correlation between marketing spend and revenue.

## 6.8 — Mini Project: Data Visualization Dashboard

Using the Titanic or any Kaggle dataset, build a 6-panel visualization dashboard that tells the complete story of the data:

- Panel 1: Overall statistics (bar chart of key counts)
- Panel 2: Target variable distribution (survival rate by category)
- Panel 3: Key numerical distributions (age, fare histograms)
- Panel 4: Category comparisons (survival by class and gender — grouped bars)
- Panel 5: Correlation heatmap of all numeric features
- Panel 6: The single most interesting scatter relationship
- Add: overall title, axis labels on every chart, text box with 3 key insights

## 6.9 — Interview Questions


### Basic

- When would you use a bar chart vs. a line chart? Give a specific example of each.
- What is the difference between Matplotlib and Seaborn? Can you use both in the same plot?
- What information does a box plot convey? Identify each component (whiskers, box, median, outlier dots).

### Intermediate

- How do you choose between a histogram and a KDE plot? What does each emphasize?
- What is the difference between figure-level and axes-level functions in Seaborn? Give an example of each.
- What is a pair plot and when is it most useful?

### Advanced

- Name 3 commonly used chart types that are often misleading, and describe a better alternative for each.
- How would you build an interactive visualization dashboard in Python? (Plotly, Dash, Streamlit)
- A stakeholder says your chart 'proves' X causes Y. How do you respond?

## 6.10 — Key Terms

- Figure: The entire Matplotlib canvas. Created with plt.figure() or plt.subplots().
- Axes: A single plot area within a Figure. Has x-axis, y-axis, title, and chart elements.
- KDE (Kernel Density Estimate): A smooth curve approximating the probability density of data.
- Heatmap: A 2D color-coded grid showing intensity of values; used for correlation matrices.
- Pair plot: A grid of scatter plots for all pairs of variables in a dataset, with distributions on the diagonal.

## 6.11 — Summary

- Matplotlib: low-level, full control. fig, ax = plt.subplots() is the standard pattern.
- Seaborn: high-level statistical interface; figure-level functions create their own figure; axes-level accept ax=.
- Chart types: line (trends), bar (comparisons), histogram (distributions), scatter (relationships), heatmap (correlations).
- Data storytelling: clear message, right chart type, minimal clutter, direct labels, honest scales.
> **➡️ What's Next:** Chapter 7 covers EDA — using all your visualization and Pandas skills to systematically explore any new dataset, uncover patterns, and form hypotheses before modeling.

---
