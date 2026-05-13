
# Chapter 2: Python for Data Science

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Store and manipulate data using Python's core data types; (2) Choose the right collection type (list, dict, tuple, set) for each use case; (3) Write reusable functions and apply them to data; (4) Build a simple class to model a real-world object; (5) Handle runtime errors gracefully with try/except.

> 📋 **Prerequisites:** None — this chapter assumes zero programming experience. Skip to Section 2.5 if you already know Python basics.


## 2.1 — Why Python?

Python was created by Guido van Rossum in 1991 and named after Monty Python's Flying Circus — not the snake. Its design philosophy: code should be readable, simple, and elegant.

For data science, Python wins because: it reads almost like English, has the largest data science library ecosystem in the world, is free and open-source, and has an enormous, supportive community. A job posting requiring Python skills has become the norm, not the exception.


## 2.2 — Variables and Data Types

A variable is like a labeled box. You put something in the box and give it a name so you can find it later.

```python
# Variables — storing information
name = 'Alice'          # String (text)
age = 25               # Integer (whole number)
salary = 75000.50      # Float (decimal number)
is_employed = True     # Boolean (True/False)

# Check the type of a variable
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
```

```
# Output:
# <class 'str'>
# <class 'int'>
```

### Collections — Choosing the Right Type

Python has four main collection types. Here is how to choose:

```python
# List — ordered, mutable (changeable)
scores = [95, 87, 92, 78, 88]
scores.append(91)         # Add item at end
scores.sort()             # Sort in place (ascending)
print(scores[0])          # First item
print(scores[-1])         # Last item (negative indexing)
```

```
# Output:
# 78
# 95
```

```python

# Dictionary — key-value pairs (like a lookup table)
student = {'name': 'Alice', 'age': 25, 'gpa': 3.9}
print(student['name'])    # Access by key
student['major'] = 'CS'  # Add new key
print(student)            # See the full dict after adding
```

```
# Output:
# Alice
# {'name': 'Alice', 'age': 25, 'gpa': 3.9, 'major': 'CS'}
```

```python

# Set — unique values only (duplicates silently removed)
tags = {'python', 'data', 'python', 'ml'}
print(tags)   # 'python' appears only once
```

```
# Output:
# {'python', 'data', 'ml'}
```

## 2.3 — Control Flow

```python
# If-Elif-Else
temperature = 35
if temperature > 30:
    print('It is hot!')
elif temperature > 20:
    print('It is warm.')
else:
    print('It is cool.')
```

```
# Output:
# It is hot!
```

```python

# For Loop — iterate over a collection
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(f'I like {fruit}')
```

```
# Output:
# I like apple
# I like banana
# I like cherry
```

```python

# List Comprehension — Pythonic, fast, readable
squares = [x**2 for x in range(1, 6)]
print(squares)
```

```
# Output:
# [1, 4, 9, 16, 25]
```

```python

# Filtered list comprehension — only even numbers
evens = [x for x in range(20) if x % 2 == 0]
print(evens)
```

```
# Output:
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```
> 💡 **List vs Generator:** List comprehensions build the whole list in memory at once. For very large datasets, use a generator expression instead: sum(x**2 for x in range(1_000_000)) — it computes one value at a time and uses far less memory.


## 2.4 — Functions

Functions are reusable blocks of code. Think of them as recipes — define once, use many times.

```python
# Function with default arguments
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # Uses default exponent=2 → 9
print(power(3, 3))  # Override to exponent=3 → 27
```

```
# Output:
# 9
# 27
```

```python

# Function returning multiple values (as a tuple)
def stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

low, high, avg = stats([10, 20, 30, 40, 50])
print(f'Min: {low}, Max: {high}, Avg: {avg}')
```

```
# Output:
# Min: 10, Max: 50, Avg: 30.0
```

```python

# Lambda — anonymous one-line function, common in Pandas .apply()
square = lambda x: x ** 2
print(square(5))
```

```
# Output:
# 25
```

## 2.5 — Error Handling

Real data is messy and programs encounter unexpected inputs. Error handling lets your code fail gracefully instead of crashing.

```python
# Try-Except — handle errors gracefully
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return 'Error: Cannot divide by zero!'
    except TypeError:
        return 'Error: Inputs must be numbers!'

print(divide(10, 2))    # Normal case
print(divide(10, 0))    # Division by zero
print(divide(10, 'x'))  # Wrong type
```

```
# Output:
# 5.0
# Error: Cannot divide by zero!
# Error: Inputs must be numbers!
```

## 2.6 — Object-Oriented Programming (OOP) Basics

OOP lets you model real-world entities as code objects. A class is a blueprint; an object is a specific thing built from that blueprint. For example, 'DataSet' is a class; 'the Titanic dataset' is an object.

