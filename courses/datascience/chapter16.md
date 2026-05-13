
# Chapter 16: Real-World Data Science Projects

> **📋 Prerequisites:** Chapter 14 (Pipelines, joblib), Chapter 9 (Scikit-learn API), Chapter 11 or 13 (any classification model).


## 16.1 — Portfolio Projects Matter

In data science hiring, a strong GitHub portfolio often matters more than your degree or certifications. Hiring managers want concrete evidence: Can you take raw data, build a model, and ship something useful?

Projects answer that question. The best project is not the most technically complex — it is the one that is clearly explained, solves a real problem, and can be demonstrated live.

> 💡 **Why This Matters:** A working Streamlit app that anyone can try in their browser is worth more than 10 Jupyter notebooks that only you can run. Deployment is the difference between a learning exercise and a portfolio piece.


## 16.2 — Professional Project Structure

```python
# Standard data science project folder structure
data-science-portfolio/
  house-price-predictor/
    data/
      raw/           <- original data, NEVER modified
      processed/     <- cleaned, feature-engineered data
    notebooks/
      01_EDA.ipynb
      02_Feature_Engineering.ipynb
      03_Modeling.ipynb
    src/
      data_pipeline.py
      feature_engineering.py
      train.py
    app/
      app.py         <- Streamlit or FastAPI
    models/
      pipeline.pkl   <- saved model pipeline
    requirements.txt
    README.md        <- CRITICAL: document everything here
```

## 16.3 — Deploying with Streamlit

Streamlit turns a Python script into an interactive web app in minutes — no HTML, CSS, or JavaScript required.

```python
# app.py — Streamlit app for house price prediction
import streamlit as st
import pandas as pd
import joblib

# Load the saved Pipeline (includes preprocessing + model)
@st.cache_resource
def load_model():
    return joblib.load('models/pipeline.pkl')

model = load_model()

st.title('House Price Predictor')
st.markdown('Enter house features to get an estimated price.')
st.divider()

# Two-column layout for inputs
col1, col2 = st.columns(2)
with col1:
    area   = st.slider('Area (sq ft)', 500, 5000, 1800, step=50)
    rooms  = st.selectbox('Bedrooms', [1, 2, 3, 4, 5])
    age    = st.slider('House Age (years)', 0, 100, 10)
with col2:
    garage = st.checkbox('Garage')
    pool   = st.checkbox('Pool')
    garden = st.checkbox('Garden')

if st.button('Estimate Price', type='primary'):
    input_df = pd.DataFrame({
        'area':   [area],
        'rooms':  [rooms],
        'age':    [age],
        'garage': [int(garage)],
        'pool':   [int(pool)]
    })
    price = model.predict(input_df)[0]
    st.success(f'Estimated Price: ${price:,.0f}')
    st.balloons()
```

## 16.4 — Deploying with FastAPI

FastAPI creates a production-grade REST API for your model — the standard for serving ML predictions to other applications.

```python
# main.py — REST API for model serving
from fastapi import FastAPI
from pydantic import BaseModel
import joblib, pandas as pd

app   = FastAPI(title='House Price API', version='1.0')
model = joblib.load('models/pipeline.pkl')

class HouseFeatures(BaseModel):
    area:   float
    rooms:  int
    age:    int
    garage: int = 0
    pool:   int = 0

@app.get('/')
def health_check():
    return {'status': 'healthy', 'model': 'House Price v1.0'}

@app.post('/predict')
def predict(features: HouseFeatures):
    data = pd.DataFrame([features.dict()])
    prediction = model.predict(data)[0]
    return {
        'predicted_price': round(float(prediction), 2),
        'currency': 'USD'
    }

# Run: pip install fastapi uvicorn
# Start: uvicorn main:app --reload
# Test: POST http://localhost:8000/predict
# Auto-docs: http://localhost:8000/docs  <- interactive API documentation!
```

## 16.5 — Four Portfolio Projects


## 16.6 — Writing a Professional README

A good README is the difference between a project that gets noticed and one that gets ignored. Use this template for every project:

```python
# README.md template
# Project Title

> One-sentence description: what it does and why it matters.

## Problem Statement
What business question does this project answer?

## Dataset
- Source: [Kaggle link]
- Size: 891 rows x 12 features
- Target: Survived (binary: 0/1)

## Methodology
1. EDA: discovered 38% survival rate, strong correlation with Sex and Pclass
2. Feature Engineering: created family_size, is_alone features
3. Model: XGBoost with RandomizedSearchCV (50 iterations, StratifiedKFold)

## Results
| Metric | Score |
|--------|-------|
| Accuracy | 87.3% |
| AUC-ROC | 0.924 |
| F1 (Survived) | 0.83 |

## How to Run
pip install -r requirements.txt
streamlit run app/app.py

## Live Demo
[Try the app here](https://yourusername-project.streamlit.app)
```

## 16.7 — Before/After: Weak vs Strong Project Bullets


## 16.8 — Mini Project: Customer Churn Predictor (End-to-End)

Build and deploy a production-quality churn prediction system:

1. Data: IBM Telco Customer Churn dataset from Kaggle
1. EDA: comprehensive analysis, identify patterns in churned vs retained customers
1. Feature engineering: create 5 new features (e.g., tenure_bucket, monthly_per_service)
1. Model: XGBoost with RandomizedSearchCV, handle class imbalance with class_weight
1. Evaluation: confusion matrix, precision, recall, F1, AUC, cost-benefit analysis
1. Deploy: Streamlit app with customer data input form showing churn probability
1. Deploy to Streamlit Cloud (free) — get a public URL
1. Push to GitHub with a professional README following the template above

## 16.9 — Key Terms


## 16.10 — Interview Questions


### Basic

- What is model deployment and why does it matter?
- What is a REST API? How does it allow other applications to use your ML model?
- What should a data science portfolio project GitHub README include?

### Intermediate

- What is model drift and how do you monitor for it in production?
- How would you containerize an ML model with Docker for reproducible deployment?
- What is A/B testing and how would you use it to decide when to deploy a new model version?

### Advanced

- Describe a complete MLOps pipeline: from training to monitoring to retraining.
- How would you design a real-time recommendation system for an e-commerce platform?
- What are the main challenges of maintaining ML models in production over 12+ months?

## 16.11 — Summary

- Portfolio projects demonstrate practical skill more effectively than certifications.
- Use a consistent structure: data/ notebooks/ src/ app/ models/ with requirements.txt and README.
- Streamlit: build an interactive web app in Python in under an hour. Deploy free at share.streamlit.io.
- FastAPI: production-grade REST API for serving model predictions to other applications.
- Write a detailed README using the template above — it's your project's cover letter.
- Quantify everything on your resume: '87.3% accuracy' not 'model performed well.'
> **➡️ What's Next:** Chapter 17 is your career launch chapter: building your resume, LinkedIn, GitHub profile, and preparing for data science interviews — including 100+ practice questions organized by topic and difficulty.

---