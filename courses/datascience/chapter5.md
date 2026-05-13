

# Chapter 5: Pandas — Data Wrangling

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Load and inspect data from CSV, Excel, and JSON files; (2) Select, filter, and transform data using loc, iloc, and boolean indexing; (3) Clean messy data (missing values, duplicates, wrong types); (4) Aggregate data with GroupBy; (5) Merge and concatenate DataFrames.

> 📋 **Prerequisites:** Chapter 2 (Python), Chapter 4 (NumPy). Install: pip install pandas openpyxl


## 5.1 — The Swiss Army Knife of Data Science

If NumPy is the engine, Pandas is the dashboard. Pandas gives you spreadsheet-like power inside Python — but with the ability to automate repetitive cleaning tasks, handle millions of rows, and chain complex operations elegantly.

The name 'Pandas' comes from 'Panel Data' — a term in econometrics for multi-dimensional structured datasets. Studies show data scientists spend 60-80% of their time cleaning data. Pandas makes this less painful.


## 5.2 — Series and DataFrame

```python
# The two core Pandas data structures
import pandas as pd
import numpy as np

# Series — 1D labeled array (like a single spreadsheet column)
temps = pd.Series([22, 25, 28, 24, 30],
                  index=['Mon','Tue','Wed','Thu','Fri'])
print(temps['Wed'])
print(temps.mean())
```

```
# Output:
# 28
# 25.8
```

```python

# DataFrame — 2D table (rows x columns, like a spreadsheet)
data = {
    'Name':   ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'],
    'Age':    [25, 30, 35, 28, 22],
    'Salary': [65000, 80000, 95000, 72000, 58000],
    'Dept':   ['HR', 'IT', 'IT', 'Finance', 'HR']
}
df = pd.DataFrame(data)
print(df.head(3))
```

```
# Output:
#     Name  Age  Salary     Dept
# 0  Alice   25   65000       HR
# 1    Bob   30   80000       IT
# 2  Carol   35   95000       IT
```

## 5.3 — Loading and Saving Data

```python
# Reading various file formats
df_csv   = pd.read_csv('data.csv')
df_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df_json  = pd.read_json('data.json')

# Read CSV with common options
df = pd.read_csv('data.csv',
                 sep=',',
                 header=0,
                 index_col='id',
                 parse_dates=['date_column'],
                 na_values=['N/A', 'null', '-', ''])

# Saving data
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', sheet_name='Results', index=False)
```

## 5.4 — Selecting & Filtering Data

Pandas has two primary ways to select by label (.loc) and by position (.iloc). This distinction is critical and a common source of bugs.

```python
# WHY loc vs iloc matters — a concrete example
# Create a DataFrame with a non-default (non-0,1,2) index
df2 = pd.DataFrame({'score': [85, 90, 78]}, index=[10, 20, 30])

print(df2.loc[10])    # Gets the row LABELED 10 → score: 85
print(df2.iloc[0])    # Gets the FIRST row     → score: 85  (same here)

print(df2.loc[20])    # Row labeled 20 → score: 90
print(df2.iloc[1])    # 2nd row       → score: 90  (same)

# NOW the difference becomes visible:
# df2.loc[0]   → KeyError! There is no row LABELED 0
# df2.iloc[0]  → Works fine: returns the first row (labeled 10)
```

```
# Output:
# loc[10]: score    85
# iloc[0]: score    85
# loc[20]: score    90
# Rule: .loc uses LABELS, .iloc uses POSITIONS (0, 1, 2, ...)
```

```python

# Boolean filtering — most common approach
high_salary = df[df['Salary'] > 70000]
it_staff    = df[df['Dept'] == 'IT']
it_senior   = df[(df['Dept']=='IT') & (df['Age'] > 28)]

# .query() — SQL-like syntax for readable filters
result = df.query('Salary > 70000 and Dept == \"IT\"')
print(result[['Name', 'Salary', 'Dept']])
```

