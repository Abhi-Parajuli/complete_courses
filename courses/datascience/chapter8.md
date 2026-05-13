# Chapter 8: SQL for Data Science

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Write SQL queries from basic SELECT to window functions; (2) Join multiple tables and understand the difference between join types; (3) Use CTEs to structure complex queries; (4) Run SQL from Python using SQLite and Pandas; (5) Explain query optimization basics.

> 📋 **Prerequisites:** Chapter 5 (Pandas DataFrames will help contextualize table operations). No prior SQL required.


## 8.1 — Why SQL Still Matters in 2025

Despite the rise of Python and big data tools, SQL remains the most universally required skill in data job postings. Here is why: most company data lives in relational databases (MySQL, PostgreSQL, Snowflake, BigQuery), and SQL is the language to access it. Even if you use Python for analysis, you still need SQL to get the data out of the database in the first place.

A data scientist who writes efficient SQL is worth significantly more than one who only knows Pandas.


## 8.2 — Setup: A Runnable SQL Environment

Every query in this chapter is runnable using Python's built-in SQLite. Run this setup block once, then run any query below using pd.read_sql().

```python
# SETUP — run this once to create all tables used in this chapter
import sqlite3
import pandas as pd

# Create an in-memory database (resets when Python restarts)
conn = sqlite3.connect(':memory:')

# Create employees table
pd.DataFrame({
    'id':        [1, 2, 3, 4, 5],
    'name':      ['Alice','Bob','Carol','Dave','Eve'],
    'dept_id':   [1, 2, 1, 3, 2],
    'salary':    [65000, 80000, 95000, 72000, 58000],
    'hire_date': ['2020-01-15','2019-06-01','2018-03-20','2021-09-10','2022-02-28']
}).to_sql('employees', conn, index=False, if_exists='replace')

# Create departments table
pd.DataFrame({
    'id':       [1, 2, 3],
    'name':     ['Engineering','Marketing','Finance'],
    'budget':   [500000, 200000, 350000],
    'location': ['NYC','LA','Chicago']
}).to_sql('departments', conn, index=False, if_exists='replace')

print('Tables created! Employees:')
print(pd.read_sql('SELECT * FROM employees', conn))
```

```
# Output:
# Tables created! Employees:
#    id   name  dept_id  salary   hire_date
# 0   1  Alice        1   65000  2020-01-15
# 1   2    Bob        2   80000  2019-06-01
# 2   3  Carol        1   95000  2018-03-20
# 3   4   Dave        3   72000  2021-09-10
# 4   5    Eve        2   58000  2022-02-28
```

## 8.3 — Basic SELECT Queries

```python
-- Basic SELECT with filtering and sorting
SELECT name, salary FROM employees WHERE salary > 70000 ORDER BY salary DESC;
```

```
# Output:
# name   salary
# Carol   95000
# Bob     80000
# Dave    72000
```

```python

-- BETWEEN, LIKE, IN for flexible filtering
SELECT name, salary FROM employees WHERE salary BETWEEN 60000 AND 90000;
SELECT name FROM employees WHERE name LIKE 'A%';      -- Starts with A
SELECT name FROM employees WHERE dept_id IN (1, 2);   -- Multiple values

-- Run SQL from Python
result = pd.read_sql(\"SELECT name, salary FROM employees WHERE salary > 70000\", conn)
print(result)
```

## 8.4 — Aggregations & GROUP BY

```python
-- Full salary statistics across all employees
SELECT
    COUNT(*)       AS total_employees,
    AVG(salary)    AS avg_salary,
    MIN(salary)    AS min_salary,
    MAX(salary)    AS max_salary,
    SUM(salary)    AS total_payroll
FROM employees;
```

```
# Output:
# total  avg_salary  min_salary  max_salary  total_payroll
#     5       74000       58000       95000         370000
```

```python

-- GROUP BY: stats per department
-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping — this is the key distinction
SELECT dept_id, COUNT(*) AS headcount, AVG(salary) AS avg_sal
FROM employees
GROUP BY dept_id
HAVING COUNT(*) >= 2           -- Only departments with 2+ employees
ORDER BY avg_sal DESC;
```

```
# Output:
# dept_id  headcount  avg_sal
#       1          2    80000   (Engineering: Alice + Carol)
#       2          2    69000   (Marketing: Bob + Eve)
```

## 8.5 — JOINs

JOINs combine data from multiple tables. Mastering joins separates beginner SQL from professional SQL.

```python
-- INNER JOIN: employees with their department name
SELECT e.name, e.salary, d.name AS department, d.location
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id
ORDER BY e.salary DESC;
```

```
# Output:
# name   salary  department   location
# Carol   95000  Engineering       NYC
# Bob     80000   Marketing        LA
# Dave    72000     Finance    Chicago
```

