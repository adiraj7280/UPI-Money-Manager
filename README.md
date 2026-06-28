# 💳 UPI Money Manager

> An automated digital banking dashboard that ingests live UPI transaction
> alerts, categorizes spending via keyword parsing, and visualizes habits
> in real time — built with Node.js, Express, SQLite, and React.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📡 Realistic Simulation Engine | Live stream with time-of-day constraints, dynamic jitter (2.5s-10.5s), and transaction bursts |
| 🏷️ Smart Auto-Categorization | 9 distinct categories (Food, Travel, Salary, Groceries, Utilities, Shopping, Entertainment, Healthcare, Misc) |
| 🔍 Advanced Regex Parsing | Extracts VPA, Bank References (RRN), and Account strings from authentic bank SMS templates |
| 📊 Human-Centric Analytics | Animated progress tracks dynamically mapping spend against max category values |
| 📅 Chronological Grouping | Intelligent feed rendering by Date (Today, Yesterday, etc.) |
| 🔎 Instant Search & Filter | Filter the live transaction feed by VPA, RRN, Merchant, or Category instantly |
| ⚡ DOM Capping | UI optimized for massive streams by virtually capping feed length (Max 50) |
| 🗄️ Persistent Storage | SQLite schema with auto-migrations — data survives server restarts |

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

> The SQLite database is pre-seeded with over 200 authentic transactions. The live simulator continues to push realistic data instantly upon boot.

---

## 🏗️ Architecture

```text
All business logic lives exclusively on the server.
React is a pure presentation layer — fetches data, renders results.

server/parser.js    ← pure fn: Regex extraction (VPA/RRN) + Cashback detection
server/reducer.js   ← pure fn: transactions[] → summary metrics
server/index.js     ← Authentic human simulation engine (Jitter + Bursts)
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

```text
upi-money-manager/
├── server/
│   ├── db/              SQLite layer (Migrations, Seeding)
│   ├── parser.js        Keyword tagger + metadata extractor
│   ├── reducer.js       Cumulative metric aggregator
│   └── store.js         DB-backed store API
└── client/src/
    ├── hooks/           All fetch + polling logic
    ├── components/      Presentation components (Search, Feed, Analytics)
    └── utils/           timeAgo, formatAmount, categoryConfig
```
