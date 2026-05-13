/**
 * app.js — Main Application
 * Handles routing, rendering, search, and UI logic.
 */

import COURSES from './courses.js';
import { markComplete, markIncomplete, isCompleted, getCourseProgress, getOverallStats, resetAllProgress } from './progress.js';

// ─── State ──────────────────────────────────────────────────────────────────

const state = {
  view: 'home',         // 'home' | 'course' | 'lesson'
  courseId: null,
  lessonId: null,
  searchQuery: '',
  tocOpen: false,
};

// ─── Router ──────────────────────────────────────────────────────────────────

function navigate(params) {
  Object.assign(state, params);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  state.view = params.get('view') || 'home';
  state.courseId = params.get('course') || null;
  state.lessonId = params.get('lesson') || null;
  render();
});

function pushHistory() {
  const params = new URLSearchParams();
  if (state.view !== 'home') params.set('view', state.view);
  if (state.courseId) params.set('course', state.courseId);
  if (state.lessonId) params.set('lesson', state.lessonId);
  const url = params.toString() ? `?${params}` : window.location.pathname;
  window.history.pushState({}, '', url);
}

// ─── Dark Mode ───────────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('learnhub_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('learnhub_theme', next);
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
}

// ─── Markdown Loader ─────────────────────────────────────────────────────────

async function loadMarkdown(filePath) {
  const container = document.getElementById('lesson-content');
  container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading lesson…</p></div>';
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return text;
  } catch (err) {
    return `# Error Loading Lesson\n\nCould not load \`${filePath}\`.\n\n**Make sure you are running this via a local server** (not by opening the HTML file directly).\n\n\`\`\`\nError: ${err.message}\n\`\`\``;
  }
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function buildTOC(htmlContent) {
  const temp = document.createElement('div');
  temp.innerHTML = htmlContent;
  const headings = temp.querySelectorAll('h2, h3');
  if (headings.length === 0) return null;

  const items = Array.from(headings).map((h, i) => {
    const level = parseInt(h.tagName[1]);
    const id = `heading-${i}`;
    h.id = id;
    return { id, text: h.textContent, level };
  });

  return { items, html: temp.innerHTML };
}

function renderTOC(items) {
  if (!items || items.length === 0) return '';
  return `
    <nav class="toc" id="toc" aria-label="Table of contents">
      <div class="toc-header">
        <span>📋 Contents</span>
        <button class="toc-close" onclick="toggleTOC()" aria-label="Close contents">×</button>
      </div>
      <ul>
        ${items.map(item => `
          <li class="toc-item toc-level-${item.level}">
            <a href="#${item.id}" onclick="closeTOC()">${item.text}</a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

window.toggleTOC = () => {
  const toc = document.getElementById('toc');
  if (toc) toc.classList.toggle('toc-open');
};
window.closeTOC = () => {
  const toc = document.getElementById('toc');
  if (toc) toc.classList.remove('toc-open');
};

// ─── Search ──────────────────────────────────────────────────────────────────

function getSearchResults(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];
  for (const course of Object.values(COURSES)) {
    for (const lesson of course.lessons) {
      if (
        lesson.title.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q) ||
        lesson.difficulty?.toLowerCase().includes(q) ||
        course.tags?.some(t => t.toLowerCase().includes(q))
      ) {
        results.push({ course, lesson });
      }
    }
  }
  return results;
}

// ─── Views ───────────────────────────────────────────────────────────────────

function renderHeader() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="logo" href="#" onclick="navigate({view:'home',courseId:null,lessonId:null});return false;">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">LearnHub</span>
        </a>
        <div class="header-search">
          <input
            type="search"
            id="search-input"
            class="search-input"
            placeholder="Search lessons…"
            value="${state.searchQuery}"
            aria-label="Search lessons"
          >
          <span class="search-icon">🔍</span>
          <div class="search-results" id="search-results"></div>
        </div>
        <nav class="header-nav">
          ${Object.values(COURSES).map(c => `
            <a href="#" class="nav-link ${state.courseId === c.id ? 'active' : ''}"
               onclick="navigate({view:'course',courseId:'${c.id}',lessonId:null});return false;">
              ${c.icon} ${c.title}
            </a>
          `).join('')}
        </nav>
        <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode">
          ${isDark ? '☀️' : '🌙'}
        </button>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu" onclick="toggleMobileMenu()">☰</button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        ${Object.values(COURSES).map(c => `
          <a href="#" class="mobile-nav-link"
             onclick="navigate({view:'course',courseId:'${c.id}',lessonId:null});closeMobileMenu();return false;">
            ${c.icon} ${c.title}
          </a>
        `).join('')}
        <div class="mobile-search">
          <input type="search" class="search-input" placeholder="Search lessons…" oninput="handleMobileSearch(this.value)">
        </div>
      </div>
    </header>
  `;
}

