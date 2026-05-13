# Introduction to Full-Stack Web Development

Full-Stack Web Development means building both the **frontend** (what users see) and the **backend** (the server, database, and logic) of a web application.

## The Web Stack

```
┌─────────────────────────────────────────┐
│              CLIENT (Browser)           │
│   HTML  +  CSS  +  JavaScript           │
│   React / Vue / Angular (Frameworks)    │
└──────────────────┬──────────────────────┘
                   │ HTTP Requests
┌──────────────────▼──────────────────────┐
│              SERVER (Backend)           │
│   Node.js / Python / PHP / Ruby         │
│   REST API / GraphQL                    │
└──────────────────┬──────────────────────┘
                   │ Queries
┌──────────────────▼──────────────────────┐
│              DATABASE                   │
│   PostgreSQL / MySQL / MongoDB          │
└─────────────────────────────────────────┘
```

## Frontend Fundamentals

### HTML — Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <h1>Welcome to My Website</h1>
    <p>This is a paragraph with <strong>bold text</strong>.</p>

    <ul>
      <li>Item one</li>
      <li>Item two</li>
    </ul>

    <form action="/submit" method="POST">
      <input type="text" name="username" placeholder="Enter username">
      <button type="submit">Submit</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
</body>
</html>
```

### CSS — Styling

```css
/* Variables */
:root {
  --primary: #6366f1;
  --text: #1e293b;
  --bg: #f8fafc;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Layout with Flexbox */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Grid Layout */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
.button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### JavaScript — Interactivity

```javascript
// Modern JS (ES6+)

// Variables
const name = 'Alice';
let count = 0;

// Arrow functions
const greet = (name) => `Hello, ${name}!`;

// Async/Await
const fetchUser = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('User not found');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// DOM Manipulation
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('my-button');
  const output = document.getElementById('output');

  button.addEventListener('click', async () => {
    const user = await fetchUser(1);
    output.textContent = `Welcome, ${user.name}!`;
  });
});

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Backend with Node.js + Express

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store (use a real DB in production!)
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## HTTP Methods & REST

| Method | Action | Example |
|--------|--------|---------|
| GET | Read | `GET /api/posts` |
| POST | Create | `POST /api/posts` |
| PUT | Update (full) | `PUT /api/posts/1` |
| PATCH | Update (partial) | `PATCH /api/posts/1` |
| DELETE | Delete | `DELETE /api/posts/1` |

## Database — SQL Basics

```sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Query data
SELECT * FROM users WHERE name LIKE 'A%' ORDER BY created_at DESC;

-- Update
UPDATE users SET name = 'Alicia' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;

-- Join tables
SELECT posts.title, users.name AS author
FROM posts
JOIN users ON posts.user_id = users.id;
```

## The Development Workflow

```bash
# 1. Initialize project
mkdir my-app && cd my-app
npm init -y

# 2. Install dependencies
npm install express cors helmet dotenv
npm install -D nodemon

# 3. Project structure
my-app/
├── public/          # Static frontend files
├── src/
│   ├── routes/      # API routes
│   ├── models/      # Database models
│   ├── middleware/  # Custom middleware
│   └── app.js       # Main application
├── .env             # Environment variables (never commit!)
└── package.json

# 4. Run development server
npm run dev
```

## Summary

Full-stack development covers a wide range. Start with HTML/CSS/JS basics, then pick a backend language and a database. The concepts of HTTP, REST APIs, and databases are universal across all stacks.

**Next Lesson →** HTML & CSS in Depth
