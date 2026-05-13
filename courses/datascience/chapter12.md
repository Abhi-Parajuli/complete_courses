
# Chapter 12: Unsupervised Learning

> **📋 Prerequisites:** Chapter 9 (ML fundamentals), Chapter 4 (NumPy arrays), Chapter 5 (Pandas).


## 12.1 — Learning Without Labels

In supervised learning, each data point has a label telling us the right answer. In unsupervised learning, we have no such guidance — the algorithm must find structure on its own.

Think of it like being given 10,000 photos with no labels and being asked to organize them into meaningful groups. You might naturally form groups: faces, landscapes, food, animals — without anyone telling you those categories exist.

> 💡 **Why This Matters:** Unsupervised learning is often the first step in data exploration. It reveals natural groupings (customer segments), detects anomalies (fraud, equipment failure), and compresses data (PCA) before supervised modeling. Many real-world datasets have no labels at all.


## 12.2 — K-Means Clustering

K-Means partitions data into K clusters. The algorithm: (1) Initialize K centroids randomly, (2) Assign each point to its nearest centroid, (3) Move each centroid to the mean of its cluster, (4) Repeat steps 2–3 until centroids stop moving.

```python
# K-Means on generated cluster data
import numpy as np, matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler

# Generate 4-cluster data
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.8, random_state=42)
X = StandardScaler().fit_transform(X)

# Fit KMeans
# n_init=10: runs 10 times with different random starts, keeps best result
# This prevents getting stuck in a poor local minimum
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
kmeans.fit(X)
labels  = kmeans.labels_
centers = kmeans.cluster_centers_
print(f'Inertia (within-cluster sum of squares): {kmeans.inertia_:.2f}')
```

```
# Inertia: 304.21  <- lower is better, but must be compared across K values
```

```python

# Visualize clusters
colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6']
fig, ax = plt.subplots(figsize=(8, 6))
for k in range(4):
    mask = labels == k
    ax.scatter(X[mask, 0], X[mask, 1], c=colors[k], alpha=0.6, label=f'Cluster {k+1}')
ax.scatter(centers[:, 0], centers[:, 1], c='black', marker='X', s=200, label='Centroids')
ax.set_title('K-Means Clustering (K=4)'); ax.legend(); plt.show()
```

### Choosing K: The Elbow Method

```python
# Try K from 1 to 10, plot inertia — look for the 'elbow'
inertias = []
k_range  = range(1, 11)

for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

plt.figure(figsize=(8, 5))
plt.plot(list(k_range), inertias, 'bo-', markersize=8)
plt.xlabel('Number of Clusters K')
plt.ylabel('Inertia (Within-cluster Sum of Squares)')
plt.title('Elbow Method — Choose K at the bend point')
plt.xticks(list(k_range))
plt.show()
```

```
# The inertia drops sharply from K=1 to K=4, then flattens out
# -> The 'elbow' at K=4 suggests 4 clusters is optimal
```

## 12.3 — Hierarchical Clustering

Hierarchical clustering builds a tree of clusters called a dendrogram. Unlike K-Means, it does not require specifying K upfront — you choose how many clusters you want after viewing the full hierarchy.

```python
# Agglomerative (bottom-up) Hierarchical Clustering
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

# Build and display the full dendrogram
linked = linkage(X, method='ward')  # Ward minimizes within-cluster variance
fig, ax = plt.subplots(figsize=(12, 5))
dendrogram(linked, ax=ax, truncate_mode='lastp', p=20)
ax.set_title('Hierarchical Clustering Dendrogram')
ax.set_xlabel('Sample Index or Cluster Size')
ax.set_ylabel('Distance (Ward linkage)')
# Horizontal line across the dendrogram = cutting into N clusters
plt.show()

# Cut the dendrogram at 4 clusters
hc = AgglomerativeClustering(n_clusters=4, linkage='ward')
labels_hc = hc.fit_predict(X)
print(f'Cluster sizes: {[sum(labels_hc==k) for k in range(4)]}')
```