```
# Output:
#     Name  Salary Dept
# 1    Bob   80000   IT
# 2  Carol   95000   IT
```

## 5.5 — Data Cleaning


### Missing Values

```python
# Step 1: Diagnose missing values
print(df.isnull().sum())           # Count nulls per column
print(df.isnull().mean() * 100)    # % missing per column
```

```
# Output:
# Name      0
# Age       3    ← 3 rows with missing age
# Salary    1
# Dept      0
```

```python

# Step 2: Choose a strategy based on the column
# Drop rows only when very few are missing
df_clean = df.dropna()

# Fill numeric with median (robust to outliers)
df['Age'] = df['Age'].fillna(df['Age'].median())

# Fill categorical with most common value
df['Dept'] = df['Dept'].fillna(df['Dept'].mode()[0])

# For time series: forward fill (propagate last known value)
# Pandas 2.0+: use .ffill() directly (fillna(method=) is removed)
df['price'] = df['price'].ffill()   # Modern Pandas 2.0 syntax
```

### Duplicates & Data Types

```python
# Detect and remove duplicates
print(f'Duplicates found: {df.duplicated().sum()}')
df = df.drop_duplicates()

# Fix data types
df['Age']    = df['Age'].astype(int)
df['Date']   = pd.to_datetime(df['Date'])
df['Salary'] = pd.to_numeric(df['Salary'], errors='coerce')

# String cleaning — strip whitespace, standardize case
df['Name']  = df['Name'].str.strip().str.title()
df['Email'] = df['Email'].str.lower()
```
> ⚠️ **Pandas 2.0 Compatibility:** fillna(method='ffill') and fillna(method='bfill') are removed in Pandas 2.0. Use df.ffill() and df.bfill() instead. Always check your Pandas version: pd.__version__


## 5.6 — GroupBy and Aggregation

GroupBy follows the split-apply-combine pattern: split data into groups, apply a function to each, then combine the results back. It is the Pandas equivalent of SQL's GROUP BY.

```python
# Basic GroupBy — salary stats per department
dept_stats = df.groupby('Dept')['Salary'].agg(['mean', 'min', 'max', 'count'])
print(dept_stats)
```

```
# Output:
#          mean     min     max  count
# Finance  72000   72000   72000      1
# HR       61500   58000   65000      2
# IT       87500   80000   95000      2
```

```python

# Custom aggregation function
def salary_range(x):
    return x.max() - x.min()

print(df.groupby('Dept')['Salary'].agg(salary_range))

# GroupBy transform — adds result back as a column (keeps original shape)
df['dept_avg_salary'] = df.groupby('Dept')['Salary'].transform('mean')
df['vs_dept_avg'] = df['Salary'] - df['dept_avg_salary']
```
> 💡 **transform() vs agg():** groupby().agg() collapses groups into summary rows. groupby().transform() keeps the original shape — each row gets the group's aggregate value. transform() is essential for creating comparison features like 'salary vs department average'.


## 5.7 — Merging and Joining

```python
# Sample DataFrames for merging
employees = pd.DataFrame({
    'id':   [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Carol', 'Dave'],
    'dept_id': [1, 2, 1, 3]
})
salaries = pd.DataFrame({
    'id':     [1, 2, 3, 5],
    'salary': [65000, 80000, 95000, 70000]
})

# Inner join — only rows with matching id in BOTH DataFrames
inner = pd.merge(employees, salaries, on='id', how='inner')
# Result: Alice, Bob, Carol (Dave=4 and id=5 have no match)

# Left join — ALL employees, with salary if available
left = pd.merge(employees, salaries, on='id', how='left')
# Result: Alice, Bob, Carol, Dave (Dave.salary = NaN)

# Find employees with NO matching salary (anti-join pattern)
no_salary = left[left['salary'].isna()][['id','name']]
print('Employees without salary record:', no_salary['name'].tolist())
```