```python

-- LEFT JOIN: find employees with NO matching department
SELECT e.name, COALESCE(d.name, 'No Dept Assigned') AS department
-- COALESCE(value, fallback): returns first non-NULL value
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
```

## 8.6 — Subqueries and CTEs

```python
-- Subquery: employees earning above the company average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- CTE (Common Table Expression): cleaner and reusable version
-- CTEs are defined with WITH and can reference each other
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal,
       ROUND(e.salary - d.avg_sal, 2) AS vs_dept_avg
FROM employees e
JOIN dept_avg d ON e.dept_id = d.dept_id
ORDER BY vs_dept_avg DESC;
```

```
# Output:
# name   salary  avg_sal  vs_dept_avg
# Carol   95000    80000        15000   ← 15k above dept avg
# Bob     80000    69000        11000
# Dave    72000    72000            0
```

## 8.7 — Window Functions

Window functions are the most powerful — and most overlooked — feature of SQL. They perform calculations across related rows without collapsing them (unlike GROUP BY which reduces to one row per group).

```python
-- RANK, ROW_NUMBER, DENSE_RANK
-- PARTITION BY: 'reset the count within each group'
-- ORDER BY: 'rank by this column'
SELECT
    name, dept_id, salary,
    RANK()       OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank,
    ROW_NUMBER() OVER (ORDER BY salary DESC)                      AS overall_rank
FROM employees;
```

```
# Output:
# name   dept_id  salary  dept_rank  overall_rank
# Carol        1   95000          1             1
# Alice        1   65000          2             4
# Bob          2   80000          1             2
```

```python

-- Running total of payroll (as employees were hired over time)
SELECT name, hire_date, salary,
       SUM(salary) OVER (ORDER BY hire_date) AS cumulative_payroll
FROM employees
ORDER BY hire_date;
```

## 8.8 — Classic Interview Query: Second Highest Salary

This is the most commonly asked SQL interview question. Here are two approaches:

```python
-- Method 1: Subquery (works in all SQL dialects)
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: Window function (more flexible — works for Nth highest)
SELECT name, salary
FROM (
    SELECT name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;
```

```
# Output:
# Method 1: second_highest = 80000 (Bob)
# Method 2: name=Bob, salary=80000
```

## 8.9 — Hands-On Exercises

1. Using the setup database: (a) List all employees whose salary is above their department average. (b) List departments whose total salary budget exceeds 100,000. Use CTEs for both.
1. Write a query that ranks employees within each department by salary. Return: name, department, salary, rank within dept, rank overall. Do not use Python — pure SQL.
1. Find the top 3 employees by salary in each department without using LIMIT (it only works globally, not per group). Use DENSE_RANK() in a window function.
1. Write a query to detect duplicate employee records (same name AND same salary) and return only the most recently hired version.

## 8.10 — Interview Questions


### Basic

- What is the difference between WHERE and HAVING? Which filters rows and which filters groups?
- What are the four types of JOINs? Describe what each returns.
- What is the difference between COUNT(*) and COUNT(column_name)?

### Intermediate

- What is a CTE and how does it differ from a subquery in terms of readability and reusability?
- Write a query to find the second-highest salary in a table. Show two approaches.
- What is a window function? What does PARTITION BY do?

### Advanced

- How would you optimize a slow SQL query? What would you check first? (Hint: EXPLAIN, indexes, avoiding SELECT *)
- What is database normalization? Explain 1NF, 2NF, and 3NF with a practical example.
- Write a query to find customers who ordered in 2023 but NOT in 2024. (Hint: EXCEPT or NOT EXISTS)

## 8.11 — Key Terms

- Primary Key: A column that uniquely identifies each row in a table.
- Foreign Key: A column that references the primary key of another table, creating a relationship.
- JOIN: Combines rows from two tables based on a matching column.
- COALESCE: Returns the first non-NULL value from a list of arguments.
- CTE (Common Table Expression): A named temporary result set defined with WITH, used to simplify complex queries.
- Window Function: Performs a calculation across a set of rows related to the current row, without collapsing results (unlike GROUP BY).

## 8.12 — Summary

- SQL is the universal language for accessing relational databases — still the most demanded skill in data job postings.
- Core: SELECT, WHERE, GROUP BY (rows) vs HAVING (groups), ORDER BY, LIMIT.
- JOINs: INNER (matching), LEFT (all from left + matching right), RIGHT, FULL OUTER.
- CTEs make complex queries readable, reusable, and testable in parts.
- Window functions (RANK, ROW_NUMBER, SUM OVER) are essential for ranking, running totals, and moving averages.
> **➡️ What's Next:** Chapter 9 introduces Machine Learning — the field that lets computers learn patterns from data. We cover the core concepts: types of ML, the bias-variance tradeoff, and the Scikit-learn workflow.

---