```
# Cluster sizes: [78, 72, 80, 70]
```

## 12.4 — DBSCAN: Density-Based Clustering

DBSCAN finds clusters of arbitrary shape and automatically identifies outliers as noise. It requires no K specification — it discovers the number of clusters from the data.

```python
# DBSCAN — great for non-convex cluster shapes
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons

# Generate crescent-shaped data (K-Means will fail here)
X_moons, _ = make_moons(n_samples=200, noise=0.08, random_state=42)

dbscan = DBSCAN(eps=0.2, min_samples=5)
labels_db = dbscan.fit_predict(X_moons)

n_clusters = len(set(labels_db)) - (1 if -1 in labels_db else 0)
n_noise    = list(labels_db).count(-1)
print(f'Clusters found: {n_clusters}')
print(f'Noise points:   {n_noise}')
```

```
# Clusters found: 2  <- correctly found the two crescents
# Noise points:   3
```

```python

# Hyperparameter guidance:
# eps: plot k-NN distance graph (k = min_samples-1), look for the elbow
# min_samples: start with 2 * n_features, minimum 3
# Too small eps -> everything is noise
# Too large eps -> everything merges into one cluster
```

## 12.5 — Principal Component Analysis (PCA)

PCA reduces dimensionality while preserving maximum variance. It finds new axes (principal components) in the direction of greatest variation, then projects data onto those axes.

Use PCA when you have too many features, you want to visualize high-dimensional data, or you want to remove correlated features before modeling.

```python
# PCA on the Digits dataset (64 features = 8x8 pixel images)
from sklearn.decomposition import PCA
from sklearn.datasets import load_digits

digits   = load_digits()
X_digits = digits.data   # Shape: (1797, 64)

# How many components explain 95% of variance?
pca_full = PCA().fit(X_digits)
cumvar = np.cumsum(pca_full.explained_variance_ratio_)
n_95   = np.argmax(cumvar >= 0.95) + 1
print(f'Components for 95% variance: {n_95} (out of 64)')
```

```
# Components for 95% variance: 29 (out of 64)
```

```python
# We can represent 95% of the information using only 29 dimensions!

# Reduce to 2D for visualization
pca_2d  = PCA(n_components=2)
X_2d    = pca_2d.fit_transform(X_digits)
pct_var = pca_2d.explained_variance_ratio_.sum() * 100
print(f'Variance explained by 2 PCs: {pct_var:.1f}%')
```

```
# Variance explained by 2 PCs: 28.6%
```

```python

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_2d[:,0], X_2d[:,1], c=digits.target, cmap='tab10', alpha=0.7)
plt.colorbar(scatter, label='Digit class')
plt.xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]*100:.1f}% variance)')
plt.ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]*100:.1f}% variance)')
plt.title('Digits Dataset: PCA to 2D'); plt.show()
```

## 12.6 — t-SNE: Visualization of High-Dimensional Data

t-SNE (t-distributed Stochastic Neighbor Embedding) is a non-linear technique specifically designed for visualizing high-dimensional data in 2D or 3D. Unlike PCA, it focuses on preserving local neighborhood structure.

```python
# t-SNE visualization — best practice: PCA first, then t-SNE
from sklearn.manifold import TSNE

# Step 1: Reduce to 50D with PCA (speeds up t-SNE significantly)
X_pca50 = PCA(n_components=50).fit_transform(X_digits)

# Step 2: t-SNE to 2D
# perplexity: roughly = number of neighbors to consider (5-50 typical)
# Lower perplexity = focus on very local structure
# Higher perplexity = more global structure preserved
tsne   = TSNE(n_components=2, perplexity=30, random_state=42, n_iter=1000)
X_tsne = tsne.fit_transform(X_pca50)

plt.figure(figsize=(10, 8))
plt.scatter(X_tsne[:,0], X_tsne[:,1], c=digits.target, cmap='tab10', alpha=0.7)
plt.title('t-SNE Visualization of Digits Dataset (perplexity=30)')
plt.show()
```

