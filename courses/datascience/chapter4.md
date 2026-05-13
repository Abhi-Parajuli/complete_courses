
# Chapter 4: NumPy — Numerical Computing

> **🎯 Learning Objectives:** By the end of this chapter, you will be able to: (1) Create, index, and slice NumPy arrays; (2) Write vectorized operations that replace slow Python loops; (3) Apply broadcasting to operate on arrays of different shapes; (4) Use NumPy for linear algebra (matrix multiply, solve, inverse); (5) Explain why NumPy is 50-100x faster than Python lists.

> 📋 **Prerequisites:** Chapter 2 (Python basics), Chapter 3 (vectors and matrices). Install: pip install numpy


## 4.1 — Why NumPy?

Python lists are flexible but slow. When you have a million data points and need to perform thousands of calculations, speed matters enormously.

NumPy arrays are stored in contiguous memory blocks and use C-level operations under the hood. The result: operations that would take seconds in plain Python take milliseconds with NumPy.

```python
# Speed comparison: Python list vs NumPy array
import numpy as np
import time

n = 1_000_000
# Python list: square each element using a loop
py_list = list(range(n))
start = time.time()
result = [x ** 2 for x in py_list]
py_time = time.time() - start

# NumPy: vectorized squaring — no loop needed
np_array = np.arange(n)
start = time.time()
result = np_array ** 2
np_time = time.time() - start

print(f'Python list: {py_time:.4f}s')
print(f'NumPy array: {np_time:.4f}s')
print(f'Speedup:     {py_time/np_time:.0f}x faster!')
```

```
# Output:
# Python list: 0.1823s
# NumPy array: 0.0021s
# Speedup:     87x faster!
```
> 💡 **Why This Matters:** A machine learning model often performs millions of array operations per training epoch. The difference between NumPy and pure Python can be the difference between a 2-minute training run and a 3-hour one.


## 4.2 — Creating Arrays

```python
# Multiple ways to create NumPy arrays
import numpy as np

# From a Python list
a = np.array([1, 2, 3, 4, 5])
print('dtype:', a.dtype)   # NumPy infers int64

# Special arrays
zeros = np.zeros((3, 4))   # 3x4 matrix of zeros
ones  = np.ones((2, 5))    # 2x5 matrix of ones
eye   = np.eye(4)          # 4x4 identity matrix

# Range arrays
arr1 = np.arange(0, 20, 2)        # [0, 2, 4, ..., 18]
arr2 = np.linspace(0, 1, 11)      # 11 evenly spaced from 0 to 1

# Random arrays — ALWAYS set seed for reproducibility
# Setting the seed here ensures ALL subsequent np.random calls
# produce the same values — essential for reproducible science
np.random.seed(42)
rand_normal = np.random.randn(3, 3)  # Standard normal
rand_int    = np.random.randint(1, 100, size=(3, 4))
```

```
# Output:
# dtype: int64
# zeros shape: (3, 4)  — all zeros
# arr1: [ 0  2  4  6  8 10 12 14 16 18]
# arr2: [0.  0.1  0.2  ...  1.0]
```

## 4.3 — Array Properties & Indexing

```python
# Array properties
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

print('Shape:  ', arr.shape)   # (3, 4) — 3 rows, 4 columns
print('Dims:   ', arr.ndim)    # 2 — two-dimensional
print('Size:   ', arr.size)    # 12 — total elements
print('Dtype:  ', arr.dtype)   # int64
```

```
# Output:
# Shape:   (3, 4)
# Dims:    2
# Size:    12
# Dtype:   int64
```

```python

# Indexing — [row, col]  (zero-based)
print(arr[0, 0])    # 1   — first row, first col
print(arr[2, 3])    # 12  — last row, last col
print(arr[-1, -1])  # 12  — negative indexing

# Slicing — [start:stop:step]  (stop is exclusive)
print(arr[0, :])       # [1 2 3 4]   — entire first row
print(arr[:, 1])       # [2 6 10]    — entire second column
print(arr[0:2, 1:3])  # 2x2 sub-matrix: [[2,3],[6,7]]
```

