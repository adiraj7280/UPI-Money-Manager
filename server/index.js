// ─── index.js ────────────────────────────────────────────────────────────────
// Server entry point. Responsibilities:
//   1. Express app setup + middleware
//   2. Mount API routes
//   3. Global error handling middleware
//   4. Start the live transaction stream (setInterval)
//   5. Listen on port 5000
// No business logic lives here.
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const store = require("./store");
const { parseTransaction } = require("./parser");
const { ALERT_POOL, STREAM_INTERVAL_MS } = require("./constants");
const { runMigrations } = require("./db/migrations");
const { runSeed } = require("./db/seed");

const app = express();
const PORT = 5000;

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────────────

app.use("/api", routes);

// ─── Error Handling Middleware ───────────────────────────────────────────────

// Catch malformed JSON bodies (express.json() parse failures)
app.use((err, _req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON in request body", code: 400 });
  }
  next(err);
});

// 404 for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found", code: 404 });
});

// ─── Live Transaction Stream ────────────────────────────────────────────────

/**
 * Pick a random element from an array.
 */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a random UPI-realistic amount between 50 and 5000.
 * Weighted toward smaller amounts: uses a square-root distribution so
 * values cluster in the 50–1000 range (~70% of outputs) while still
 * occasionally producing amounts up to 5000.
 */
function randomAmount() {
  const min = 50;
  const max = 5000;
  // sqrt weighting: random^2 compresses toward 0, so (1 - random^2) * range
  // produces a right-skewed distribution favouring smaller values.
  const weighted = Math.pow(Math.random(), 2);
  return Math.round(min + weighted * (max - min));
}

/**
 * Tick: pick a random alert template, inject a random amount, parse it,
 * and push the resulting transaction into the in-memory store.
 */
function streamTick() {
  try {
    const amount = randomAmount();
    const template = pickRandom(ALERT_POOL);
    const raw = template.replace("{amount}", amount.toLocaleString("en-IN"));
    const transaction = parseTransaction(raw, amount);
    store.push(transaction);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[STREAM] tick error:", err.message);
    }
  }
}

function startStream() {
  setInterval(streamTick, STREAM_INTERVAL_MS);
}

// ─── Start ──────────────────────────────────────────────────────────────────

runMigrations();
runSeed();
startStream();

app.listen(PORT, () => {
  console.log(`📡 Live transaction stream active — interval: ${STREAM_INTERVAL_MS}ms`);
  console.log(`🚀 UPI Money Manager running on port ${PORT}`);
});