```
# Output:
# Inner join: 3 rows (Alice, Bob, Carol)
# Left join:  4 rows (Alice, Bob, Carol, Dave)
# Employees without salary record: ['Dave']
```

```python

# Concatenation — stacking DataFrames vertically
df_2023 = pd.read_csv('sales_2023.csv')
df_2024 = pd.read_csv('sales_2024.csv')
combined = pd.concat([df_2023, df_2024], ignore_index=True)
```

## 5.8 — Pivot Tables

```python
# Pivot table — like Excel's PivotTable
pivot = df.pivot_table(
    values='Salary',
    index='Dept',
    columns='Gender',
    aggfunc='mean',
    fill_value=0
)
print(pivot)
```

```
# Output:
# Gender       F       M
# Dept
# Finance       0   72000
# HR        61500       0
# IT        95000   80000
```

## 5.9 — Hands-On Exercises

1. Load the Titanic dataset. Report: (a) % missing values in each column, (b) average age by passenger class, (c) survival rate by gender, (d) survival rate by class. What is your headline finding?
1. Create a sales DataFrame with columns: product, region, month, quantity, unit_price. Compute: total revenue per region, best-selling product per month, average discount by product.
1. Merge a 'customers' and 'orders' DataFrame on customer_id using a left join. Find customers who have never placed an order (hint: their order columns will be NaN).
1. Clean a 'phone_number' column containing mixed formats: '(123) 456-7890', '123-456-7890', '1234567890'. Use str.replace() with regex to standardize all to '123-456-7890' format.

## 5.10 — Mini Project: Sales Data Analysis

Create or download a CSV with 500+ rows of sales data (product, region, date, units_sold, unit_price, discount). Build a complete analysis:

- Load and inspect: shape, dtypes, missing values
- Clean: fill nulls, fix types, remove duplicates
- Feature: add revenue = units_sold x unit_price x (1 - discount)
- GroupBy: top 5 products by revenue, revenue trend by month
- Pivot: revenue by region x product category
- Export: clean summary to Excel with multiple sheets

## 5.11 — Interview Questions


### Basic

- What is the difference between a Pandas Series and a DataFrame?
- What is the difference between .loc and .iloc? Give an example where they return different results.
- What are the three most common strategies for handling missing values?

### Intermediate

- Explain the split-apply-combine pattern of GroupBy.
- What is the difference between groupby().transform() and groupby().agg()? When would you use each?
- What is the difference between merge(), join(), and concat()?

### Advanced

- What are the performance implications of .apply() vs vectorized operations? When is .apply() unavoidable?
- How do you handle datasets that are too large to fit in RAM using Pandas? (Hint: chunksize, Dask, Polars)
- What is method chaining in Pandas? Write an example that loads, cleans, filters, and groups in a single chain.

## 5.12 — Key Terms

- DataFrame: Pandas' 2D tabular data structure with labeled rows and columns.
- Series: A 1D labeled array — one column of a DataFrame.
- loc: Label-based selection. Uses row/column labels.
- iloc: Position-based selection. Uses integer positions (0, 1, 2, ...).
- GroupBy: Split-apply-combine operation for aggregation within groups.
- merge: Combines DataFrames on shared columns, similar to SQL JOIN.

## 5.13 — Summary

- Pandas provides Series (1D) and DataFrame (2D) — the core data structures for data science.
- Load data from CSV, Excel, JSON; clean with fillna(), drop_duplicates(), astype().
- Use .ffill() and .bfill() for time-series fill (Pandas 2.0+; not fillna(method=...)).
- Filter with boolean indexing, .loc (labels), .iloc (positions), and .query().
- GroupBy: agg() for summaries, transform() for row-level enrichment.
> **➡️ What's Next:** Chapter 6 brings your data to life with visualization. Using Matplotlib and Seaborn, you will create professional charts and dashboards that turn numbers into compelling stories.

---
