# 💳 UPI Money Manager

> An automated digital banking dashboard that ingests live UPI transaction
> alerts, categorizes spending via keyword parsing, and visualizes habits
> in real time — built with Node.js, Express, SQLite, and React.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📡 Live Transaction Stream | New alerts auto-processed every 4.5 seconds |
| 🏷️ Smart Auto-Categorization | Keyword parser tags Food, Travel, Salary |
| 📊 Animated Analytics | Real-time progress tracks per spending category |
| 💚 Cashback Detection | Reward projections on eligible transactions |
| ✏️ Manual Override | Category dropdown with optimistic UI update |
| 🗄️ Persistent Storage | SQLite — data survives server restarts |

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Backend    | Node.js + Express             |
| Database   | SQLite via better-sqlite3     |
| Frontend   | React 18 + Tailwind CSS       |
| Icons      | Lucide React                  |
| Typography | DM Sans + DM Mono             |
| Tooling    | Concurrently                  |

---

## 🚀 Run Locally

```bash
git clone https://github.com/adiraj7280/UPI-Money-Manager
cd UPI-Money-Manager
npm run install:all
npm run dev
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| API      | http://localhost:5000 |

> The SQLite database is pre-seeded. Dashboard is populated instantly.

---

## 🏗️ Architecture

```
All business logic lives exclusively on the server.
React is a pure presentation layer — fetches data, renders results.

server/parser.js    ← pure fn: raw string → transaction object
server/reducer.js   ← pure fn: transactions[] → summary metrics
server/store.js     ← DB API: getAll / getById / push / updateCategory
server/db/          ← SQLite connection, migrations, seed
client/src/hooks/   ← all network calls isolated from components
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/transactions | All transactions (newest first) |
| GET    | /api/summary | Category spend metrics |
| PATCH  | /api/transactions/:id/category | Update category |

---

## 📁 Project Structure

```
upi-money-manager/
├── server/
│   ├── db/              SQLite layer
│   ├── parser.js        Keyword tagger + cashback detector
│   ├── reducer.js       Cumulative metric aggregator
│   └── store.js         DB-backed store API
└── client/src/
    ├── hooks/           All fetch + polling logic
    ├── components/      Pure presentational components
    └── utils/           timeAgo, formatAmount, categoryConfig
```