```
# Digits 0-9 form distinct, well-separated clusters in 2D
# Note: t-SNE axes have no interpretable meaning — only cluster shape matters
```

## 12.7 — Evaluating Clustering Quality

```python
# When you have no ground-truth labels, use internal metrics
from sklearn.metrics import silhouette_score, davies_bouldin_score

# Silhouette Score: -1 to 1 (higher = better)
# Measures: how similar each point is to its OWN cluster
#           vs how similar it is to the NEAREST OTHER cluster
sil = silhouette_score(X, labels)
print(f'Silhouette Score:    {sil:.4f}  (>0.5 = good, >0.7 = excellent)')
```

```
# Silhouette Score:    0.6821
```

```python

# Davies-Bouldin Index: lower = better (0 = perfect separation)
db = davies_bouldin_score(X, labels)
print(f'Davies-Bouldin Index: {db:.4f}  (lower is better)')
```

```
# Davies-Bouldin Index: 0.4319
```

## 12.8 — Hands-On Exercises

1. Apply K-Means to the Iris dataset. Use the Elbow Method to find the best K. Compare your cluster assignments to the true 3 species labels using a confusion-matrix-style heatmap.
1. Apply both K-Means and DBSCAN to the make_moons dataset. Visualize the results side by side. Explain why K-Means fails here.
1. Use PCA on the MNIST digits dataset. Plot the cumulative explained variance curve. How many components are needed for 90%? For 99%?
1. Apply t-SNE to the CIFAR-10 dataset (load via Keras) after PCA to 50 dims. Do images of the same class cluster together in the 2D plot?

## 12.9 — Mini Project: Customer Segmentation

Using a retail customer dataset — build a customer segmentation model using RFM analysis (Recency, Frequency, Monetary):

- Calculate RFM scores: days since last purchase, number of orders, total spend
- Scale with StandardScaler
- Apply K-Means with the Elbow Method to find optimal K
- Validate with Silhouette Score
- Visualize clusters in 2D using PCA
- Profile each cluster: compute mean RFM scores per cluster
- Business output: name each segment (e.g., 'Champions', 'At Risk', 'Lost Customers')
- Deliverable: 1-page slide summarizing the segments with action recommendations

## 12.10 — Key Terms


## 12.11 — Interview Questions


### Basic

- What is the difference between supervised and unsupervised learning? Give one example of each.
- Explain how K-Means works step by step. What is inertia?
- What does 'explained variance' mean in PCA?

### Intermediate

- What are the limitations of K-Means clustering? When does it fail?
- When would you use DBSCAN instead of K-Means?
- How do you choose the number of principal components in PCA?
- What does a Silhouette Score of 0.2 tell you about your clustering?

### Advanced

- Derive PCA from first principles using eigendecomposition of the covariance matrix.
- What is the difference between PCA and t-SNE? When would you use each?
- How do you evaluate clustering quality when you have no ground-truth labels?

## 12.12 — Summary

- K-Means: fast, scalable, requires K upfront, assumes convex spherical clusters. Use Elbow Method + Silhouette Score.
- Hierarchical: no K required, produces dendrogram, computationally expensive for large datasets.
- DBSCAN: arbitrary cluster shapes, identifies noise automatically, sensitive to eps and min_samples.
- PCA: linear dimensionality reduction, fast, preserves global variance. Check cumulative explained variance curve.
- t-SNE: non-linear visualization only. Use PCA first, then t-SNE. Perplexity controls neighborhood size.
> **➡️ What's Next:** Chapter 13 covers Ensemble Methods — combining multiple models to build something more powerful than any single model. Random Forest, Gradient Boosting, and XGBoost consistently win Kaggle competitions.

---