```python
# Class definition — a blueprint for DataSet objects
class DataSet:
    def __init__(self, name, rows, columns):  # Called when object is created
        self.name = name         # self.X stores the data on this specific object
        self.rows = rows
        self.columns = columns

    def summary(self):           # Method — function attached to the class
        return f'{self.name}: {self.rows} rows x {self.columns} cols'

    def size(self):
        return self.rows * self.columns

# Create instances (objects) — each is an independent DataSet
titanic = DataSet('Titanic', 891, 12)
iris    = DataSet('Iris', 150, 5)

print(titanic.summary())  # Calls method on 'titanic' object
print(iris.size())        # Calls method on 'iris' object
```

```
# Output:
# Titanic: 891 rows x 12 cols
# 750
```

## 2.7 — Hands-On Exercises

1. Write a function that takes a list of exam scores and returns: minimum, maximum, average, and a letter grade (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60) based on the average.
1. Create a dictionary mapping 10 country names to their capitals. Write a function that looks up any country and returns its capital, with a helpful error message if the country is not found (use .get() or try/except).
1. Write a list comprehension that generates all prime numbers between 1 and 100. (Hint: a prime has no divisors other than 1 and itself.)
1. Create a 'BankAccount' class with: deposit(amount), withdraw(amount), and get_balance() methods. Use try/except to raise an error for insufficient funds. Test it with a sequence of deposits and withdrawals.

## 2.8 — Mini Project: Student Grade Analyzer

Build a Python program that stores student names and scores, analyzes them, and prints a formatted report:

- Stores student names and their scores in a dictionary
- Calculates each student's average, letter grade, and class rank
- Identifies the top performer and any students at risk (below 60% average)
- Prints a neatly formatted report card
```python
# Mini Project Starter
students = {
    'Alice': [88, 92, 95, 91],
    'Bob':   [72, 68, 75, 70],
    'Carol': [95, 98, 92, 97],
    'Dave':  [55, 60, 58, 52]
}

def letter_grade(avg):
    if avg >= 90: return 'A'
    elif avg >= 80: return 'B'
    elif avg >= 70: return 'C'
    elif avg >= 60: return 'D'
    else: return 'F'

# Compute averages and sort by them for ranking
averages = {name: sum(s)/len(s) for name, s in students.items()}
ranked = sorted(averages, key=averages.get, reverse=True)

print(f\"{'Name':<10} {'Avg':>6} {'Grade':>6} {'Rank':>6} {'Status':>10}\")
print('-' * 42)
for rank, name in enumerate(ranked, 1):
    avg = averages[name]
    grade = letter_grade(avg)
    status = 'AT RISK' if avg < 60 else ''
    print(f'{name:<10} {avg:>6.1f} {grade:>6} {rank:>6} {status:>10}')
```

```
# Output:
# Name        Avg  Grade  Rank     Status
# ------------------------------------------
# Carol      95.5      A     1
```

```python
# Alice      91.5      A     2
```

```
# Bob        71.3      C     3
# Dave       56.3      F     4    AT RISK
```

## 2.9 — Interview Questions


### Basic

- What is the difference between a list and a tuple in Python?
- What is a dictionary and when would you use one over a list?
- What is the difference between mutable and immutable objects? Give a data science example where this distinction matters.

### Intermediate

- Explain list comprehensions. When would you use one vs. a regular for loop?
- What is the difference between '==' and 'is' in Python?
- What are *args and **kwargs? Give a practical example.

### Advanced

- Explain Python's GIL (Global Interpreter Lock) and how it relates to multiprocessing vs. multithreading for CPU-bound data tasks.
- What is the difference between a shallow copy and a deep copy? When does it matter for NumPy arrays?
- Explain generators and yield. How do they differ from regular functions, and why are they useful for large datasets?

## 2.10 — Key Terms

- Variable: A named storage location that holds a value.
- Immutable: An object whose value cannot be changed after creation (strings, tuples, integers).
- Mutable: An object whose value can be changed in place (lists, dictionaries, sets).
- Function: A named, reusable block of code that performs a task.
- Class: A blueprint for creating objects. Defines data (attributes) and behavior (methods).
- Exception: An error that occurs during program execution; handled with try/except.

## 2.11 — Summary

- Python's readable syntax makes it the ideal language for data science.
- Core data types: str, int, float, bool. Core collections: list (mutable, ordered), tuple (immutable), dict (key-value), set (unique).
- Choose the right collection: list for sequences, dict for lookups, tuple for fixed data, set for uniqueness.
- Functions encapsulate reusable logic; lambdas handle simple one-liners (common in Pandas).
- OOP: classes are blueprints; objects are instances built from blueprints.
> **➡️ What's Next:** Chapter 3 covers the mathematical foundations of data science — statistics, probability, and linear algebra. We will build your intuition step by step using code, so even if math feels intimidating, you will finish with confidence.

---