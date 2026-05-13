# HTML & CSS In Depth

This lesson dives deeper into semantic HTML, modern CSS techniques, and responsive design.

## Semantic HTML

Semantic elements tell the browser and developer what the content **means**, not just how it looks.

```html
<!-- Non-semantic (bad practice) -->
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
  </div>
</div>

<!-- Semantic (correct) -->
<header>
  <nav aria-label="Main navigation">
    <ul role="list">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<!-- Page structure -->
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>
      <header>
        <h1>Article Title</h1>
        <time datetime="2025-01-15">January 15, 2025</time>
      </header>
      <section>...</section>
      <aside>Related content</aside>
    </article>
  </main>
  <footer>...</footer>
</body>
```

## CSS Custom Properties (Variables)

```css
:root {
  /* Color system */
  --color-primary-50: #eef2ff;
  --color-primary-500: #6366f1;
  --color-primary-900: #312e81;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #e2e8f0;
    --surface: #1e293b;
  }
}
```

## CSS Grid — Advanced Layouts

```css
/* Magazine-style layout */
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
}

.hero { grid-column: 1 / 8; grid-row: 1 / 3; }
.sidebar { grid-column: 8 / 13; grid-row: 1; }
.feature { grid-column: 8 / 13; grid-row: 2; }
.card-1 { grid-column: 1 / 5; }
.card-2 { grid-column: 5 / 9; }
.card-3 { grid-column: 9 / 13; }

/* Auto-fill responsive grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Named template areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header { grid-area: header; }
.sidebar { grid-area: sidebar; }
main { grid-area: main; }
footer { grid-area: footer; }
```

## Modern CSS Features

### Container Queries

```css
/* Respond to the size of the container, not the viewport! */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
  .card-image {
    width: 40%;
  }
}
```

### CSS Cascade Layers

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  body { font-family: var(--font-sans); }
  h1, h2, h3 { line-height: 1.2; }
}

@layer components {
  .btn { /* button styles */ }
  .card { /* card styles */ }
}
```

### CSS Animations & Keyframes

```css
/* Entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: slideInUp 0.4s ease forwards;
}

/* Staggered children */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e2e8f0;
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

## Responsive Design Patterns

```css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
    padding: 0 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}

/* Fluid typography */
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
  /* Min: 1.75rem | Preferred: viewport-based | Max: 3rem */
}

/* Fluid spacing */
.section {
  padding-block: clamp(2rem, 8vh, 6rem);
}
```

## CSS Accessibility

```css
/* Focus styles — never remove outline without a replacement */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 3px;
  border-radius: 3px;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (forced-colors: active) {
  .btn {
    border: 2px solid ButtonText;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Practice Project: Build a Card Component

```html
<article class="course-card">
  <div class="course-card__image">
    <img src="thumbnail.jpg" alt="Course thumbnail">
    <span class="course-card__badge">New</span>
  </div>
  <div class="course-card__body">
    <span class="course-card__category">Web Development</span>
    <h3 class="course-card__title">React from Zero to Hero</h3>
    <p class="course-card__description">Master modern React with hooks, context, and real projects.</p>
    <div class="course-card__meta">
      <span>⏱ 24 hours</span>
      <span>📚 48 lessons</span>
      <span>⭐ 4.9</span>
    </div>
  </div>
  <div class="course-card__footer">
    <a href="/course/react" class="btn btn-primary">Start Learning</a>
  </div>
</article>
```

## Key Takeaways

- Semantic HTML improves SEO and accessibility
- CSS Custom Properties enable consistent theming
- CSS Grid handles two-dimensional layouts; Flexbox handles one-dimensional
- Mobile-first responsive design scales up naturally
- Always design with accessibility in mind

**Next Lesson →** JavaScript — DOM & Events
