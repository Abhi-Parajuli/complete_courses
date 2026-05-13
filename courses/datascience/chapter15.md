
# Chapter 15: Introduction to Deep Learning

> **📋 Prerequisites:** Chapter 9 (ML fundamentals), Chapter 3 (gradient descent intuition), Chapter 11 (classification metrics).


## 15.1 — What Is a Neural Network?

The human brain has approximately 86 billion neurons. Each neuron receives signals, processes them, and fires if the input is strong enough. Artificial Neural Networks (ANNs) loosely mimic this: artificial neurons receive weighted inputs, sum them, add a bias, and apply a non-linear activation function.

The key insight that makes deep learning powerful: stacking multiple layers of neurons allows the network to learn hierarchical representations — simple features in early layers, complex concepts in later layers.


## 15.2 — Activation Functions


## 15.3 — Backpropagation: A Concrete Example

Backpropagation uses the chain rule of calculus to compute how much each weight contributed to the prediction error, then adjusts all weights in proportion to their contribution.

```python
# Gradient descent in Python — minimizing f(x) = x^2
def f(x):        return x ** 2
def gradient(x): return 2 * x    # df/dx

x  = 10.0   # Start far from minimum
lr = 0.1    # Learning rate

for step in range(20):
    grad = gradient(x)
    x    = x - lr * grad
    print(f'Step {step+1:2d}: x = {x:.4f}, f(x) = {f(x):.6f}')
```

```
# Step  1: x =  8.0000, f(x) = 64.000000
# Step  2: x =  6.4000, f(x) = 40.960000
# Step  5: x =  3.2768, f(x) = 10.737418
# Step 10: x =  1.0737, f(x) =  1.152922
# Step 20: x =  0.1153, f(x) =  0.013294   <- converging to x=0 (minimum)
```

```python

# Key insight: the learning rate controls step size
# Too large -> overshoot, oscillate
# Too small -> very slow convergence
```

## 15.4 — The 5-Step Training Loop

1. Forward pass: input → layer computations → prediction
1. Compute loss: how wrong is the prediction? (cross-entropy for classification, MSE for regression)
1. Backward pass: chain rule computes gradient of loss w.r.t. every weight
1. Update weights: w = w - learning_rate * gradient (gradient descent)
1. Repeat for all mini-batches × epochs — loss should decrease over time

## 15.5 — Building Neural Networks with Keras

```python
# Dense neural network for tabular binary classification
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# Load Breast Cancer dataset
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

data = load_breast_cancer()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler  = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Build the model — Sequential = stack of layers
model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    layers.Dropout(0.3),    # Randomly zero 30% of neurons — reduces overfitting
    layers.Dense(64, activation='relu'),
    layers.BatchNormalization(),  # Normalize layer inputs — speeds training
    layers.Dropout(0.2),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')  # Binary output: P(positive class)
])

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.AUC(name='auc')]
)

model.summary()
```

```
# Model: 'sequential'
# Total params: 12,481
# Trainable params: 12,289
```

```python

# Train — Early Stopping watches val_loss, restores best weights automatically
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    callbacks=[keras.callbacks.EarlyStopping(
        patience=15, restore_best_weights=True, monitor='val_loss')],
    verbose=0   # Set to 1 to see training progress
)

loss, acc, auc = model.evaluate(X_test, y_test, verbose=0)
print(f'Test Accuracy: {acc:.4f}')
print(f'Test AUC:      {auc:.4f}')
```

```
# Test Accuracy: 0.9737
# Test AUC:      0.9962
```

```python
# Plot training history — loss and accuracy over epochs
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['loss'],     label='Train Loss')
axes[0].plot(history.history['val_loss'], label='Val Loss')
axes[0].set_title('Loss over Epochs'); axes[0].legend()
axes[1].plot(history.history['accuracy'],     label='Train Acc')
axes[1].plot(history.history['val_accuracy'], label='Val Acc')
axes[1].set_title('Accuracy over Epochs'); axes[1].legend()
plt.tight_layout(); plt.show()
```

## 15.6 — Regularization in Deep Learning


## 15.7 — Convolutional Neural Networks (CNNs)

CNNs are designed for image data. Convolutional filters scan across the image, learning to detect features: edges in early layers, shapes in middle layers, complex objects in deep layers. Max pooling reduces spatial dimensions, reducing computation and overfitting.