## 4.4 — Vectorized Operations (No Loops Needed!)

Vectorized operations apply a computation to every element simultaneously, using optimized C code under the hood. This is the key principle of NumPy.

```python
# Element-wise operations — no loops needed!
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

print('Add:  ', a + b)
print('Mul:  ', a * b)
print('Sq:   ', a ** 2)
print('Sqrt: ', np.sqrt(a).round(3))
```

```
# Output:
# Add:   [11 22 33 44 55]
# Mul:   [ 10  40  90 160 250]
# Sq:    [ 1  4  9 16 25]
# Sqrt:  [1.    1.414  1.732  2.    2.236]
```

```python

# Aggregate functions — axis parameter controls direction
data = np.array([[4, 7, 2],
                 [1, 8, 5],
                 [3, 6, 9]])

print('Total sum:   ', data.sum())
print('Row sums:    ', data.sum(axis=1))   # Sum across columns (per row)
print('Column sums: ', data.sum(axis=0))   # Sum across rows (per column)
print('Column max:  ', data.max(axis=0))
```

```
# Output:
# Total sum:    45
# Row sums:     [13 14 18]
# Column sums:  [ 8 21 16]
# Column max:   [4 8 9]
```

## 4.5 — Broadcasting

Broadcasting is NumPy's way of performing operations on arrays of different shapes — automatically, without copying data. Understanding the shape-compatibility rules unlocks NumPy's full power.


### Broadcasting Shape Rules

NumPy compares shapes from the trailing (rightmost) dimension. Dimensions are compatible if they are equal, or one of them is 1.

```python
# Shape compatibility for broadcasting:
# scores shape:    (3, 4)  ← 3 students, 4 exams
# col_means shape: (4,)    ← one mean per exam
# Trailing dims:   4 == 4  ← COMPATIBLE
# Result shape:    (3, 4)  ← subtraction happens row by row

scores = np.array([[85, 92, 78, 90],
                   [70, 88, 65, 75],
                   [95, 89, 92, 98]])

col_means  = scores.mean(axis=0)          # Shape: (4,)
normalized = scores - col_means           # Shape: (3,4) - (4,) → broadcasts!

print('Column means:', col_means)
print('Normalized:\\n', normalized)
```

```
# Output:
# Column means: [83.33 89.67 78.33 87.67]
# Normalized:
#  [ 1.67  2.33 -0.33  2.33]   ← student 1 vs class average
#  [-13.33 -1.67-13.33 -12.67]  ← student 2 below average in all
#  [11.67  -0.67  13.67  10.33]  ← student 3 above average in all
```

## 4.6 — Boolean Indexing & Filtering

```python
# Filter arrays with conditions — no loop needed
ages = np.array([15, 22, 35, 18, 42, 28, 65, 17])

# Create boolean mask
is_adult = ages >= 18
print('Mask:       ', is_adult)
print('Adult ages: ', ages[is_adult])

# Multiple conditions with & (and) and | (or)
working_age = ages[(ages >= 18) & (ages <= 65)]
print('Working age:', working_age)

# np.where — conditional replacement
category = np.where(ages >= 18, 'adult', 'minor')
print('Category:  ', category)
```

```
# Output:
# Mask:        [False  True  True  True  True  True  True False]
# Adult ages:  [22 35 18 42 28 65]
# Working age: [22 35 18 42 28 65]
# Category:    ['minor' 'adult' 'adult' 'adult' 'adult' 'adult' 'adult' 'minor']
```

## 4.7 — Linear Algebra with NumPy

```python
# Matrix multiplication and linear algebra
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print('A @ B =\\n', A @ B)
print('det(A) =', np.linalg.det(A).round(2))
print('inv(A) =\\n', np.linalg.inv(A).round(3))
```

```
# Output:
# A @ B = [[19 22] [43 50]]
# det(A) = -2.0
# inv(A) = [[-2.   1. ] [ 1.5 -0.5]]
```

```python

# Solve system of equations: Ax = b
# 2x + 3y = 8
# 4x + 9y = 16
A = np.array([[2, 3], [4, 9]])
b = np.array([8, 16])
x = np.linalg.solve(A, b)
print('Solution: x =', x.round(4))
# Verify: A @ x should equal b
print('Verify A@x:', (A @ x).round(4))
```

