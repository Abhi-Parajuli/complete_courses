# ⚡ LearnHub

A modern, local-first learning platform for tech skills. No backend, no build tools, no dependencies to install. Just open and learn.

---

## 🚀 Quick Start

**Option 1 — Python (easiest, comes pre-installed):**
```bash
cd learnhub
python serve.py
```
Then open: **http://localhost:8080**

**Option 2 — Node.js:**
```bash
cd learnhub
npx serve .
```

**Option 3 — VS Code:**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and click **Open with Live Server**.

> ⚠️ **Important:** You must use a local server. Opening `index.html` directly as a `file://` URL won't work because ES modules and `fetch()` are blocked by browser security policies.

---

## 📁 Project Structure

```
learnhub/
│
├── index.html              # App entry point
├── serve.py                # Local dev server (Python)
│
├── css/
│   └── style.css           # All styles (light/dark mode, responsive)
│
├── js/
│   ├── app.js              # Main application logic, routing, rendering
│   ├── courses.js          # Course registry — add/edit courses here
│   └── progress.js         # Progress tracking (localStorage)
│
└── courses/
    ├── datascience/
    │   ├── 01-intro-to-data-science.md
    │   └── 02-python-for-data-science.md
    │
    ├── cybersecurity/
    │   ├── 01-intro-to-cybersecurity.md
    │   └── 02-networking-fundamentals.md
    │
    ├── ml/
    │   ├── 01-intro-to-ml.md
    │   └── 02-supervised-learning.md
    │
    └── webdev/
        ├── 01-intro-to-fullstack.md
        └── 02-html-css-in-depth.md
```

---

## ✏️ Adding Your Own Lessons

### Step 1 — Create a Markdown file

Drop a `.md` file in the appropriate course folder:

```
courses/datascience/03-my-new-lesson.md
```

Write standard Markdown — headings, code blocks, tables, blockquotes all work.

### Step 2 — Register it in `js/courses.js`

Find your course and add an entry to the `lessons` array:

```js
{
  id: 'my-new-lesson',          // Unique ID (use dashes, no spaces)
  title: 'My New Lesson',       // Display name
  file: 'courses/datascience/03-my-new-lesson.md',  // Path to the file
  duration: '20 min',           // Estimated reading time
  difficulty: 'Beginner',       // Beginner | Intermediate | Advanced
}
```

That's it! Refresh the page and your lesson appears.

---

## ➕ Adding a New Course

In `js/courses.js`, add a new key to the `COURSES` object:

```js
devops: {
  id: 'devops',
  title: 'DevOps & Cloud',
  icon: '☁️',
  color: '#f59e0b',
  gradient: 'linear-gradient(135deg, #d97706 0%, #7c3aed 100%)',
  description: 'Learn CI/CD, Docker, Kubernetes, and cloud platforms.',
  tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  lessons: [
    {
      id: 'intro-to-devops',
      title: 'Introduction to DevOps',
      file: 'courses/devops/01-intro-to-devops.md',
      duration: '20 min',
      difficulty: 'Beginner',
    },
  ],
},
```

Then create `courses/devops/01-intro-to-devops.md`.

---

## 🌙 Features

| Feature | Details |
|---------|---------|
| **Dark / Light Mode** | Toggle in header, remembers preference |
| **Progress Tracking** | Per-lesson completion, stored in browser |
| **Search** | Searches titles, course names, tags |
| **Table of Contents** | Auto-generated from Markdown `##` headings |
| **Syntax Highlighting** | Python, JS, SQL, Bash, CSS via Highlight.js |
| **Responsive** | Works on mobile, tablet, and desktop |
| **No Build Step** | Pure HTML + CSS + vanilla JS (ES modules) |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styles | Vanilla CSS (custom properties, grid, flexbox) |
| Scripts | Vanilla JavaScript ES Modules |
| Markdown | [marked.js](https://marked.js.org/) v9 |
| Syntax Highlighting | [Highlight.js](https://highlightjs.org/) v11 |
| Fonts | Sora + IBM Plex Mono (Google Fonts) |
| Storage | Browser localStorage |
| Server | Python `http.server` (dev only) |

---

## 📝 Markdown Tips

Your `.md` files support full GitHub Flavored Markdown:

```markdown
# H1 — Page title
## H2 — Section (added to Table of Contents)
### H3 — Subsection (also in TOC)

**bold**, *italic*, `inline code`

> Blockquote for callouts and quotes

| Col 1 | Col 2 |
|-------|-------|
| A     | B     |

```python
# Code blocks with syntax highlighting
def hello():
    print("Hello, world!")
```
```

---

## 🗂️ Recommended Lesson File Naming

Use a numeric prefix to keep lessons in order:

```
01-intro.md
02-basics.md
03-advanced.md
```

The numbers aren't shown in the UI — they just sort your files correctly in your file system.

---

## 📄 License

MIT — Free for personal and educational use.