```python
# CNN for handwritten digit classification (MNIST)
from tensorflow.keras.datasets import mnist

# Load and preprocess
(X_train_m, y_train_m), (X_test_m, y_test_m) = mnist.load_data()
X_train_m = X_train_m.reshape(-1, 28, 28, 1) / 255.0  # Add channel dim, normalize
X_test_m  = X_test_m.reshape(-1, 28, 28, 1)  / 255.0

# Build CNN
cnn = keras.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    layers.MaxPooling2D(2,2),          # Reduce 28x28 -> 13x13
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(2,2),          # Reduce 13x13 -> 5x5
    layers.Flatten(),                  # 5x5x64 = 1600 features
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')  # 10 digit classes (0-9)
])

cnn.compile(optimizer='adam',
            loss='sparse_categorical_crossentropy',   # Use when labels are integers
            metrics=['accuracy'])

history_cnn = cnn.fit(
    X_train_m, y_train_m, epochs=10, batch_size=128,
    validation_split=0.1,
    callbacks=[keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)],
    verbose=0
)
test_loss, test_acc = cnn.evaluate(X_test_m, y_test_m, verbose=0)
print(f'CNN Test Accuracy: {test_acc:.4f}')
```

```
# CNN Test Accuracy: 0.9918   <- 99.2% accuracy on MNIST
```

## 15.8 — Transfer Learning

Transfer learning uses a model pre-trained on a large dataset (usually ImageNet with 1.2M images) as a starting point for your task. The pre-trained model has already learned powerful low-level features. You just fine-tune the top layers for your specific problem.

> 💡 **Why This Matters:** Transfer learning lets you achieve high accuracy with only a few hundred training examples — something impossible when training from scratch. It is the standard approach for most real-world computer vision tasks.

```python
# Transfer learning with MobileNetV2 (pre-trained on ImageNet)
base_model = keras.applications.MobileNetV2(
    input_shape=(128, 128, 3),
    include_top=False,          # Exclude ImageNet classification head
    weights='imagenet'          # Use pre-trained weights
)
base_model.trainable = False    # Freeze pre-trained weights initially

model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax')   # 10 output classes
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# Train only the top layers first (fast — base is frozen)
# Then optionally unfreeze and fine-tune the last few layers of base_model
```

## 15.9 — Hands-On Exercises

1. Build a neural network for the Titanic dataset (tabular, binary classification). Compare test accuracy and AUC to Logistic Regression from Chapter 11 using identical train/test splits.
1. Experiment with activation functions: train the same architecture on breast cancer data using ReLU, tanh, and sigmoid in the hidden layers. Plot the training curves side by side.
1. Add and remove Dropout layers (rates 0, 0.2, 0.5) from the CNN trained on MNIST. Plot train vs validation accuracy for each. At what rate does Dropout begin hurting training?
1. Implement data augmentation for the CIFAR-10 dataset using keras.preprocessing.image.ImageDataGenerator. Compare validation accuracy with and without augmentation after 20 epochs.

## 15.10 — Mini Project: Image Classifier with Transfer Learning

Build an image classifier using transfer learning:

- Dataset: CIFAR-10 (60,000 images, 10 classes) from Keras
- Use MobileNetV2 pre-trained on ImageNet as the base
- Add data augmentation (random flip, rotation, zoom)
- Train the top layers for 20 epochs, then unfreeze and fine-tune the last 30 layers
- Target: > 85% validation accuracy
- Plot training/validation accuracy curves — identify when fine-tuning kicks in

## 15.11 — Key Terms


## 15.12 — Interview Questions


### Basic

- What is a neural network? What is a neuron?
- What is an activation function? Why do we need non-linear ones?
- What is overfitting in neural networks? How do you prevent it?

### Intermediate

- Explain backpropagation and the chain rule with a numerical example.
- What is the vanishing gradient problem and how does ReLU address it?
- Compare SGD, Adam, and RMSProp as optimizers. When would you use each?
- What is Batch Normalization and why does it speed up training?

### Advanced

- What is the difference between PCA and an Autoencoder?
- Explain the attention mechanism in Transformers. What problem does it solve that RNNs/LSTMs struggled with?
- When should you use transfer learning vs training from scratch?

## 15.13 — Summary

- Neural networks: layers of neurons with learned weights. Non-linear activation functions enable complex patterns.
- Training loop: forward pass → compute loss → backward pass (backprop) → update weights → repeat.
- Key regularizers: Dropout, Batch Normalization, Early Stopping, data augmentation.
- Keras API: model = Sequential → compile → fit → evaluate. Consistent and readable.
- CNNs for images: convolutional layers detect local patterns; pooling reduces dimensions.
- Transfer learning: start from pre-trained ImageNet weights — achieves strong results with little data.
> **➡️ What's Next:** Chapter 16 brings everything together in real-world projects — end-to-end ML pipelines from data collection to model deployment. These projects form the core of your data science portfolio.

---



---