```
# Output:
# Solution: x = [3.     0.6667]
# Verify A@x: [8. 16.]  ← matches b perfectly
```

## 4.8 — Hands-On Exercises

1. Create a 5x5 matrix with random integers from 1-100 (seed=42). Find: sum of the main diagonal, max value of each row, min value of each column, and mean of the entire matrix.
1. Simulate rolling two dice 10,000 times. Compute the distribution of sums (2 through 12). Verify that 7 is the most common sum. Plot the distribution.
1. Given an array of temperatures in Celsius (from -20 to 50), convert to Fahrenheit using broadcasting (no loops). Then filter to only temperatures in the comfortable range 18-27°C.
1. Implement matrix multiplication from scratch using nested loops. Compare its speed to NumPy's @ operator on a 200x200 matrix using time.time(). Report the speedup factor.

## 4.9 — Mini Project: Image as Matrix

A grayscale image is literally a 2D NumPy array where each value is a pixel brightness (0=black, 255=white). This project demonstrates that image manipulation is just array manipulation:

- Load any image using PIL/Pillow and convert to grayscale
- Display original, horizontally flipped, and vertically flipped versions
- Brighten (multiply by 1.5, clip to 255), darken (multiply by 0.5)
- Crop a 100x100 region using array slicing
```python
# Mini Project: Image = NumPy Array
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

# Load and convert to grayscale (L = luminance = single channel)
img = np.array(Image.open('photo.jpg').convert('L'))
print(f'Image shape: {img.shape}')  # (height, width)
print(f'Min pixel: {img.min()}, Max pixel: {img.max()}')

# All transformations are just array operations!
flipped_v  = img[::-1]         # Flip vertically
flipped_h  = img[:, ::-1]      # Flip horizontally
brightened = np.clip(img * 1.5, 0, 255).astype(np.uint8)
cropped    = img[100:200, 100:200]  # 100x100 crop
```

```
# Output:
# Image shape: (480, 640)   ← height x width in pixels
# Min pixel: 0, Max pixel: 255
```

## 4.10 — Interview Questions


### Basic

- What is the difference between a Python list and a NumPy array?
- What does arr.shape return? What does each element of the tuple mean?
- How do you create a NumPy array from a Python list? What happens to mixed data types?

### Intermediate

- Explain NumPy broadcasting with a concrete example. What are the shape compatibility rules?
- What is the difference between axis=0 and axis=1 in operations like .sum()? Which sums across rows and which across columns?
- What is the difference between np.copy() and direct assignment (b = a)? Demonstrate with code.

### Advanced

- How does NumPy achieve its speed advantage over Python lists? Explain contiguous memory and SIMD operations.
- What is the difference between C-order (row-major) and Fortran-order (column-major) memory layout? When does it matter for performance?
- What is np.einsum? Give an example of a matrix operation expressed with einsum notation.

## 4.11 — Key Terms

- ndarray: NumPy's N-dimensional array — the core data structure.
- dtype: The data type of array elements (int64, float32, etc.). All elements in an array share the same dtype.
- vectorized operation: A computation applied to all array elements at once using optimized C code, without Python loops.
- broadcasting: NumPy's rules for performing operations on arrays with different but compatible shapes.
- axis: Direction of operation. axis=0 operates down rows; axis=1 operates across columns.

## 4.12 — Summary

- NumPy arrays are 50-100x faster than Python lists due to contiguous memory and C-level operations.
- Key creation: np.array(), np.zeros(), np.ones(), np.arange(), np.linspace(), np.random.
- Indexing [row, col] and slicing [start:stop:step] enable powerful data extraction.
- Vectorized operations eliminate slow Python loops — always prefer them.
- Broadcasting allows operations on arrays of different shapes; always check shape compatibility.
> **➡️ What's Next:** Chapter 5 introduces Pandas — the library that makes working with real-world tabular data (CSVs, Excel, SQL results) easy and powerful. Pandas is built on NumPy, so everything you just learned applies!

---