window.toggleMobileMenu = () => document.getElementById('mobile-menu')?.classList.toggle('open');
window.closeMobileMenu = () => document.getElementById('mobile-menu')?.classList.remove('open');
window.handleMobileSearch = (q) => {
  state.searchQuery = q;
  showSearchResults(q, document.querySelector('.mobile-search'));
};

function renderHomePage() {
  const stats = getOverallStats(COURSES);
  return `
    <div class="home-page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">🚀 Start Learning Today</div>
          <h1 class="hero-title">Level up your<br><span class="gradient-text">tech skills</span></h1>
          <p class="hero-subtitle">
            Structured courses in Data Science, Cybersecurity, Machine Learning, and Full-Stack Development.
            Learn at your own pace with hands-on lessons and real code examples.
          </p>
          ${stats.completed > 0 ? `
            <div class="hero-progress">
              <div class="hero-progress-bar">
                <div class="hero-progress-fill" style="width:${stats.percent}%"></div>
              </div>
              <span>${stats.completed} of ${stats.total} lessons completed (${stats.percent}%)</span>
            </div>
          ` : ''}
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="document.querySelector('.courses-grid').scrollIntoView({behavior:'smooth'})">
              Browse Courses
            </button>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="code-preview">
            <div class="code-preview-bar">
              <span></span><span></span><span></span>
            </div>
            <pre><code><span class="c-kw">import</span> numpy <span class="c-kw">as</span> np
<span class="c-kw">from</span> sklearn.ensemble <span class="c-kw">import</span> RandomForestClassifier

model = RandomForestClassifier(
  n_estimators=<span class="c-num">100</span>,
  max_depth=<span class="c-num">6</span>
)
model.fit(X_train, y_train)
<span class="c-fn">print</span>(<span class="c-str">f"Accuracy: {model.score(X_test, y_test):.2%}"</span>)</code></pre>
          </div>
        </div>
      </section>

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item"><strong>${Object.keys(COURSES).length}</strong> Courses</div>
        <div class="stat-item"><strong>${Object.values(COURSES).reduce((s,c) => s + c.lessons.length, 0)}</strong> Lessons</div>
        <div class="stat-item"><strong>Free</strong> Forever</div>
        <div class="stat-item"><strong>Open Source</strong> Content</div>
      </div>

      <!-- Course Cards -->
      <section class="courses-section">
        <h2 class="section-title">Choose Your Path</h2>
        <div class="courses-grid">
          ${Object.values(COURSES).map(course => {
            const prog = getCourseProgress(course.id, course.lessons.length);
            return `
              <article class="course-card" onclick="navigate({view:'course',courseId:'${course.id}',lessonId:null})" role="button" tabindex="0"
                       onkeydown="if(event.key==='Enter')navigate({view:'course',courseId:'${course.id}',lessonId:null})">
                <div class="course-card-header" style="background:${course.gradient}">
                  <span class="course-icon">${course.icon}</span>
                  ${prog.completed > 0 ? `<span class="course-badge">${prog.percent}%</span>` : ''}
                </div>
                <div class="course-card-body">
                  <h3>${course.title}</h3>
                  <p>${course.description}</p>
                  <div class="course-tags">
                    ${course.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                  </div>
                  <div class="course-meta">
                    <span>📚 ${course.lessons.length} lessons</span>
                    ${prog.completed > 0 ? `
                      <div class="mini-progress">
                        <div class="mini-progress-fill" style="width:${prog.percent}%;background:${course.color}"></div>
                      </div>
                      <span>${prog.completed}/${prog.total}</span>
                    ` : ''}
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderCoursePage() {
  const course = COURSES[state.courseId];
  if (!course) return '<div class="error">Course not found.</div>';

  return `
    <div class="course-page">
      <div class="course-hero" style="background:${course.gradient}">
        <div class="course-hero-content">
          <a href="#" class="back-link" onclick="navigate({view:'home',courseId:null,lessonId:null});return false;">← All Courses</a>
          <div class="course-hero-icon">${course.icon}</div>
          <h1>${course.title}</h1>
          <p>${course.description}</p>
          <div class="course-tags">
            ${course.tags.map(t => `<span class="tag tag-light">${t}</span>`).join('')}
          </div>
          ${(() => {
            const prog = getCourseProgress(course.id, course.lessons.length);
            return prog.completed > 0 ? `
              <div class="course-progress-bar-wrap">
                <div class="course-progress-bar">
                  <div class="course-progress-fill" style="width:${prog.percent}%"></div>
                </div>
                <span>${prog.completed} / ${prog.total} lessons completed</span>
              </div>
            ` : '';
          })()}
        </div>
      </div>

      <div class="lessons-container">
        <h2>Lessons</h2>
        <ul class="lessons-list">
          ${course.lessons.map((lesson, i) => {
            const done = isCompleted(course.id, lesson.id);
            return `
              <li class="lesson-item ${done ? 'completed' : ''}">
                <button class="lesson-btn" onclick="navigate({view:'lesson',courseId:'${course.id}',lessonId:'${lesson.id}'})">
                  <span class="lesson-num">${done ? '✓' : String(i + 1).padStart(2, '0')}</span>
                  <div class="lesson-info">
                    <span class="lesson-title">${lesson.title}</span>
                    <div class="lesson-meta">
                      <span class="difficulty difficulty-${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>
                      <span>⏱ ${lesson.duration}</span>
                    </div>
                  </div>
                  <span class="lesson-arrow">→</span>
                </button>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    </div>
  `;
}

async function renderLessonPage() {
  const course = COURSES[state.courseId];
  const lesson = course?.lessons.find(l => l.id === state.lessonId);
  if (!course || !lesson) return '<div class="error">Lesson not found.</div>';

  const lessonIndex = course.lessons.indexOf(lesson);
  const prevLesson = course.lessons[lessonIndex - 1] || null;
  const nextLesson = course.lessons[lessonIndex + 1] || null;
  const done = isCompleted(course.id, lesson.id);

  return `
    <div class="lesson-page">
      <aside class="lesson-sidebar">
        <div class="sidebar-header">
          <a href="#" class="back-link" onclick="navigate({view:'course',courseId:'${course.id}',lessonId:null});return false;">
            ← ${course.title}
          </a>
        </div>
        <ul class="sidebar-lessons">
          ${course.lessons.map((l, i) => {
            const lDone = isCompleted(course.id, l.id);
            return `
              <li>
                <button class="sidebar-lesson-btn ${l.id === state.lessonId ? 'active' : ''} ${lDone ? 'completed' : ''}"
                        onclick="navigate({view:'lesson',courseId:'${course.id}',lessonId:'${l.id}'})">
                  <span class="sidebar-num">${lDone ? '✓' : i + 1}</span>
                  <span>${l.title}</span>
                </button>
              </li>
            `;
          }).join('')}
        </ul>
      </aside>

      <main class="lesson-main">
        <div class="lesson-header">
          <div class="lesson-breadcrumb">
            <a href="#" onclick="navigate({view:'home'});return false;">Home</a> /
            <a href="#" onclick="navigate({view:'course',courseId:'${course.id}'});return false;">${course.title}</a> /
            <span>${lesson.title}</span>
          </div>
          <div class="lesson-actions">
            <button class="btn btn-toc" id="toc-btn" onclick="toggleTOC()" title="Table of Contents">📋 Contents</button>
            <button class="btn ${done ? 'btn-done' : 'btn-primary'}" id="complete-btn"
                    onclick="toggleComplete('${course.id}', '${lesson.id}')">
              ${done ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        <div id="toc-container"></div>
        <article id="lesson-content" class="lesson-content">
          <div class="loading-spinner"><div class="spinner"></div><p>Loading…</p></div>
        </article>

        <div class="lesson-nav">
          ${prevLesson ? `
            <button class="btn btn-outline" onclick="navigate({view:'lesson',courseId:'${course.id}',lessonId:'${prevLesson.id}'})">
              ← ${prevLesson.title}
            </button>
          ` : '<div></div>'}
          ${nextLesson ? `
            <button class="btn btn-primary" onclick="navigate({view:'lesson',courseId:'${course.id}',lessonId:'${nextLesson.id}'})">
              ${nextLesson.title} →
            </button>
          ` : '<div></div>'}
        </div>
      </main>
    </div>
  `;
}

window.toggleComplete = (courseId, lessonId) => {
  const done = isCompleted(courseId, lessonId);
  if (done) {
    markIncomplete(courseId, lessonId);
  } else {
    markComplete(courseId, lessonId);
    // Celebrate!
    showToast('🎉 Lesson completed!');
  }
  // Update the button without re-rendering the whole page
  const btn = document.getElementById('complete-btn');
  if (btn) {
    const nowDone = isCompleted(courseId, lessonId);
    btn.textContent = nowDone ? '✓ Completed' : 'Mark Complete';
    btn.className = `btn ${nowDone ? 'btn-done' : 'btn-primary'}`;
  }
  // Update sidebar checkmarks
  document.querySelectorAll('.sidebar-lesson-btn').forEach(el => {
    const lId = el.getAttribute('data-lesson-id');
    if (lId === lessonId) {
      el.classList.toggle('completed', isCompleted(courseId, lessonId));
    }
  });
};

// ─── Toast Notification ──────────────────────────────────────────────────────

function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Search Functionality ─────────────────────────────────────────────────────

function showSearchResults(query, container) {
  const resultsEl = container?.querySelector('#search-results') || document.getElementById('search-results');
  if (!resultsEl) return;

  if (!query.trim()) {
    resultsEl.innerHTML = '';
    resultsEl.classList.remove('open');
    return;
  }

  const results = getSearchResults(query);
  if (results.length === 0) {
    resultsEl.innerHTML = '<div class="search-empty">No results found</div>';
    resultsEl.classList.add('open');
    return;
  }

  resultsEl.innerHTML = results.map(({ course, lesson }) => `
    <button class="search-result-item" onclick="navigate({view:'lesson',courseId:'${course.id}',lessonId:'${lesson.id}'});closeSearch()">
      <span class="search-result-icon">${course.icon}</span>
      <div>
        <div class="search-result-title">${lesson.title}</div>
        <div class="search-result-course">${course.title} · ${lesson.difficulty}</div>
      </div>
    </button>
  `).join('');
  resultsEl.classList.add('open');
}

window.closeSearch = () => {
  const el = document.getElementById('search-results');
  if (el) { el.innerHTML = ''; el.classList.remove('open'); }
  const input = document.getElementById('search-input');
  if (input) input.value = '';
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-search')) window.closeSearch();
});

// ─── Main Render ──────────────────────────────────────────────────────────────

async function render() {
  pushHistory();

  const app = document.getElementById('app');
  let content = '';

  if (state.view === 'home') {
    content = renderHomePage();
  } else if (state.view === 'course') {
    content = renderCoursePage();
  } else if (state.view === 'lesson') {
    content = await renderLessonPage();
  }

  app.innerHTML = renderHeader() + `<div class="page-content">${content}</div>`;
  attachSearchListener();

  // Load markdown for lesson view
  if (state.view === 'lesson') {
    const course = COURSES[state.courseId];
    const lesson = course?.lessons.find(l => l.id === state.lessonId);
    if (lesson) {
      const markdown = await loadMarkdown(lesson.file);
      const parsed = marked.parse(markdown);
      const { items, html } = buildTOC(parsed) || { items: [], html: parsed };

      const contentEl = document.getElementById('lesson-content');
      if (contentEl) contentEl.innerHTML = html;

      const tocContainer = document.getElementById('toc-container');
      if (tocContainer && items.length > 0) {
        tocContainer.innerHTML = renderTOC(items);
      }

      // Syntax highlight all code blocks
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }
}

function attachSearchListener() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', (e) => {
    showSearchResults(e.target.value);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeSearch();
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

window.navigate = navigate;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  // Restore state from URL
  const params = new URLSearchParams(window.location.search);
  state.view = params.get('view') || 'home';
  state.courseId = params.get('course') || null;
  state.lessonId = params.get('lesson') || null;

  render();
});
