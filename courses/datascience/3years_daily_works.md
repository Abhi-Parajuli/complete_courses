# 🚀 3-Year Data Science Mastery Roadmap (2026 Edition)
### Beginner → Job-Ready Data Scientist / ML Engineer / AI Engineer

> **Designed for:** Intermediate beginners | **Study time:** 4–5 hours/day | **Days/week:** 6 days
> **Philosophy:** Project-first learning, mathematical foundations, industry-ready skills
> **Target roles:** Data Scientist · ML Engineer · AI Engineer · MLOps Engineer

---

## 📋 TABLE OF CONTENTS

1. [Overview & Learning Philosophy](#overview)
2. [Daily & Weekly Routine Template](#routine)
3. [Phase 1: Foundations (Months 1–6)](#phase1)
4. [Phase 2: Data Analysis & Visualization (Months 7–9)](#phase2)
5. [Phase 3: Machine Learning (Months 10–15)](#phase3)
6. [Phase 4: Deep Learning (Months 16–21)](#phase4)
7. [Phase 5: Advanced AI — NLP, CV, GenAI, LLMs, Agents (Months 22–27)](#phase5)
8. [Phase 6: Professional Development & MLOps (Months 28–36)](#phase6)
9. [Project Catalog (65 Projects)](#projects)
10. [Monthly Assessment Framework](#assessments)
11. [Portfolio Milestones](#portfolio)
12. [Career Preparation](#career)
13. [Year-by-Year Summary Tables](#summary)
14. [Resource Master List](#resources)

---

## 1. OVERVIEW & LEARNING PHILOSOPHY {#overview}

### The 2026 Data Science Landscape

The field has converged around three pillars:
- **Classical ML** (still dominant in industry for tabular data)
- **Deep Learning / Foundation Models** (computer vision, NLP, multimodal)
- **Generative AI & Agents** (LLMs, RAG, agentic pipelines — now table stakes)

This roadmap is calibrated to make you strong in all three. It prioritizes **doing over reading**, **building over watching**, and **deploying over experimenting**.

### Learning Constraints Assumed
| Parameter | Value |
|-----------|-------|
| Starting level | Intermediate beginner (some Python exposure) |
| Study hours/day | 4–5 hours |
| Study days/week | 6 days (1 rest day) |
| Total learning hours | ~3,500–4,000 hours over 3 years |
| Budget | Free resources + occasional ~$20–50 course |
| Primary OS | Any (Linux/macOS preferred for ML workflows) |

---

## 2. PERFECT DAILY & WEEKLY ROUTINE TEMPLATE {#routine}

### 🌅 Daily Study Session (5 Hours)

| Block | Duration | Activity |
|-------|----------|----------|
| **Block 1** | 60 min | Theory study (read docs, textbook, or watch lecture) |
| **Block 2** | 90 min | Hands-on coding (notebooks, exercises, labs) |
| **Break** | 15 min | Walk, water, no screens |
| **Block 3** | 60 min | Problem solving (LeetCode/HackerRank/Kaggle exercises) |
| **Block 4** | 60 min | Project work (your active project) |
| **Block 5** | 30 min | Notes creation (Obsidian, Notion, or markdown) |
| **Block 6** | 15 min | Revision — review yesterday's notes (spaced repetition) |

> **Tip:** Use Pomodoro (25 min on / 5 min off) inside each block.

### 📅 Weekly Routine

| Day | Focus | Activity |
|-----|-------|----------|
| **Monday** | New Theory | Start new week's topic, read/watch core material |
| **Tuesday** | Deep Coding | Implement theory from Monday in code |
| **Wednesday** | Problem Solving | Exercises, challenges, Kaggle kernels |
| **Thursday** | Project Day | Dedicated project sprint |
| **Friday** | Integration | Connect this week's skill to prior learning |
| **Saturday** | Review + Blog | Weekly notes review, write one short post |
| **Sunday** | **REST** | No structured study — recharge |

### 📆 Monthly Rhythm

| Week | Theme |
|------|-------|
| Week 1 | Core concepts + foundations |
| Week 2 | Implementation + exercises |
| Week 3 | Project application |
| Week 4 | Assessment + review + next month prep |

---

## PHASE 1: FOUNDATIONS {#phase1}
### Duration: Months 1–6 (26 Weeks)
### Goal: Build unshakeable foundations in Python, Math, Statistics, and SQL
### Expected Outcomes:
- Write clean, idiomatic Python for data tasks
- Understand linear algebra, calculus, probability at a working level
- Query databases confidently with SQL (including window functions)
- Build and analyze datasets with NumPy and Pandas
- Solve beginner ML problems from scratch

---

### MONTH 1: Python for Data Science

**Goal:** Become fluent in Python fundamentals and the data science ecosystem.

**Skills:** Python syntax, data structures, OOP basics, NumPy, file I/O, Jupyter

**Resources:**
- 📖 *Python Crash Course* — Eric Matthes (free via library or low cost)
- 🎥 CS50P — Harvard (free on edX)
- 🎥 Corey Schafer Python playlist (YouTube)
- 📚 Python docs: docs.python.org
- 💻 Practice: Exercism.io (Python track), HackerRank Python

---

#### WEEK 1: Python Syntax & Data Types

##### Day 1 — Setup + Python Basics
**Topics:** Python installation, Jupyter setup, variables, types, operators
**Learning Objectives:**
- Install Python 3.11+, set up virtual environments with `venv`
- Launch and navigate Jupyter Notebook/Lab
- Understand int, float, str, bool types
- Use basic arithmetic and comparison operators

**Study Materials:** Python Crash Course Ch. 1–2 | CS50P Lecture 0
**Practice Exercises:**
- Write a program that asks your name and prints "Hello, [name]! You are a future Data Scientist."
- Build a simple calculator (add, subtract, multiply, divide) with user input
- Convert temperature between Celsius and Fahrenheit

**Time Allocation:**
- Theory: 60 min (read Ch. 1–2, watch CS50P L0)
- Coding: 90 min (set up environment, run exercises)
- Problem solving: 60 min (HackerRank: Python intro challenges ×5)
- Project: 60 min (start "Python Fundamentals Notebook" — document everything you learn)
- Notes: 30 min
- Revision: 15 min (review Day 0 if applicable, else read roadmap)

---

##### Day 2 — Strings & String Methods
**Topics:** String slicing, methods, f-strings, multiline strings, escape characters
**Learning Objectives:**
- Manipulate strings with `.upper()`, `.lower()`, `.strip()`, `.split()`, `.join()`
- Format output with f-strings
- Slice strings with `[start:stop:step]`

**Practice Exercises:**
- Parse a full name string → extract first and last name
- Count the number of vowels in a sentence
- Reverse a string without using `[::-1]` (use a loop)
- Build a simple word frequency counter

**Time Allocation:** Same daily structure (60/90/60/60/30/15)

---

##### Day 3 — Lists & Tuples
**Topics:** List creation, indexing, slicing, list methods, tuples, list comprehensions
**Learning Objectives:**
- Use `.append()`, `.extend()`, `.insert()`, `.remove()`, `.sort()`, `.reverse()`
- Understand mutability difference between lists and tuples
- Write list comprehensions for concise filtering and transformation

**Practice Exercises:**
- Flatten a list of lists
- Find all even numbers from 1–100 using list comprehension
- Sort a list of dictionaries by a key
- Remove duplicates from a list preserving order

---

##### Day 4 — Dictionaries & Sets
**Topics:** Dictionary CRUD, `.keys()`, `.values()`, `.items()`, nested dicts, sets and set operations
**Learning Objectives:**
- Create, update, delete dict entries
- Iterate over dicts with `.items()`
- Use sets for deduplication and intersection/union operations

**Practice Exercises:**
- Count word frequency in a paragraph using a dict
- Build a simple student grade tracker (dict of dicts)
- Find common elements between two lists using sets
- Invert a dictionary (swap keys and values)

---

##### Day 5 — Control Flow
**Topics:** `if/elif/else`, `for` loops, `while` loops, `break/continue/pass`, `range()`
**Learning Objectives:**
- Write clean conditional logic
- Build loops that iterate over collections
- Avoid infinite loops; use `break` and `continue` purposefully

**Practice Exercises:**
- FizzBuzz (classic — do it properly)
- Number guessing game with limited attempts
- Print Pascal's triangle for n rows
- Find all prime numbers up to N (Sieve of Eratosthenes)

---

##### Day 6 — Functions & Scope
**Topics:** `def`, parameters, return values, `*args`, `**kwargs`, default args, scope (LEGB), lambda
**Learning Objectives:**
- Write reusable, well-named functions
- Understand local vs. global scope
- Use lambda for simple one-liners
- Write functions with default and keyword arguments

**Practice Exercises:**
- Write a function that returns statistics (min, max, mean, median) of a list
- Build a recursive factorial and fibonacci function
- Create a decorator that times function execution
- Write a higher-order function that applies any function to a list

---

#### WEEK 2: Advanced Python + File Handling

##### Day 8 — Modules, Packages, `import`
**Topics:** Standard library modules (`os`, `sys`, `math`, `random`, `datetime`), pip, virtual environments
**Practice:** Build a "daily journal" CLI using `datetime` and `os`

##### Day 9 — File I/O
**Topics:** Reading/writing `.txt`, `.csv`, `.json` files, context managers (`with` statement)
**Practice:** Read a CSV manually (without pandas), parse it into a list of dicts, write filtered results to a new CSV

##### Day 10 — Error Handling
**Topics:** `try/except/finally`, custom exceptions, `raise`, `assert`
**Practice:** Add robust error handling to your CSV reader; handle file-not-found and malformed data gracefully

##### Day 11 — Object-Oriented Programming (Part 1)
**Topics:** Classes, `__init__`, instance methods, `self`, attributes
**Practice:** Build a `DataSet` class that loads CSV data and provides `.shape`, `.head()`, `.describe()` methods

##### Day 12 — OOP Part 2 + Comprehensions
**Topics:** Inheritance, `super()`, `__str__`, `__repr__`, dict/set comprehensions, generators
**Practice:** Extend `DataSet` class with filtering and transformation methods; build a generator that yields rows lazily

##### Day 13 — Week 2 Review + Mini Project
**Mini Project:** Build a "Data Profiler" CLI in pure Python
- Reads any CSV
- Reports: shape, column names, data types (inferred), null count per column, min/max/mean for numeric columns
- Saves report to a `.txt` file
**Assessment:** Can you write this from memory without Google?

---

#### WEEK 3: NumPy

**Resources:**
- 📖 NumPy official docs (numpy.org)
- 🎥 NumPy tutorial — Keith Galli (YouTube)
- 💻 Practice: numpy exercises on GitHub (rougier/numpy-100)

##### Day 15 — NumPy Arrays
**Topics:** `np.array()`, dtypes, shape, ndim, broadcasting rules, `np.zeros/ones/arange/linspace`
**Objectives:** Understand why NumPy is faster than pure Python; create and inspect arrays

##### Day 16 — Array Operations
**Topics:** Vectorized arithmetic, comparison operators, boolean indexing, fancy indexing
**Practice:** Implement mean, variance, standard deviation using only NumPy ops (then verify with `np.std`)

##### Day 17 — Array Manipulation
**Topics:** `reshape`, `transpose`, `flatten`, `concatenate`, `stack`, `split`
**Practice:** Implement matrix multiplication manually, then verify with `np.dot` / `@`

##### Day 18 — NumPy for Linear Algebra
**Topics:** `np.linalg` — eigenvalues, SVD, matrix inverse, determinant, solve linear systems
**Practice:** Solve a system of 3 linear equations; compute PCA from scratch using SVD

##### Day 19 — NumPy Advanced
**Topics:** Structured arrays, masked arrays, `np.where`, `np.vectorize`, random module
**Practice:** Simulate 10,000 coin flips; compute confidence interval for the mean

##### Day 20 — Week 3 Review + NumPy Challenge
**Challenge:** Complete 30 problems from `rougier/numpy-100` on GitHub

---

#### WEEK 4: Month 1 Assessment + Project

##### Day 22 — Month 1 Assessment
**Quiz Topics:**
- Python data structures (20 MCQ)
- OOP design (5 short answers)
- NumPy broadcasting and indexing (10 coding)

**Coding Challenges:**
1. Implement a stack and queue using Python classes
2. Write a vectorized function that normalizes a NumPy array to [0, 1]
3. Parse a messy JSON file and extract nested values

**Pass Benchmark:** 75% quiz + all 3 coding challenges completed

##### Days 23–26 — Beginner Project #1: Data Profiler (Enhanced)
**Project:** Python + NumPy Data Analysis Tool
- Load any CSV dataset
- Compute: shape, dtypes, missing values, correlation matrix (NumPy), distribution stats
- Detect and flag outliers using IQR method
- Output formatted console report + save to JSON
- **Dataset:** Iris, Titanic, or any CSV
- **Portfolio Value:** ⭐⭐ — shows Python fluency and analytical thinking

---

### MONTH 2: Mathematics for Data Science

**Goal:** Build mathematical intuition for ML algorithms
**Skills:** Linear algebra, calculus, probability foundations
**Why it matters:** Every ML algorithm is applied math. Understanding the math makes you dangerous.

**Resources:**
- 📖 *Mathematics for Machine Learning* — Deisenroth, Faisal, Ong (FREE PDF at mml-book.github.io)
- 🎥 3Blue1Brown: *Essence of Linear Algebra* (YouTube — mandatory)
- 🎥 3Blue1Brown: *Essence of Calculus* (YouTube — mandatory)
- 🎥 Gilbert Strang MIT 18.06 Linear Algebra (MIT OpenCourseWare — free)
- 💻 Khan Academy (for calculus review)

---

#### WEEK 5: Linear Algebra

##### Day 29 — Vectors
**Topics:** Vector definition, addition, scalar multiplication, dot product, magnitude, unit vectors
**Objectives:** Understand vectors as directions in space; compute similarity via dot product
**Coding:** Implement all vector operations in NumPy; visualize 2D vectors with Matplotlib

##### Day 30 — Matrices
**Topics:** Matrix operations, matrix-vector multiplication, identity matrix, transpose
**Coding:** Implement forward pass of a single-layer neural network (just matrix multiply + bias): `y = Wx + b`

##### Day 31 — Linear Transformations
**Topics:** What matrices *do* geometrically, rotation, scaling, shearing; eigenvectors = special directions
**Coding:** Animate a 2D transformation (rotate a square) using Matplotlib

##### Day 32 — Systems of Linear Equations
**Topics:** Row reduction, Gaussian elimination, rank, null space; `np.linalg.solve`
**Coding:** Solve a price optimization problem: 3 products, 3 constraints

##### Day 33 — Eigenvalues & Eigenvectors
**Topics:** Eigen decomposition, why they matter (PCA, PageRank, graph analysis)
**Coding:** Compute eigen decomposition manually; verify against `np.linalg.eig`; visualize eigenvectors

##### Day 34 — SVD & PCA from Scratch
**Topics:** Singular Value Decomposition; Principal Component Analysis as low-rank approximation
**Coding:** Implement PCA from scratch (center → SVD → project); apply to Iris dataset; plot first 2 PCs

---

#### WEEK 6: Calculus for ML

##### Day 36 — Derivatives
**Topics:** Limits, derivative rules (power, chain, product), partial derivatives
**Coding:** Numerical differentiation; verify analytical derivatives numerically

##### Day 37 — Gradient & Optimization
**Topics:** Gradient as "direction of steepest ascent," gradient descent intuition
**Coding:** Implement gradient descent to minimize `f(x) = x² + 3x + 5`; animate convergence

##### Day 38 — Multivariable Calculus
**Topics:** Partial derivatives, Jacobian, Hessian, saddle points, convexity
**Coding:** Visualize a 3D loss surface; find local minima using gradient descent

##### Day 39 — The Chain Rule (Backprop Foundation)
**Topics:** Chain rule for composite functions; how backpropagation is just chain rule applied to computation graphs
**Coding:** Manually compute gradients for `L = (y - (wx + b))²` with respect to `w` and `b`

##### Day 40 — Integrals & Probability Connection
**Topics:** Definite integrals, area under curve, connection to probability density functions
**Coding:** Numerically estimate π using Monte Carlo integration

---

#### WEEK 7: Probability & Statistics Foundations

**Resources:**
- 📖 *Think Stats* — Allen Downey (FREE at greenteapress.com)
- 📖 *Think Bayes* — Allen Downey (FREE)
- 🎥 StatQuest with Josh Starmer (YouTube — the absolute best)

##### Day 43 — Probability Basics
**Topics:** Sample space, events, P(A), P(A∪B), P(A∩B), conditional probability, Bayes' theorem
**Coding:** Simulate coin flips, dice rolls; verify law of large numbers empirically

##### Day 44 — Random Variables & Distributions
**Topics:** Discrete vs continuous, PMF, PDF, CDF; Bernoulli, Binomial, Poisson, Uniform
**Coding:** Plot PMFs and CDFs using Matplotlib and scipy.stats; simulate each distribution

##### Day 45 — Normal Distribution & Central Limit Theorem
**Topics:** Properties of normal distribution, Z-scores, CLT (the most important theorem in stats)
**Coding:** Demonstrate CLT: take means of random samples of increasing size; watch it normalize

##### Day 46 — Expectation, Variance, Covariance
**Topics:** E[X], Var(X), Cov(X,Y), correlation coefficient, independence vs uncorrelation
**Coding:** Compute from scratch, verify with numpy; create a covariance heatmap

##### Day 47 — Common Continuous Distributions
**Topics:** Exponential, Beta, Gamma, Log-Normal — when to use each
**Coding:** Fit distributions to real data using scipy.stats

---

#### WEEK 8: Month 2 Assessment + Math Project

**Quiz Topics:** Linear algebra, calculus, probability (30 mixed questions)

**Coding Challenges:**
1. Implement PCA from scratch without sklearn
2. Implement gradient descent for linear regression from scratch
3. Prove CLT empirically with a visualization

**Beginner Project #2: Mathematical Visualization Dashboard**
- Interactive plots for: vector transformations, gradient descent animation, CLT demonstration, distribution explorer
- **Dataset:** Synthetic
- **Portfolio Value:** ⭐⭐⭐ — rare to see; shows math depth beyond typical DS candidates

---

### MONTH 3: Statistics for Data Science

**Goal:** Think statistically — understand uncertainty, inference, and experimental design
**Skills:** Descriptive stats, hypothesis testing, regression, Bayesian thinking

**Resources:**
- 📖 *Statistics* — Freedman, Pisani, Purves
- 🎥 StatQuest (entire playlist — mandatory)
- 💻 scipy.stats documentation

---

#### WEEKS 9–10: Descriptive & Inferential Statistics

##### Day 57 — Descriptive Statistics
**Topics:** Mean, median, mode, variance, std, skewness, kurtosis, percentiles, IQR
**Coding:** Compute all stats from scratch on Titanic dataset; compare to `pd.describe()`

##### Day 58 — Sampling & Estimation
**Topics:** Population vs sample, point estimates, interval estimates, confidence intervals, bootstrap
**Coding:** Bootstrap confidence intervals for mean survival rate (Titanic)

##### Day 59 — Hypothesis Testing Framework
**Topics:** H₀ and H₁, Type I/II errors, significance level α, p-value, power
**Coding:** Test: "Did female passengers have higher survival rate?" — formulate, test, interpret

##### Day 60 — T-Tests
**Topics:** One-sample, two-sample, paired t-test; when to use each; assumptions
**Coding:** Compare house prices in two neighborhoods using two-sample t-test

##### Day 61 — ANOVA
**Topics:** One-way ANOVA, F-statistic, post-hoc tests (Tukey HSD), when ANOVA vs t-test
**Coding:** Test if different fare classes (Titanic) have significantly different ages

##### Day 62 — Chi-Square Tests
**Topics:** Goodness of fit, test of independence; contingency tables
**Coding:** Test if survival is independent of passenger class (Titanic)

##### Day 63 — Correlation vs Causation
**Topics:** Pearson, Spearman, Kendall correlations; spurious correlation; confounders
**Coding:** Build correlation matrix; identify spurious correlations in a dataset

##### Day 64 — A/B Testing
**Topics:** Experimental design, control/treatment, randomization, sample size calculation, statistical significance
**Coding:** Simulate an A/B test for an e-commerce checkout page; determine minimum sample size

##### Day 65 — Non-Parametric Tests
**Topics:** Mann-Whitney U, Wilcoxon, Kruskal-Wallis — when normality fails
**Coding:** Compare when parametric vs non-parametric gives different conclusions

##### Day 66 — Multiple Testing Problem
**Topics:** FWER, FDR, Bonferroni correction, Benjamini-Hochberg
**Coding:** Run 100 hypothesis tests on random data; observe false positive rate; apply corrections

##### Day 67 — Bayesian Statistics Intro
**Topics:** Prior, likelihood, posterior; Bayes vs frequentist mindset
**Coding:** Bayesian A/B test; update belief as data arrives; animate posterior update

##### Day 68 — Regression as Statistical Inference
**Topics:** OLS regression, R², p-values for coefficients, confidence bands, residual analysis
**Coding:** Regress house price on square footage; interpret every output of `statsmodels.OLS`

---

#### WEEKS 11–12: Month 3 Assessment + Stats Project

**Project #3: Statistical Analysis Report — House Price Analysis**
- Load Ames Housing or California Housing dataset
- Full EDA with descriptive stats
- 5+ hypothesis tests with interpretations
- A/B test design for a hypothetical pricing experiment
- Regression model with confidence intervals
- Written report (Jupyter notebook, publication quality)
- **Portfolio Value:** ⭐⭐⭐⭐

---

### MONTH 4: SQL for Data Science

**Goal:** Write complex SQL queries confidently; understand database design
**Skills:** SELECT/JOIN/GROUP BY, window functions, CTEs, subqueries, indexes, query optimization

**Resources:**
- 🎥 Mode Analytics SQL Tutorial (free at mode.com)
- 🎥 Alex the Analyst SQL playlist (YouTube)
- 💻 SQLiteOnline.com (practice in browser)
- 💻 Chinook Database (sqlite)
- 💻 StrataScratch, LeetCode SQL, HackerRank SQL
- 📖 *Learning SQL* — Alan Beaulieu

---

#### WEEK 13: SQL Foundations

##### Day 78 — SELECT, WHERE, ORDER BY
**Topics:** Basic SELECT, filtering with WHERE, sorting, LIMIT, DISTINCT, aliases
**Practice:** 20 queries on Chinook: "List all tracks costing more than $1, ordered by price desc"

##### Day 79 — Aggregations & GROUP BY
**Topics:** COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, NULL handling
**Practice:** "Total sales by country, only countries with >$50 total, sorted desc"

##### Day 80 — JOINs (All Types)
**Topics:** INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF JOIN; join conditions; Venn diagram intuition
**Practice:** 15 join queries involving 3+ tables in Chinook

##### Day 81 — Subqueries & CTEs
**Topics:** Correlated subqueries, IN/EXISTS, WITH clause (CTEs), recursive CTEs intro
**Practice:** "Find customers who spent more than the average customer" — solve 3 ways (subquery, CTE, window)

##### Day 82 — Window Functions
**Topics:** ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTILE, running totals with SUM OVER
**Practice:** "Rank tracks by sales within each genre"; "Calculate 3-month rolling average revenue"

##### Day 83 — String, Date, Type Functions
**Topics:** SUBSTR, UPPER/LOWER, TRIM, COALESCE, CAST, STRFTIME, date arithmetic
**Practice:** "Find customers whose names start with 'M' and have invoices in Q4 of any year"

##### Day 84 — Advanced SQL
**Topics:** CASE WHEN, PIVOT-like queries, full-text, indexes, EXPLAIN QUERY PLAN
**Practice:** "Build a cohort analysis: customers by first purchase year, subsequent year retention"

---

#### WEEKS 14–16: SQL Deep Practice

##### Day 85 — SQL for Analytics Patterns
**Topics:** Sessionization, funnels, retention curves, period-over-period comparisons
**Practice:** Build a 4-week retention analysis from simulated event log data

##### Day 86–90 — StrataScratch & LeetCode SQL Sprint
**Daily target:** 5–8 SQL problems/day (Medium to Hard)
**Focus problems:**
- Leetcode #185: Department Top Three Salaries (Hard)
- Leetcode #262: Trips and Users (Hard)
- Leetcode #601: Human Traffic of Stadium (Hard)
- StrataScratch: Spotify, Airbnb, Amazon, Facebook SQL questions

##### Days 91–94 — SQL Project + Assessment

**Project #4: Music Store Business Intelligence (SQL)**
- Chinook database analysis
- 20 business questions answered with queries
- Window function analytics: artist rankings, sales trends, customer cohorts
- Schema diagram, query documentation
- Export results to Python for visualization
- **Portfolio Value:** ⭐⭐⭐

**Month 4 Assessment:**
- 20 SQL queries (beginner to hard)
- Explain a query plan and optimization strategy
- Design a schema for a given business problem

---

### MONTH 5: Pandas & Data Wrangling

**Goal:** Master Pandas for data manipulation at scale; handle real-world messy data
**Skills:** DataFrame operations, merging, groupby, time series, string operations, data cleaning

**Resources:**
- 📖 *Python for Data Analysis* — Wes McKinney (Pandas creator — 3rd ed.)
- 🎥 Corey Schafer Pandas playlist (YouTube)
- 🎥 Keith Galli Pandas tutorial (YouTube)
- 💻 Pandas official docs (pandas.pydata.org)
- 💻 100 Pandas Puzzles — GitHub (ajcr/100-pandas-puzzles)

---

#### WEEK 17: Pandas Core Operations

##### Day 99 — DataFrame Fundamentals
**Topics:** Series vs DataFrame, creation methods, `read_csv/json/excel`, dtypes, index
**Practice:** Load 5 different datasets; profile each with `.info()`, `.describe()`, `.dtypes`

##### Day 100 — Indexing & Selection
**Topics:** `[]`, `.loc`, `.iloc`, `.at`, `.iat`, boolean indexing, multi-level index
**Practice:** 20 selection exercises; build intuition for when to use `.loc` vs `.iloc`

##### Day 101 — Filtering & Sorting
**Topics:** Complex boolean conditions, `.query()`, `.sort_values()`, `.nlargest()`, `.nsmallest()`
**Practice:** "Top 10 customers by revenue who joined in the last 2 years"

##### Day 102 — Adding & Modifying Columns
**Topics:** Assignment, `apply()`, `map()`, `applymap()`, `assign()`, vectorized string operations
**Practice:** Feature engineering exercise — create 10 new features from a raw dataset

##### Day 103 — GroupBy & Aggregation
**Topics:** `groupby()`, `.agg()`, multiple aggregations, `transform()` vs `apply()`, custom functions
**Practice:** "Average order value by customer segment, month, and product category"

##### Day 104 — Merging & Joining DataFrames
**Topics:** `merge()`, `join()`, `concat()`; all join types; merge indicators; handling duplicate columns
**Practice:** Replicate your SQL JOIN exercises from Month 4 entirely in Pandas

##### Day 105 — Pivot Tables & Reshaping
**Topics:** `pivot_table()`, `melt()`, `stack()`, `unstack()`, `crosstab()`
**Practice:** Build an e-commerce cohort analysis using pivot tables

---

#### WEEK 18: Data Cleaning (The 80% of the Job)

##### Day 106 — Missing Data
**Topics:** Detecting (`.isnull()`, `.info()`), patterns (MCAR/MAR/MNAR), imputation strategies
**Coding:** Compare: drop vs mean impute vs KNN impute — measure impact on downstream model

##### Day 107 — Outlier Detection & Treatment
**Topics:** IQR method, Z-score method, visualization (boxplot, violin), capping vs removal vs flagging
**Coding:** Clean a salary dataset; document each decision

##### Day 108 — Duplicate Detection
**Topics:** `.duplicated()`, `.drop_duplicates()`, fuzzy duplicate detection concept
**Coding:** Find near-duplicates in a messy customer database

##### Day 109 — Data Type Fixes & String Cleaning
**Topics:** `pd.to_datetime()`, `pd.to_numeric()`, `.str` accessor, regex with Pandas
**Coding:** Clean a real estate dataset — dates in 6 formats, prices as strings with "$" and commas

##### Day 110 — Data Validation
**Topics:** Schema validation with pandera, custom validation functions, assertion-based testing
**Coding:** Build a validation pipeline that checks 10 business rules before analysis

---

#### WEEKS 19–20: Month 5 Assessment + Pandas Project

**Project #5: E-Commerce Customer Analytics Pipeline**
- Dataset: Brazilian E-Commerce (Kaggle — Olist)
- Full data cleaning pipeline (document every decision)
- Customer segmentation by RFM (Recency, Frequency, Monetary) using groupby
- Monthly revenue trends
- Cohort analysis (month of first purchase vs subsequent months)
- Product return analysis
- Fully documented Jupyter notebook
- **Portfolio Value:** ⭐⭐⭐⭐⭐ — This is a professional-grade analysis

---

### MONTH 6: Data Visualization

**Goal:** Communicate data insights clearly and compellingly through visualization
**Skills:** Matplotlib, Seaborn, Plotly, visualization principles, storytelling with data

**Resources:**
- 📖 *Storytelling with Data* — Cole Nussbaumer Knaflic (essential)
- 🎥 Matplotlib/Seaborn — Corey Schafer (YouTube)
- 🎥 Plotly Express tutorials (plotly.com/python)
- 💻 From Data to Viz (data-to-viz.com — chart type chooser)

---

#### WEEK 21: Matplotlib Foundations

##### Day 127 — Matplotlib Architecture
**Topics:** `Figure`, `Axes`, `Artist` objects; `plt.subplots()`; styles; saving figures
**Practice:** Recreate 5 charts from a news article using only Matplotlib

##### Day 128 — Line, Scatter, Bar Charts
**Topics:** `plot()`, `scatter()`, `bar()`, `barh()`; labels, titles, legends, annotations
**Practice:** COVID case trend line chart with annotations for key events

##### Day 129 — Histograms, KDE, Box Plots
**Topics:** `hist()`, `kde` with seaborn, `boxplot()`, `violinplot()`; interpreting distributions
**Practice:** Distribution analysis of 10 features from a dataset

##### Day 130 — Heatmaps & Correlation Plots
**Topics:** `imshow()`, Seaborn `heatmap()`, annotated correlation matrices
**Practice:** Full correlation heatmap for House Prices dataset

##### Day 131 — Subplots & Multi-panel Figures
**Topics:** `plt.subplots(m, n)`, `GridSpec`, `tight_layout()`, shared axes
**Practice:** 6-panel exploratory figure for Titanic dataset

---

#### WEEK 22: Seaborn & Statistical Visualization

##### Day 134 — Seaborn Basics
**Topics:** Seaborn's grammar: `catplot`, `relplot`, `displot`, `lmplot`; figure-level vs axes-level
**Practice:** Recreate any 5 charts from a Seaborn gallery example

##### Day 135 — Distribution Visualization
**Topics:** `histplot`, `kdeplot`, `ecdfplot`, `rugplot`, `pairplot`
**Practice:** Pairplot on Iris → identify class separability

##### Day 136 — Categorical Visualization
**Topics:** `boxplot`, `violinplot`, `stripplot`, `swarmplot`, `barplot`, `pointplot`
**Practice:** Compare salary distributions by job title and experience level

##### Day 137 — Regression & Statistical Plots
**Topics:** `lmplot`, `regplot`, `residplot`; visualizing confidence bands
**Practice:** Plot regression relationship with confidence intervals for 3 different feature pairs

---

#### WEEKS 23–24: Plotly + Phase 1 Final Project

##### Days 141–147 — Plotly & Interactive Visualization
**Topics:** `plotly.express` vs `plotly.graph_objects`; interactive scatter, choropleth, sunburst, Sankey; `dash` intro
**Practice:** Build an interactive sales dashboard with filters

**Project #6: Interactive Data Storytelling Dashboard**
- Pick a public dataset (World Bank, WHO, Gapminder, or similar)
- Tell a complete data story in 5 chapters (EDA → trends → comparisons → insights → recommendations)
- Use Matplotlib for static publication plots + Plotly for interactive exploration
- Write 500-word narrative alongside visualizations
- **Portfolio Value:** ⭐⭐⭐⭐⭐

---

### PHASE 1 MONTHLY ASSESSMENTS SUMMARY

| Month | Quiz | Coding Challenge | Mini Project | Pass Benchmark |
|-------|------|-----------------|--------------|----------------|
| M1 | Python & NumPy (30 Q) | Data Profiler | Profiler CLI | 75% |
| M2 | Math (30 Q) | PCA from scratch | Math Viz Dashboard | 75% |
| M3 | Statistics (30 Q) | Hypothesis testing | Stats Report | 75% |
| M4 | SQL (20 Q + queries) | Schema design | BI Report | 75% |
| M5 | Pandas (20 Q) | Cleaning pipeline | E-Commerce Analysis | 75% |
| M6 | Visualization (15 Q) | Dashboard | Storytelling Dashboard | 75% |

---

## PHASE 2: DATA ANALYSIS & EDA {#phase2}
### Duration: Months 7–9 (13 Weeks)
### Goal: Become an expert at understanding datasets, extracting insights, and preparing data for modeling

---

### MONTH 7: Exploratory Data Analysis (EDA) Mastery

**Resources:**
- 📖 *Python Data Science Handbook* — Jake VanderPlas (FREE at jakevdp.github.io)
- 🎥 Krish Naik EDA playlist (YouTube)
- 💻 Kaggle notebooks for EDA inspiration

#### WEEK 25: EDA Framework

##### Day 155 — Structured EDA Process
**Topics:** The 5-step EDA framework: Understand → Profile → Clean → Explore → Report
**Coding:** Build a reusable `eda_report()` function that auto-generates an EDA notebook section

##### Day 156 — Univariate Analysis
**Topics:** Each variable in isolation; distribution shape, outliers, missing patterns
**Coding:** Full univariate analysis on Titanic; document every finding

##### Day 157 — Bivariate Analysis
**Topics:** Variable relationships; scatter for continuous-continuous, box for continuous-categorical, chi-square for categorical-categorical
**Coding:** All bivariate pairs for 5 key features in House Prices dataset

##### Day 158 — Multivariate Analysis
**Topics:** Interaction effects, conditioning, 3D scatter, color/size encoding
**Coding:** "Does the effect of age on survival differ by class?" — analyze and visualize

##### Day 159 — Feature Distribution Analysis
**Topics:** Skewness, tail behavior, log-transform, Box-Cox; why this matters for model assumptions
**Coding:** Identify and fix all skewed features in California Housing dataset

##### Day 160 — Automated EDA Tools
**Topics:** `ydata-profiling` (formerly pandas-profiling), `sweetviz`, `dtale`, `lux`
**Coding:** Generate reports with all tools; identify their strengths/weaknesses

---

#### WEEKS 26–27: Real-World EDA Projects

**Project #7: Kaggle-Style EDA Notebook**
- Dataset: NYC Taxi Trips (10M+ rows)
- Handle large data (chunking, efficient dtypes, sample strategies)
- Full EDA with 15+ visualizations
- At least 10 written insights
- Feature engineering ideas section
- **Portfolio Value:** ⭐⭐⭐⭐⭐ (high upvotes potential on Kaggle)

---

### MONTH 8: Feature Engineering

**Goal:** Transform raw data into informative features — the skill that wins Kaggle competitions

**Resources:**
- 📖 *Feature Engineering for Machine Learning* — Alice Zheng & Amanda Casari (O'Reilly)
- 🎥 Feature engineering — Abhishek Thakur (YouTube)

#### WEEK 29: Feature Engineering Techniques

##### Day 169 — Numerical Feature Engineering
**Topics:** Binning, log/sqrt transforms, polynomial features, interaction terms, ratios
**Practice:** Create 20 new features for House Prices; measure correlation with target for each

##### Day 170 — Categorical Feature Engineering
**Topics:** Label encoding, one-hot encoding, target encoding, frequency encoding, binary encoding
**Practice:** Compare 5 encoding methods on a high-cardinality categorical (e.g., city names)

##### Day 171 — Temporal Feature Engineering
**Topics:** Extracting: hour, day, month, year, day-of-week, is_holiday, days_since_event, cyclical encoding
**Practice:** Build 15 time features from a datetime column in an e-commerce dataset

##### Day 172 — Text Feature Engineering (Intro)
**Topics:** Word count, character count, TF-IDF vectors, sentiment score as feature
**Practice:** Add text features to Amazon product reviews dataset

##### Day 173 — Feature Selection
**Topics:** Filter (correlation, chi-square, mutual info), Wrapper (RFE), Embedded (L1 regularization, feature importance); VIF for multicollinearity
**Practice:** Compare feature subsets; measure CV score improvement

##### Day 174 — sklearn Pipelines for FE
**Topics:** `Pipeline`, `ColumnTransformer`, custom transformers, `FunctionTransformer`
**Practice:** Build a full preprocessing pipeline for House Prices dataset

---

### MONTH 9: End-to-End Data Analysis Projects

**Goal:** Consolidate all Phase 2 skills into professional-quality analyses

**Project #8: End-to-End Business Analysis — Retail Sales**
- Dataset: Superstore Sales (Kaggle)
- Business framing: "Which products and regions should we prioritize in Q1?"
- Full pipeline: load → clean → EDA → feature engineering → insights → recommendations
- Executive summary (1 page) + technical appendix
- **Portfolio Value:** ⭐⭐⭐⭐⭐

**Project #9: Kaggle Competition EDA + Baseline**
- Choose any active Kaggle tabular competition
- Submit a high-quality EDA notebook (target top 20% public vote)
- Build a baseline model (covered in Phase 3 but set it up now)
- **Portfolio Value:** ⭐⭐⭐⭐ — Kaggle public profile contribution

**Month 9 Capstone Quiz:** Full EDA, cleaning, feature engineering — 40 question assessment

---

## PHASE 3: MACHINE LEARNING {#phase3}
### Duration: Months 10–15 (26 Weeks)
### Goal: Master the full ML lifecycle — from data prep to model deployment
### Skills: Supervised, Unsupervised, Ensemble Methods, Model Evaluation, Hyperparameter Tuning, sklearn Pipelines

**Resources:**
- 📖 *Hands-On Machine Learning* — Aurélien Géron (3rd ed.) ← THE book
- 📖 *The Elements of Statistical Learning* — Hastie, Tibshirani, Friedman (free PDF — reference)
- 🎥 StatQuest ML playlist (YouTube)
- 🎥 Andrew Ng ML Specialization (Coursera — audit free)
- 💻 Kaggle ML courses (free)
- 💻 scikit-learn documentation

---

### MONTH 10: Regression Algorithms

#### WEEK 37: Linear & Polynomial Regression

##### Day 211 — Linear Regression from Scratch
**Topics:** OLS derivation, normal equation, gradient descent solution, assumptions (LINE)
**Coding:** Implement `LinearRegression` class from scratch; verify against sklearn

##### Day 212 — sklearn Linear Regression
**Topics:** `LinearRegression`, train/test split, cross-validation, evaluation metrics (MAE, MSE, RMSE, R²)
**Coding:** House price prediction with feature selection

##### Day 213 — Regularization: Ridge & Lasso
**Topics:** L1 and L2 regularization, bias-variance tradeoff, regularization paths, `RidgeCV`, `LassoCV`
**Coding:** Compare unregularized, Ridge, Lasso on high-dimensional dataset; plot coefficient shrinkage

##### Day 214 — ElasticNet & Polynomial Regression
**Topics:** ElasticNet (L1+L2), polynomial feature expansion, overfitting risk
**Coding:** Fit degree 1, 5, 10, 20 polynomial regression; visualize overfitting

##### Day 215 — Cross-Validation & Model Selection
**Topics:** k-Fold, Stratified k-Fold, Leave-One-Out, `cross_val_score`, `GridSearchCV`, `RandomizedSearchCV`
**Coding:** Full model selection pipeline for regression problem

##### Day 216 — Regression Diagnostics
**Topics:** Residual plots, QQ plots, Cook's distance, heteroscedasticity tests
**Coding:** Full residual analysis on House Prices; identify violations and fix them

---

#### WEEK 38: Classification Algorithms

##### Day 218 — Logistic Regression
**Topics:** Sigmoid function, log-loss, decision boundary, multi-class (OvR, softmax), regularization
**Coding:** Binary + multiclass classification; understand every coefficient

##### Day 219 — Evaluation Metrics for Classification
**Topics:** Confusion matrix, accuracy, precision, recall, F1, ROC-AUC, PR curve, MCC; when each matters
**Coding:** Evaluate a classifier 5 ways on an imbalanced dataset; see why accuracy lies

##### Day 220 — Decision Trees
**Topics:** CART algorithm, Gini impurity, entropy, information gain, max_depth, pruning, overfitting
**Coding:** Visualize a decision tree on Iris; manually trace a prediction path

##### Day 221 — Naive Bayes
**Topics:** Bayes' theorem applied to classification, GaussianNB, MultinomialNB, BernoulliNB
**Coding:** Spam classification with MultinomialNB + CountVectorizer

##### Day 222 — K-Nearest Neighbors
**Topics:** Distance metrics (Euclidean, Manhattan, Minkowski), choosing K, curse of dimensionality
**Coding:** KNN from scratch; compare to sklearn; show effect of K and distance metric

##### Day 223 — Support Vector Machines
**Topics:** Maximum margin classifier, support vectors, kernel trick (RBF, polynomial), C and gamma
**Coding:** Visualize SVM margin; tune C and gamma with GridSearchCV

---

### MONTH 11: Ensemble Methods & Advanced ML

#### WEEK 41: Ensemble Methods

##### Day 232 — Bagging & Random Forests
**Topics:** Bootstrap aggregating, variance reduction, Random Forest (feature subsampling), feature importances
**Coding:** Random Forest from scratch (forest of decision trees); tune n_estimators and max_features

##### Day 233 — Gradient Boosting: XGBoost
**Topics:** Boosting intuition, gradient boosting algorithm, learning rate, n_estimators, `xgboost` library
**Coding:** XGBoost on Titanic; systematic hyperparameter tuning

##### Day 234 — LightGBM
**Topics:** Leaf-wise growth, GOSS, EFB; why it's faster than XGBoost; when to prefer each
**Coding:** LightGBM with early stopping; compare vs XGBoost on same problem

##### Day 235 — CatBoost
**Topics:** Categorical feature handling, ordered boosting, when CatBoost wins
**Coding:** CatBoost on a high-cardinality categorical dataset

##### Day 236 — Stacking & Blending
**Topics:** Model stacking architecture, meta-learner, blending vs stacking, StackingClassifier
**Coding:** Build a 3-level stack: RF + LGBM + LR → XGBoost meta-learner

##### Day 237 — Voting Ensembles
**Topics:** Hard vs soft voting, weighted voting, diversity importance
**Coding:** Build the best ensemble for Titanic dataset; aim for top 10% leaderboard

---

#### WEEK 42: Unsupervised Learning

##### Day 239 — K-Means Clustering
**Topics:** Algorithm, inertia, elbow method, silhouette score, k-means++ initialization
**Coding:** Customer segmentation on mall customers dataset; visualize clusters

##### Day 240 — Hierarchical Clustering
**Topics:** Agglomerative vs divisive, linkage methods, dendrograms
**Coding:** Document clustering with dendrogram; compare to k-means

##### Day 241 — DBSCAN
**Topics:** Density-based, epsilon, min_samples, handles noise, arbitrary shapes
**Coding:** Compare k-means vs DBSCAN on moon-shaped and ring-shaped data

##### Day 242 — Dimensionality Reduction: PCA & t-SNE
**Topics:** PCA for linear reduction, t-SNE for visualization, UMAP (modern alternative)
**Coding:** Visualize MNIST digits with t-SNE and UMAP; interpret the clusters

##### Day 243 — Anomaly Detection
**Topics:** Isolation Forest, One-Class SVM, Local Outlier Factor, Elliptic Envelope
**Coding:** Credit card fraud detection with anomaly detection algorithms

---

### MONTH 12: ML Engineering — Pipelines & Production

#### WEEK 45: sklearn Pipelines & Model Persistence

##### Day 253 — Complete sklearn Pipeline
**Topics:** `Pipeline` + `ColumnTransformer` for full preprocessing; custom transformers
**Coding:** Build a pipeline that handles: missing values + encoding + scaling + feature selection + model — in one object

##### Day 254 — Hyperparameter Tuning at Scale
**Topics:** GridSearchCV, RandomizedSearchCV, Optuna, Bayesian optimization; compute budget management
**Coding:** Optuna study for XGBoost; optimize 8 hyperparameters; visualize importance

##### Day 255 — Model Persistence & Versioning
**Topics:** `joblib`, `pickle`, versioning models, sklearn model cards
**Coding:** Save, load, and version 5 different models; implement a simple model registry

##### Day 256 — Imbalanced Data
**Topics:** Class imbalance problem, SMOTE, ADASYN, class_weight, threshold optimization
**Coding:** Credit fraud detection — compare techniques on F1 and PR-AUC

##### Day 257 — Calibration & Threshold Selection
**Topics:** Probability calibration (Platt, Isotonic), Youden's J, cost-sensitive threshold selection
**Coding:** Calibration curves; optimize threshold for a medical diagnosis problem

---

#### WEEKS 46–48: Month 12 Projects + Quarterly Capstone

**Project #10: House Price Prediction (End-to-End)**
- Full pipeline from raw data to deployed predictions
- Feature engineering, model selection, hyperparameter tuning
- Model interpretability with SHAP
- API using FastAPI
- **Portfolio Value:** ⭐⭐⭐⭐⭐

**Quarterly Capstone (Q3): Credit Risk Model**
- Real dataset: Home Credit Default Risk (Kaggle)
- EDA → feature engineering → 5 models → ensemble → calibration → fairness audit → SHAP report → FastAPI endpoint
- Full documentation and written report
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐ (industry-relevant problem)

---

### MONTH 13: Model Interpretability (SHAP & LIME)

**Resources:**
- 📖 *Interpretable Machine Learning* — Christoph Molnar (FREE at christophm.github.io)
- 💻 SHAP library documentation (shap.readthedocs.io)

#### WEEK 49: Explainability Techniques

##### Day 267 — Why Interpretability Matters
**Topics:** Black-box vs glass-box models, regulatory requirements (GDPR, EU AI Act), fairness
**Coding:** Compare accuracy vs interpretability tradeoff across 5 model types

##### Day 268 — SHAP Values
**Topics:** Shapley values from game theory, `TreeExplainer`, `LinearExplainer`, `DeepExplainer`; summary, waterfall, beeswarm, dependence plots
**Coding:** Full SHAP analysis on credit risk model; create a model explanation report

##### Day 269 — LIME
**Topics:** Local linear approximation, tabular and text LIME
**Coding:** Compare SHAP vs LIME explanations on same model; identify disagreements

##### Day 270 — Partial Dependence Plots
**Topics:** PDP, Individual Conditional Expectation (ICE), interaction PDPs
**Coding:** PDP analysis to understand feature relationships in a gradient boosted model

---

### MONTHS 14–15: Time Series Analysis

**Resources:**
- 📖 *Forecasting: Principles and Practice* — Hyndman & Athanasopoulos (FREE at otexts.com/fpp3)
- 🎥 Rob Hyndman lectures
- 💻 statsmodels, prophet, sktime

#### WEEK 53: Time Series Foundations

##### Day 295 — Time Series Concepts
**Topics:** Trend, seasonality, cyclicality, noise decomposition; stationarity (ADF test, KPSS)
**Coding:** Decompose electricity consumption data; test for stationarity

##### Day 296 — Classical Methods: ARIMA
**Topics:** AR, I, MA components; ACF/PACF plots; model identification; `statsmodels.ARIMA`
**Coding:** Forecast airline passengers with ARIMA; evaluate with MAE, MAPE

##### Day 297 — Seasonal Models: SARIMA & ETS
**Topics:** SARIMA for seasonal data, Holt-Winters, ETS framework
**Coding:** SARIMA on monthly retail sales data

##### Day 298 — Facebook Prophet
**Topics:** Prophet components, changepoints, seasonality, holidays, uncertainty intervals
**Coding:** Forecast Wikipedia pageviews with Prophet; tune changepoints

##### Day 299 — ML for Time Series
**Topics:** Feature engineering for TS (lag features, rolling stats, Fourier terms), XGBoost for TS
**Coding:** Beat ARIMA with XGBoost on same dataset using lag features

##### Day 300 — Deep Learning for Time Series (Preview)
**Topics:** LSTM intuition (covered in depth in Phase 4), N-BEATS, Temporal Fusion Transformer
**Coding:** Simple LSTM on univariate series

**Project #11: Retail Demand Forecasting**
- Multi-store, multi-product forecasting
- Compare ARIMA vs Prophet vs XGBoost vs LSTM
- Backtesting framework
- Business impact estimation
- **Portfolio Value:** ⭐⭐⭐⭐⭐

---

### PHASE 3 MONTHLY ASSESSMENT SUMMARY

| Month | Focus | Capstone |
|-------|-------|---------|
| M10 | Regression | Multi-model regression comparison |
| M11 | Classification + Ensembles | Titanic top-10% Kaggle submission |
| M12 | ML Engineering | Credit Risk end-to-end pipeline |
| M13 | Interpretability | SHAP Model Report |
| M14–15 | Time Series | Retail Demand Forecasting |

**Q3 Quarterly Capstone:** Full Credit Risk Model (2 weeks)

---

## PHASE 4: DEEP LEARNING {#phase4}
### Duration: Months 16–21 (26 Weeks)
### Goal: Build, train, and deploy neural networks for real-world vision and sequence tasks

**Resources:**
- 📖 *Deep Learning* — Ian Goodfellow (free online)
- 📖 *Dive into Deep Learning* — d2l.ai (FREE — interactive)
- 🎥 fast.ai Practical Deep Learning (fast.ai — free)
- 🎥 Andrej Karpathy's Neural Net Zero to Hero (YouTube — mandatory)
- 🎥 MIT 6.S191 Deep Learning (YouTube)
- 💻 PyTorch docs (pytorch.org)
- 💻 TensorFlow/Keras docs

---

### MONTH 16: Neural Networks from Scratch

#### WEEK 61: Foundations of Deep Learning

##### Day 337 — The Neuron & Activation Functions
**Topics:** Perceptron, sigmoid, ReLU, tanh, GELU, Leaky ReLU; why nonlinearity?
**Coding:** Implement a single neuron in NumPy; visualize activation functions

##### Day 338 — Multi-Layer Perceptron (Forward Pass)
**Topics:** Layers, weight matrices, biases, forward propagation
**Coding:** Implement MLP forward pass in pure NumPy for XOR problem

##### Day 339 — Backpropagation
**Topics:** Chain rule through computation graph, gradient flow, vanishing/exploding gradients
**Coding (CRITICAL):** Implement backpropagation from scratch for a 2-layer MLP — **do not skip this**

##### Day 340 — micrograd: Build Your Own Autograd
**Topics:** Andrej Karpathy's micrograd (scalar autograd engine)
**Coding:** Code along with micrograd; understand how PyTorch autograd works internally

##### Day 341 — PyTorch Fundamentals
**Topics:** Tensors, autograd, `nn.Module`, `DataLoader`, `Dataset`, GPU setup
**Coding:** Port your NumPy MLP to PyTorch; train on MNIST

##### Day 342 — Training Deep Networks
**Topics:** Optimizers (SGD, Adam, AdamW, RMSprop), learning rate schedules, batch size effects
**Coding:** Compare all optimizers on same problem; visualize loss curves

##### Day 343 — Regularization & Normalization
**Topics:** Dropout, BatchNorm, LayerNorm, weight decay; effect on training dynamics
**Coding:** Systematically add regularization to an overfitting network

---

### MONTH 17: Convolutional Neural Networks (Computer Vision)

#### WEEK 65: CNN Architecture

##### Day 365 — Convolution Operation
**Topics:** Kernels, feature maps, padding, stride, receptive field
**Coding:** Manual 2D convolution in NumPy; visualize what each filter detects

##### Day 366 — Classic CNN Architectures
**Topics:** LeNet, AlexNet, VGG, ResNet (skip connections!), EfficientNet, MobileNet
**Coding:** Implement ResNet-18 in PyTorch from scratch (architecture only, not training)

##### Day 367 — Transfer Learning
**Topics:** Pretrained models, freezing layers, fine-tuning strategies, torchvision models
**Coding:** Fine-tune ResNet-50 on a custom 10-class dataset; achieve >90% accuracy

##### Day 368 — Data Augmentation
**Topics:** Random crop, flip, color jitter, CutMix, Mixup; torchvision.transforms, albumentations
**Coding:** Measure validation accuracy improvement from augmentation

##### Day 369 — Object Detection Intro
**Topics:** YOLO architecture, Faster R-CNN, anchor boxes, mAP metric
**Coding:** Run YOLOv8 inference; fine-tune on a custom dataset with 5 classes

##### Day 370 — Image Segmentation
**Topics:** Semantic vs instance segmentation, U-Net architecture, IoU metric
**Coding:** Semantic segmentation with pretrained U-Net on a medical image dataset

---

#### Weeks 68–69: CV Projects

**Project #12: Plant Disease Detection System**
- Multi-class classification: 38 plant disease categories (PlantVillage dataset)
- Transfer learning with EfficientNet
- Grad-CAM visualizations (explain what the model sees)
- FastAPI endpoint for image upload and prediction
- **Portfolio Value:** ⭐⭐⭐⭐⭐ (real-world impact)

**Project #13: Custom Object Detector**
- Collect/annotate 500+ images with Roboflow
- Train YOLOv8 on custom dataset
- Deploy with a simple web UI
- **Portfolio Value:** ⭐⭐⭐⭐⭐

---

### MONTH 18: Recurrent Networks & Sequence Models

#### WEEK 71: RNN, LSTM, GRU

##### Day 393 — RNN Architecture
**Topics:** Unrolling RNNs, hidden state, vanishing gradient problem in sequence models
**Coding:** RNN from scratch for character-level language model (tiny Shakespeare)

##### Day 394 — LSTM & GRU
**Topics:** LSTM gates (forget, input, output), cell state; GRU simplification; when each wins
**Coding:** LSTM sentiment analysis on IMDB; compare RNN vs LSTM training curves

##### Day 395 — Sequence-to-Sequence
**Topics:** Encoder-decoder, Attention mechanism (Bahdanau), teacher forcing
**Coding:** Simple seq2seq for date format conversion

---

### MONTH 19: The Transformer Architecture

**Resources:**
- 📄 *Attention Is All You Need* — Vaswani et al. 2017 (read it)
- 🎥 Andrej Karpathy: "Let's build GPT from scratch" (YouTube — mandatory)
- 🎥 3Blue1Brown: "Attention in transformers" (YouTube)

#### WEEK 75: Transformers from Scratch

##### Day 421 — Self-Attention
**Topics:** Query, Key, Value; scaled dot-product attention; multi-head attention
**Coding:** Implement self-attention from scratch in PyTorch

##### Day 422 — Full Transformer Block
**Topics:** Multi-head attention + FFN + LayerNorm + residual connection; positional encoding
**Coding:** Implement a complete Transformer encoder block

##### Day 423 — GPT Architecture (Decoder-only)
**Topics:** Causal self-attention, token prediction, next-token sampling
**Coding:** **Code along with Karpathy's "makemore" and "nanoGPT"** — build a character-level GPT

##### Day 424 — BERT Architecture (Encoder-only)
**Topics:** Masked language modeling, next sentence prediction, [CLS] token
**Coding:** Load BERT from Hugging Face; extract embeddings; fine-tune on a classification task

##### Day 425 — Vision Transformer (ViT)
**Topics:** Patch embeddings, ViT architecture, when ViT > CNN
**Coding:** Fine-tune ViT on image classification; compare to ResNet

---

### MONTHS 20–21: Deep Learning Projects + Quarterly Capstone

**Project #14: Sentiment Analysis System (LSTM + BERT)**
- Train LSTM from scratch on IMDB
- Fine-tune BERT for same task
- Compare: accuracy, speed, explainability
- Deploy best model as API
- **Portfolio Value:** ⭐⭐⭐⭐⭐

**Project #15: Multi-Modal System (Image + Text)**
- Build a product description generator from product images
- Use pretrained CLIP for image features + GPT-2 for text generation
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐ (cutting-edge)

**Q4 Quarterly Capstone: End-to-End Deep Learning Pipeline**
- Medical image classification + report generation
- CNN for image + LSTM for report
- Interpretability with Grad-CAM + attention visualization
- Full deployment on Hugging Face Spaces
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐

---

## PHASE 5: ADVANCED AI — NLP, GenAI, LLMs, Agents {#phase5}
### Duration: Months 22–27 (26 Weeks)
### Goal: Work at the frontier — build LLM applications, RAG systems, and AI agents

**Resources:**
- 📄 Research papers (arxiv.org/cs.LG and cs.CL)
- 🎥 Andrej Karpathy's full playlist (YouTube)
- 💻 Hugging Face docs (huggingface.co/docs)
- 💻 LangChain docs
- 💻 LlamaIndex docs

---

### MONTH 22: NLP Deep Dive

#### WEEK 89: Classical NLP

##### Day 491 — NLP Pipeline
**Topics:** Tokenization, stemming, lemmatization, stop words, POS tagging, NER with spaCy
**Coding:** Build a full NLP preprocessing pipeline for 50,000 product reviews

##### Day 492 — Text Representations
**Topics:** Bag of Words, TF-IDF, Word2Vec, GloVe, fastText; semantic vs syntactic similarity
**Coding:** Train Word2Vec on custom corpus; explore word analogies

##### Day 493 — Topic Modeling
**Topics:** LDA, NMF, BERTopic
**Coding:** Extract 10 topics from news articles dataset; compare LDA vs BERTopic quality

##### Day 494 — Named Entity Recognition & Information Extraction
**Topics:** spaCy NER, custom NER training, Relation Extraction
**Coding:** Extract companies, dates, and monetary amounts from 1000 SEC filings

##### Day 495 — Modern NLP with Hugging Face Transformers
**Topics:** `AutoModel`, `AutoTokenizer`, `pipeline`, `Trainer`, `Dataset`
**Coding:** Fine-tune DistilBERT on a multi-class text classification task

---

### MONTH 23: Large Language Models

#### WEEK 93: LLM Fundamentals

##### Day 519 — LLM Landscape 2026
**Topics:** GPT-4o, Claude 3.5+, Gemini, Llama 3.3, Mistral, Mixtral, Phi-4; open vs closed models; parameter counts vs capability
**Study:** Read model cards and technical reports for 3 major LLMs

##### Day 520 — Prompting Engineering
**Topics:** Zero-shot, few-shot, chain-of-thought, tree-of-thought, self-consistency, ReAct
**Coding:** Systematic prompt comparison: solve 20 problems with 5 different prompting strategies

##### Day 521 — Fine-Tuning LLMs
**Topics:** Full fine-tuning vs LoRA vs QLoRA; instruction tuning; RLHF concept; SFT
**Coding:** Fine-tune Llama 3.2 3B on a custom Q&A dataset using QLoRA (4-bit)

##### Day 522 — RAG Systems
**Topics:** Retrieval-Augmented Generation, vector databases, chunking strategies, embedding models, reranking
**Coding:** Build a RAG system over 50+ PDF documents with ChromaDB + Llama 3

##### Day 523 — Vector Databases
**Topics:** Chroma, Pinecone, Weaviate, Qdrant; approximate nearest neighbor; HNSW algorithm
**Coding:** Compare Chroma vs Qdrant for a 100K document retrieval task

##### Day 524 — Evaluation of LLM Applications
**Topics:** RAGAS framework, hallucination detection, faithfulness, answer relevance, context precision
**Coding:** Evaluate your RAG system with RAGAS; identify weaknesses

---

### MONTH 24: Generative AI Applications

#### WEEK 97: Building GenAI Apps

##### Day 547 — LangChain & LangGraph
**Topics:** Chains, agents, memory, tools, LangGraph for stateful multi-step workflows
**Coding:** Build a research assistant that searches, reads, and summarizes papers

##### Day 548 — LlamaIndex for RAG
**Topics:** Document loaders, node parsers, vector stores, query engines, advanced RAG patterns
**Coding:** Build a knowledge base over a company's documentation

##### Day 549 — Structured Output & Function Calling
**Topics:** JSON mode, function calling API, tool use, Pydantic models for output validation
**Coding:** Build a data extraction pipeline that turns unstructured text into structured JSON

##### Day 550 — Agents & Tool Use
**Topics:** ReAct agents, tool calling, multi-step reasoning, agent memory, self-reflection
**Coding:** Build an agent that can: search web + run Python code + write files + summarize results

##### Day 551 — Multi-Agent Systems
**Topics:** AutoGen, CrewAI, orchestrator-worker pattern, role specialization
**Coding:** Build a 3-agent pipeline: Researcher + Analyst + Writer for report generation

##### Day 552 — Guardrails & Safety
**Topics:** Prompt injection, jailbreaking, output filtering, Constitutional AI concept, Llama Guard
**Coding:** Add safety filters to your RAG application

---

### MONTH 25: Computer Vision Advanced

#### WEEK 101: Diffusion & Generative Vision

##### Day 575 — Diffusion Models
**Topics:** DDPM, DDIM, score matching, U-Net backbone; how Stable Diffusion works
**Coding:** Fine-tune Stable Diffusion with DreamBooth on 10 custom images

##### Day 576 — Image Generation Applications
**Topics:** Text-to-image, inpainting, style transfer, ControlNet
**Coding:** Build an AI product photo generator (replace background, add context)

##### Day 577 — Video Understanding
**Topics:** Video transformers, temporal modeling, action recognition
**Coding:** Action recognition on a small video dataset

##### Day 578 — Multi-Modal Models
**Topics:** CLIP, LLaVA, GPT-4V; vision-language models; image captioning
**Coding:** Build an image Q&A system using LLaVA

---

### MONTH 26: Advanced ML Topics

#### WEEK 105: Research-Grade ML

##### Day 603 — Bayesian Deep Learning
**Topics:** Weight uncertainty, Monte Carlo dropout, Bayesian neural networks; when uncertainty matters
**Coding:** Uncertainty estimation for a medical prediction task

##### Day 604 — Self-Supervised Learning
**Topics:** Contrastive learning (SimCLR, MoCo), BYOL, masked autoencoders, why SSL is the future
**Coding:** Train SimCLR on CIFAR-10 with limited labels; compare to supervised

##### Day 605 — Graph Neural Networks
**Topics:** Graph convolution, message passing, GCN, GAT, GraphSAGE; applications
**Coding:** Node classification on citation network (Cora dataset)

##### Day 606 — Reinforcement Learning Intro
**Topics:** MDP, Q-learning, DQN, policy gradient, PPO; OpenAI Gym
**Coding:** Train a DQN agent to play CartPole; visualize learning curve

---

### MONTH 27: Phase 5 Major Projects

**Project #16: Production RAG Application**
- Build a "Chat with your documents" system
- 10+ document types supported
- Hybrid search (BM25 + vector)
- Reranking with cross-encoder
- Streaming responses
- Deployed on Vercel/Railway
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐

**Project #17: LLM Fine-Tuning Pipeline**
- Dataset curation (1000+ Q&A pairs)
- QLoRA fine-tuning on Llama 3.2 3B
- RAGAS evaluation before/after
- Published on Hugging Face Hub
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐

**Project #18: Multi-Agent Research System**
- 5-agent pipeline: Planner + Researcher + Critic + Writer + Publisher
- Auto-generates research reports on any topic
- LangGraph for state management
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐

**Q5 Quarterly Capstone: Full GenAI Product**
- End-to-end AI application solving a real business problem
- RAG + Agents + structured output + deployed
- Demo video + technical writeup
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐⭐

---

## PHASE 6: PROFESSIONAL DEVELOPMENT & MLOps {#phase6}
### Duration: Months 28–36 (39 Weeks)
### Goal: Become production-ready — MLOps, cloud, data engineering, interviews, portfolio

**Resources:**
- 📖 *Designing Machine Learning Systems* — Chip Huyen (O'Reilly)
- 📖 *Fundamentals of Data Engineering* — Joe Reis & Matt Housley
- 🎥 Full Stack Deep Learning (fullstackdeeplearning.com)
- 🎥 Made with ML (madewithml.com) — production ML guide
- 💻 MLflow docs, Airflow docs, Docker docs

---

### MONTH 28: MLOps Fundamentals

#### WEEK 109: MLflow & Experiment Tracking

##### Day 631 — MLflow Setup
**Topics:** Tracking server, experiments, runs, parameters, metrics, artifacts, model registry
**Coding:** Instrument your Credit Risk model with MLflow; compare 20 experiments

##### Day 632 — MLflow Model Registry
**Topics:** Staging, production, archiving models; model versioning; deployment from registry
**Coding:** Build a full experiment → register → promote → serve pipeline

##### Day 633 — Docker for ML
**Topics:** Dockerfile, docker-compose, multi-stage builds, GPU Docker images, NVIDIA Docker
**Coding:** Containerize your FastAPI ML model; run locally, then push to registry

##### Day 634 — FastAPI for ML APIs
**Topics:** Route design, Pydantic validation, async endpoints, background tasks, batching
**Coding:** Build a production-ready prediction API with: auth, rate limiting, input validation, logging, health check

##### Day 635 — Model Monitoring
**Topics:** Data drift, concept drift, model degradation; Evidently AI, NannyML, Grafana
**Coding:** Set up drift monitoring for a classification model with Evidently

---

### MONTH 29: Cloud Platforms

**Pick one primary cloud; learn the others at surface level.**
**Recommended start: AWS (largest market share)**

#### WEEK 113: AWS for ML Engineers

##### Day 659 — AWS Core Services
**Topics:** EC2, S3, VPC, IAM, Lambda, ECR, ECS/EKS overview
**Coding:** Deploy your ML API to EC2; store models in S3

##### Day 660 — AWS SageMaker
**Topics:** Training jobs, endpoints, batch transform, SageMaker Pipelines, Feature Store
**Coding:** Train and deploy a model entirely in SageMaker

##### Day 661 — Serverless ML
**Topics:** Lambda for lightweight inference, API Gateway, SAM framework, cold starts
**Coding:** Deploy a lightweight classifier as Lambda function

##### Day 662 — Cost Optimization
**Topics:** Spot instances, auto-scaling, rightsizing, Reserved Instances, Free Tier
**Coding:** Estimate monthly cost for 5 different deployment architectures

---

### MONTH 30: Data Engineering

#### WEEK 117: Data Pipeline Engineering

##### Day 687 — Apache Airflow
**Topics:** DAGs, operators, sensors, XComs, scheduling, Airflow architecture
**Coding:** Build a DAG that: extracts data → cleans → runs model → stores predictions → sends report

##### Day 688 — Apache Spark
**Topics:** RDDs vs DataFrames, SparkSQL, transformations vs actions, partitioning
**Coding:** Process 10GB dataset with PySpark; compare to Pandas

##### Day 689 — dbt (Data Build Tool)
**Topics:** Models, tests, documentation, lineage, incremental models
**Coding:** Build a dbt project on top of a PostgreSQL warehouse

##### Day 690 — Data Quality
**Topics:** Great Expectations, data contracts, SLAs, alerting
**Coding:** Add 20 data quality tests to your Airflow pipeline

##### Day 691 — Streaming Data Intro
**Topics:** Kafka concepts, producers/consumers, Flink intro, real-time vs batch tradeoffs
**Coding:** Simple Kafka producer/consumer for real-time event simulation

---

### MONTHS 31–33: Advanced Projects + System Design

**Project #19: Full MLOps Pipeline**
- Train → experiment tracking → model registry → CI/CD → deploy → monitor
- Tools: MLflow + GitHub Actions + Docker + FastAPI + Evidently
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐⭐ (most impactful project for MLOps roles)

**Project #20: Real-Time ML System**
- Kafka for event streaming → feature computation → model inference → database → dashboard
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐

**System Design Study:**
- ML System Design: recommendation systems, fraud detection, search ranking, ad CTR prediction
- Read: Chip Huyen's ML interviews book + system design guides
- Practice: Design 20 real-world ML systems (1/day for 20 days)

---

### MONTHS 34–36: Career Preparation Sprint

#### MONTH 34: Portfolio Finalization

**Week 141 Tasks:**
- GitHub profile cleanup (pin 6 best repos, write stellar READMEs)
- Kaggle profile (3+ competition medals or top-20% finishes)
- Personal website (portfolio + blog) — deploy on GitHub Pages or Vercel
- LinkedIn optimization (keyword-rich headline, featured section with projects)
- Write 5 technical blog posts (each 800–1500 words)

**README Template for Each Project:**
```
## Project Name
### Problem Statement
### Approach
### Results
### Technical Stack
### How to Run
### Key Learnings
```

---

#### MONTH 35: Interview Preparation

**Week 145: Coding Interview**
**Daily:** 2 LeetCode problems (Easy→Medium→Hard progression)
**Topics:** Arrays, strings, hashmaps, sliding window, two pointers, trees, graphs, DP
**Target:** Solve 150+ problems before interviews

**Week 146: Statistics & ML Theory Interview**
**Study:** 200 common Data Science interview questions
**Topics:**
- Explain bias-variance tradeoff to a 5-year-old
- How does gradient boosting work?
- Why use log-loss over MSE for classification?
- Explain attention mechanism
- How would you detect data leakage?

**Week 147: Case Study / Business Interview**
**Practice:** 20 take-home style case studies
**Framework:** Define → Metrics → Data → Model → Evaluation → Business Impact

**Week 148: ML System Design Interview**
**Practice designs:**
1. YouTube recommendation system
2. Instagram feed ranking
3. Uber surge pricing
4. Credit fraud detection at scale
5. Real-time translation system

---

#### MONTH 36: Job Search + Final Capstone

**Job Search Strategy:**
- Applications: 5 targeted applications/week (not spray-and-pray)
- Networking: 2 LinkedIn connection requests/day with personalized notes
- Referrals: Reach through Kaggle community, GitHub followers, local meetups
- Target roles: DS / ML Engineer / AI Engineer / MLOps Engineer / NLP Engineer

**Interview Question Banks:**

**Python/Coding (100 Q):**
1. Implement K-Means from scratch
2. Write a function to detect data leakage in a dataset
3. Implement gradient descent in 10 lines of Python
4. What's the time complexity of KNN prediction for N training points?
5. How would you handle 100GB of CSV data in Python?
... (continue with topic-specific banks)

**Final Capstone (Months 35–36): Industry-Level Capstone Project**
- Choose one: Recommendation System / Fraud Detection / NLP Platform / Computer Vision API
- Full stack: Data pipeline → Model training → MLOps → Frontend → Documentation
- 2-week sprint, publication-quality output
- Blog post + demo video + GitHub
- **Portfolio Value:** ⭐⭐⭐⭐⭐⭐⭐⭐ (this is your showstopper)

---

## PROJECT CATALOG {#projects}

### 🟢 Beginner Projects (10)

| # | Project | Dataset | Key Skills | Difficulty | Time | Portfolio Value |
|---|---------|---------|-----------|------------|------|-----------------|
| 1 | Data Profiler CLI | Any CSV | Python, OOP, File I/O | ⭐ | 1 week | ⭐⭐ |
| 2 | Math Visualization Dashboard | Synthetic | NumPy, Matplotlib | ⭐ | 1 week | ⭐⭐⭐ |
| 3 | Statistical Analysis Report | Titanic | Stats, Pandas, Seaborn | ⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 4 | Music Store BI (SQL) | Chinook | SQL, Window Functions | ⭐⭐ | 1 week | ⭐⭐⭐ |
| 5 | E-Commerce RFM Analysis | Olist | Pandas, Feature Eng | ⭐⭐ | 2 weeks | ⭐⭐⭐⭐⭐ |
| 6 | Data Storytelling Dashboard | World Bank | Plotly, Visualization | ⭐⭐ | 2 weeks | ⭐⭐⭐⭐⭐ |
| 7 | NYC Taxi EDA Notebook | NYC Taxi | Large Data EDA | ⭐⭐ | 2 weeks | ⭐⭐⭐⭐⭐ |
| 8 | Retail Business Analysis | Superstore | End-to-End EDA | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐⭐ |
| 9 | Kaggle Competition EDA | TBD | Competition Skills | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 10 | Linear Regression from Scratch | California Housing | Math + Coding | ⭐⭐ | 1 week | ⭐⭐⭐ |

### 🟡 Intermediate Projects (15)

| # | Project | Dataset | Key Skills | Difficulty | Time | Portfolio Value |
|---|---------|---------|-----------|------------|------|-----------------|
| 11 | House Price Prediction (E2E) | Ames Housing | Full ML Pipeline | ⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 12 | Titanic Top 10% | Titanic | Ensemble Methods | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 13 | Credit Risk Model | Home Credit | End-to-End + SHAP | ⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 14 | Customer Churn Predictor | Telco Churn | Classification | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 15 | Retail Demand Forecasting | M5/Rossmann | Time Series | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 16 | Recommender System (CF) | MovieLens | Matrix Factorization | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 17 | Image Classifier (CNN) | CIFAR-10 | PyTorch, CNN | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐ |
| 18 | Plant Disease Detector | PlantVillage | Transfer Learning | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 19 | Sentiment Analysis API | IMDB + SST | LSTM + BERT | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 20 | Spam Classifier | Email/SMS | Classical NLP | ⭐⭐⭐ | 1 week | ⭐⭐⭐ |
| 21 | Stock Price Forecaster | Yahoo Finance | LSTM + Prophet | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐ |
| 22 | Anomaly Detection | Credit Fraud | Unsupervised ML | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |
| 23 | Custom Object Detector | Self-collected | YOLOv8 | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 24 | Medical Image Classifier | Chest X-Ray | ResNet + Grad-CAM | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐⭐ |
| 25 | NLP Topic Modeler | News Articles | BERTopic + LDA | ⭐⭐⭐ | 2 weeks | ⭐⭐⭐⭐ |

### 🔴 Advanced Projects (20)

| # | Project | Key Skills | Difficulty | Time | Portfolio Value |
|---|---------|-----------|------------|------|-----------------|
| 26 | Production RAG System | LLMs, LangChain, Vector DB | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 27 | LLM Fine-Tuning Pipeline | QLoRA, Hugging Face | ⭐⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐⭐ |
| 28 | Multi-Agent Research System | LangGraph, CrewAI | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 29 | Full MLOps Pipeline | MLflow, Docker, CI/CD | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐⭐ |
| 30 | Real-Time ML System | Kafka, FastAPI, Monitoring | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 31 | AI Product Photo Generator | Diffusion, ControlNet | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 32 | Multi-Modal Q&A System | LLaVA, RAG | ⭐⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐⭐ |
| 33 | Enterprise Data Platform | Airflow, Spark, dbt | ⭐⭐⭐⭐⭐ | 5 weeks | ⭐⭐⭐⭐⭐⭐ |
| 34 | GNN for Fraud Detection | Graph Neural Networks | ⭐⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 35 | RL Trading Agent | DQN, Gymnasium | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐ |
| 36 | Distributed Training Pipeline | Accelerate, DeepSpeed | ⭐⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 37 | A/B Test Platform | Stats, FastAPI, dashboards | ⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐ |
| 38 | Document Intelligence System | Layout Parser, OCR, LLM | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 39 | Video Analysis Pipeline | CV, Whisper, LLM | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 40 | Customer 360 Data Product | Data Eng + ML + BI | ⭐⭐⭐⭐⭐ | 5 weeks | ⭐⭐⭐⭐⭐⭐⭐ |
| 41 | Personalized Recommendation Engine | Collaborative + Content | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 42 | Search System with Semantic Ranking | SBERT, BM25, Reranking | ⭐⭐⭐⭐⭐ | 3 weeks | ⭐⭐⭐⭐⭐⭐ |
| 43 | Code Review AI Agent | LLM, AST, GitHub API | ⭐⭐⭐⭐⭐ | 4 weeks | ⭐⭐⭐⭐⭐⭐ |
| 44 | AI-Powered BI Tool | NL2SQL, charts, LLM | ⭐⭐⭐⭐⭐ | 5 weeks | ⭐⭐⭐⭐⭐⭐⭐ |
| 45 | **FINAL CAPSTONE** | Everything | ⭐⭐⭐⭐⭐⭐ | 6 weeks | ⭐⭐⭐⭐⭐⭐⭐⭐ |

---

## MONTHLY ASSESSMENT FRAMEWORK {#assessments}

### Every Month Assessment Structure

| Component | Format | Weight | Passing Score |
|-----------|--------|--------|---------------|
| Concept Quiz | 30 MCQ + short answer | 30% | 22/30 |
| Coding Challenges | 3 problems (timed) | 40% | All 3 attempted, 2 working |
| Mini Project | 1-week sprint | 30% | Peer review: "Would hire?" |

### Quarterly Capstone Projects

| Quarter | Months | Capstone |
|---------|--------|---------|
| Q1 | 1–3 | Mathematical Foundations Dashboard |
| Q2 | 4–6 | Full SQL + Pandas + Viz Analysis |
| Q3 | 7–9 | Kaggle Competition Entry (top 30%) |
| Q4 | 10–12 | Credit Risk End-to-End ML System |
| Q5 | 13–15 | Time Series Forecasting Platform |
| Q6 | 16–18 | Deep Learning Vision System |
| Q7 | 19–21 | Multimodal AI Application |
| Q8 | 22–24 | GenAI RAG + Agent Application |
| Q9 | 25–27 | Research-level ML paper reproduction |
| Q10 | 28–30 | MLOps Full Pipeline |
| Q11 | 31–33 | System Design + Cloud Deployment |
| Q12 | 34–36 | **Final Industry Capstone** |

### Skill Gap Analysis (Every Quarter)
After each capstone, rate yourself 1–5 on:
- Mathematical understanding
- Coding quality and style
- Model selection and reasoning
- Result interpretation
- Communication of findings
- Production readiness

---

## PORTFOLIO MILESTONES {#portfolio}

### GitHub Portfolio

| Milestone | Target Month | Criteria |
|-----------|-------------|---------|
| First public repo | Month 1 | Data Profiler with README |
| 5 repos with stars | Month 6 | 3+ stars on at least 1 |
| Kaggle notebook upvotes | Month 7 | 10+ upvotes on EDA notebook |
| 10 quality repos | Month 12 | Each with proper docs |
| First Kaggle medal | Month 13 | Bronze or above |
| Open source contribution | Month 18 | PR merged to any ML library |
| 20 quality repos | Month 24 | Consistent star growth |
| Hugging Face model published | Month 24 | Fine-tuned model on Hub |
| 30+ repos | Month 36 | Full portfolio coverage |

### Personal Website Milestones

| Milestone | Target Month | Content |
|-----------|-------------|---------|
| Basic site live | Month 6 | Bio + Projects + Contact |
| Blog started | Month 9 | First 2 posts |
| Full portfolio | Month 18 | 10 projects, 5 blog posts |
| Technical blog authority | Month 30 | 15+ posts, 500+ monthly readers |

### Kaggle Profile Milestones

| Milestone | Target Month |
|-----------|-------------|
| First competition submission | Month 10 |
| 5 public notebooks | Month 12 |
| Notebooks Expert | Month 15 |
| Competition Expert | Month 20 |
| Competitions Master | Month 30 |

---

## CAREER PREPARATION {#career}

### Resume Milestones

| Month | Resume Update |
|-------|--------------|
| 6 | Add: Python, SQL, Pandas, Matplotlib, Stats skills |
| 12 | Add: sklearn, XGBoost, ML pipelines, first 3 projects |
| 18 | Add: PyTorch, CNNs, NLP, Kaggle medals |
| 24 | Add: LLMs, RAG, Agents, cloud experience |
| 30 | Add: MLOps, Airflow, Docker, production systems |
| 36 | **Final polished resume — job-ready** |

### LinkedIn Optimization Checklist
- [ ] Headline: "Data Scientist | ML Engineer | Building [specific domain] AI Systems"
- [ ] About: 3-paragraph story — background, transition, direction
- [ ] Featured: Pin 3 best projects (GitHub + live demo if possible)
- [ ] Skills: All 30 relevant skills endorsed
- [ ] Recommendations: 2–3 from bootcamp peers/collaborators
- [ ] Activity: Post 1 insight per week (share what you learn)

### Networking Plan

| Action | Frequency | Platform |
|--------|-----------|---------|
| Connect + message | 2/day | LinkedIn |
| Engage with posts | 5/day | LinkedIn |
| Join communities | Month 3 | Kaggle, Discord, Slack |
| Attend meetups | 1/month | Meetup.com, Eventbrite |
| Contribute to forums | 3/week | Reddit r/MachineLearning, Stack Overflow |
| Twitter/X engagement | Daily | Follow ML researchers |
| Open source contribution | 1/quarter | GitHub |

### Interview Preparation Roadmap

**Month 30–33: Foundation**
- LeetCode: 150 problems (Easy: 50, Medium: 80, Hard: 20)
- Statistics review: 200 Q&A pairs
- ML theory: 300 Q&A pairs

**Month 34: Mock Interviews**
- Week 1: Coding mock (Python/SQL) — 2 mock interviews
- Week 2: ML theory mock — 2 mock interviews
- Week 3: Case study mock — 2 mock interviews
- Week 4: Full loop simulation — 1 full interview simulation

**Interview Question Bank — Top 50 DS/ML Questions**

1. What is the bias-variance tradeoff? How do you manage it in practice?
2. How does gradient boosting work, step by step?
3. When would you use Random Forest vs XGBoost?
4. What is regularization and why do we need it?
5. Explain how attention mechanism works in transformers
6. What is the curse of dimensionality?
7. How do you handle class imbalance?
8. What is data leakage? Give an example.
9. Explain precision, recall, and F1. When does each matter?
10. How would you design an A/B test for a new recommendation algorithm?
11. What is the difference between MLE and MAP estimation?
12. How does PCA work? When should you use it?
13. What is dropout and how does it prevent overfitting?
14. Explain the vanishing gradient problem and how to fix it
15. What is batch normalization and why does it help?
16. How would you monitor a deployed ML model?
17. What is a feature store and why is it useful?
18. How does BERT differ from GPT architecturally?
19. What is RAG and when would you use it over fine-tuning?
20. How would you build a recommendation system from scratch?
21. What is the difference between collaborative and content-based filtering?
22. How would you detect and handle outliers in a dataset?
23. What is the EM algorithm?
24. How does K-Means clustering work? What are its limitations?
25. What is the kernel trick in SVM?
26. How do you evaluate an unsupervised model?
27. What is the difference between L1 and L2 regularization effects?
28. How would you handle highly correlated features?
29. What is SMOTE and when should you use it?
30. How does SHAP work? Why is it better than feature importance?
31. What is concept drift and how do you detect it?
32. How would you scale a model to serve 1 million requests/day?
33. What is vector embedding and how does semantic search work?
34. Explain the transformer self-attention in simple terms
35. What is LoRA and why is it useful for fine-tuning LLMs?
36. How do you evaluate an LLM application?
37. What is a knowledge graph and how can LLMs use it?
38. How would you prevent a chatbot from hallucinating?
39. What is CI/CD for machine learning?
40. How would you build a real-time fraud detection system?
41. What is the difference between online and offline evaluation for recommendation systems?
42. How does the PageRank algorithm work?
43. What is multi-armed bandit and when to use it over A/B test?
44. Explain transfer learning and when it works best
45. How would you compress a large neural network for edge deployment?
46. What is federated learning and why does it matter for privacy?
47. How do you handle missing data in time series?
48. What is the difference between seasonality and trend?
49. How do you prevent data snooping in time series validation?
50. Design a machine learning system for [job-relevant use case]

### ML System Design Interview Framework

**FRAME → DATA → FEATURES → MODEL → EVALUATION → DEPLOYMENT → MONITORING**

For every system design practice:
1. **Frame the problem** (clarify requirements, success metrics, constraints)
2. **Data pipeline** (sources, volume, velocity, quality, storage)
3. **Feature engineering** (what signals matter, freshness requirements)
4. **Model selection** (justify your choice, tradeoffs)
5. **Offline evaluation** (metrics, baselines, test sets)
6. **Serving architecture** (latency, throughput, A/B testing)
7. **Online monitoring** (drift, degradation, feedback loops)

---

## YEAR-BY-YEAR SUMMARY TABLES {#summary}

### Year 1 Summary (Months 1–12)

| Category | Details |
|----------|---------|
| **Skills Acquired** | Python, NumPy, Pandas, Matplotlib, Seaborn, Plotly, SQL (advanced), Statistics, Probability, Linear Algebra, Calculus, Feature Engineering, sklearn, XGBoost, LightGBM, Classical ML algorithms |
| **Projects Completed** | 13 (6 beginner + 7 intermediate) |
| **Kaggle** | 3+ public notebooks, 1 competition entry |
| **GitHub** | 10+ repos, growing star count |
| **Job Readiness** | Ready for: Data Analyst, Junior Data Scientist |
| **Key Milestone** | End-to-end Credit Risk model with SHAP interpretability |

### Year 2 Summary (Months 13–24)

| Category | Details |
|----------|---------|
| **Skills Acquired** | Time series, PyTorch, CNNs, RNNs, LSTM, Transformers, BERT, GPT, Transfer Learning, YOLOv8, NLP, Hugging Face, LangChain, RAG, Vector Databases, LLM Fine-tuning, Agents |
| **Projects Completed** | 20 (remaining intermediate + 10 advanced) |
| **Kaggle** | 2+ medals, Notebooks Expert rank |
| **GitHub** | 20+ repos, published model on Hugging Face Hub |
| **Job Readiness** | Ready for: Data Scientist, ML Engineer, NLP Engineer |
| **Key Milestone** | Production RAG application + LLM fine-tuning pipeline |

### Year 3 Summary (Months 25–36)

| Category | Details |
|----------|---------|
| **Skills Acquired** | MLOps (MLflow, Airflow, Docker, CI/CD), AWS/GCP, FastAPI, Kafka, Spark, dbt, Model Monitoring, System Design, Interview Skills, Distributed Training |
| **Projects Completed** | 12 more (advanced + industry-level) |
| **Kaggle** | Competition Expert or Master rank |
| **GitHub** | 30+ repos, open source PR merged |
| **Job Readiness** | **Ready for: Senior DS, ML Engineer, AI Engineer, MLOps Engineer** |
| **Key Milestone** | Full MLOps pipeline + Industry capstone project |

---

## RESOURCE MASTER LIST {#resources}

### Free Courses & Platforms

| Resource | Type | Best For |
|----------|------|---------|
| fast.ai | Course | Practical deep learning |
| CS50P (edX) | Course | Python fundamentals |
| Andrew Ng ML Specialization (Coursera audit) | Course | ML theory |
| Kaggle Learn | Mini-courses | Practical skills |
| MIT OpenCourseWare 18.06 | Lectures | Linear Algebra |
| StatQuest (YouTube) | Videos | Statistics + ML |
| 3Blue1Brown (YouTube) | Videos | Math intuition |
| Andrej Karpathy (YouTube) | Videos | Deep Learning |
| Made with ML | Guide | Production ML |
| Full Stack Deep Learning | Course | End-to-end ML |
| Hugging Face Course | Course | Transformers + NLP |

### Essential Free Books

| Book | Author | Best For |
|------|--------|---------|
| Python Data Science Handbook | Jake VanderPlas | Python/Pandas/sklearn |
| Mathematics for Machine Learning | Deisenroth et al. | Math foundations |
| Hands-On ML (skim free preview) | Aurélien Géron | ML algorithms |
| Dive into Deep Learning | d2l.ai team | Deep learning |
| Forecasting: Principles & Practice | Hyndman | Time series |
| Interpretable Machine Learning | Christoph Molnar | Explainability |
| Think Stats / Think Bayes | Allen Downey | Statistics |
| Designing ML Systems | Chip Huyen | Production ML |
| The Elements of Statistical Learning | Hastie et al. | Theory reference |

### Practice Platforms

| Platform | Best For |
|----------|---------|
| Kaggle | Competitions, datasets, community |
| LeetCode | Coding interviews |
| StrataScratch | SQL + Python DS interviews |
| HackerRank | Mixed challenges |
| Exercism.io | Python fundamentals |
| Hugging Face Hub | Models + datasets + Spaces |
| Papers with Code | Research + benchmarks |
| arxiv.org | Latest research |

### Core Libraries Stack (2026)

```
# Data Stack
numpy pandas polars scipy statsmodels

# Visualization
matplotlib seaborn plotly altair

# Classical ML
scikit-learn xgboost lightgbm catboost optuna shap

# Deep Learning
pytorch torchvision torchaudio pytorch-lightning
tensorflow keras (secondary)

# NLP / LLMs
transformers datasets tokenizers huggingface-hub
langchain langgraph llama-index sentence-transformers
openai anthropic

# Vector Databases
chromadb qdrant-client pinecone-client

# Computer Vision
opencv-python pillow albumentations
ultralytics (YOLO) timm (pretrained models)

# MLOps
mlflow dvc great-expectations evidently
fastapi uvicorn pydantic
docker (system) airflow

# Cloud
boto3 (AWS) google-cloud-aiplatform azure-ml

# Data Engineering
pyspark dbt kafka-python

# Utilities
jupyter jupyterlab black ruff
pytest pre-commit git-lfs
```

---

## 🎯 THE PERFECT DAILY ROUTINE (Final Version)

```
05:30  Wake up, hydrate, 10-minute walk (no phone)
06:00  Block 1: Theory (60 min) — read, watch lecture, take notes
07:00  Block 2: Coding (90 min) — implement what you just learned
08:30  Breakfast + short break
09:00  Block 3: Problem Solving (60 min) — exercises, LeetCode, SQL
10:00  Block 4: Project Work (60 min) — active project sprint
11:00  Notes (30 min) — write clean notes in Obsidian/Notion
11:30  Revision (15 min) — spaced repetition of last 3 days
11:45  Done — live your life
```

**Adjust for your schedule, but protect these blocks like meetings.**

---

## 🗓️ THE PERFECT WEEKLY ROUTINE (Final Version)

```
MON — New Theory Day
  Morning: Study new week's core concept
  Evening: Implement a basic version in code

TUE — Deep Implementation Day
  Morning: Implement fully, debug, experiment
  Evening: Read related documentation

WED — Problem Solving Day
  Morning: LeetCode/SQL/Kaggle exercises
  Evening: Review solutions, understand optimal approaches

THU — Project Sprint Day
  Full day: Focused project work (most important day)
  
FRI — Integration + Review Day
  Morning: Connect this week to previous weeks
  Evening: Update your notes, clean your code

SAT — Content + Community Day
  Morning: Write a blog post or LinkedIn post about what you learned
  Evening: Engage: Kaggle forums, GitHub, Discord communities

SUN — REST (non-negotiable)
  Read a book, go outside, recharge
  Optional: Watch 1 inspiring talk (TED, conference keynote)
```

---

## 📊 EMPLOYABILITY TIMELINE

| Month | Realistic Role | Salary Range (USD) | Confidence |
|-------|---------------|-------------------|------------|
| 6 | Data Analyst intern | $25–40K | Low |
| 12 | Junior Data Scientist | $55–75K | Medium |
| 18 | Data Scientist | $80–100K | High |
| 24 | ML Engineer | $95–130K | High |
| 30 | Senior DS / ML Engineer | $120–160K | Very High |
| 36 | AI Engineer / MLOps | $130–175K+ | Very High |

> *Salaries approximate for US market. Adjust for your region.*

---

## 🚀 FINAL WORDS

**The 3 non-negotiable rules:**

1. **Show up every day.** Consistency beats intensity. 3 hours every day destroys 10 hours on weekends.

2. **Build things.** Every concept you learn must be implemented. Reading ≠ knowing.

3. **Ship publicly.** Every project goes on GitHub. Every insight becomes a blog post. Your public work is your resume.

**The secret truth about this field:**
- 80% of DS jobs need solid Python + SQL + classical ML + communication skills
- 15% need deep learning expertise
- 5% need LLM/Agent cutting-edge skills

This roadmap builds all three. Start strong with the 80%, let the rest compound.

**You will be employed if you follow this. The question is only when.**

---

*Last updated: June 2026 | Designed for Nepali data science learners targeting global roles*
*Feedback & contributions: open an issue on GitHub*
