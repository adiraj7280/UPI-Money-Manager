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
const { SIMULATION_TEMPLATES, STREAM_INTERVAL_MS } = require("./constants");
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
 * Generate an amount based on the template's constraints.
 */
function getRealisticAmount(config) {
  if (config.exactAmounts) {
    return pickRandom(config.exactAmounts);
  } else if (config.amountRange) {
    const [min, max] = config.amountRange;
    // Slightly right-skewed distribution
    const weighted = Math.pow(Math.random(), 1.5);
    return Math.round(min + weighted * (max - min));
  }
  return 500; // fallback
}

let burstMode = false;
let burstCount = 0;

/**
 * Tick: pick a random template valid for the current hour, inject a realistic
 * amount, parse it, and push the resulting transaction into the in-memory store.
 */
function streamTick() {
  try {
    const currentHour = new Date().getHours();
    
    // Filter templates valid for this hour
    let validTemplates = SIMULATION_TEMPLATES.filter(t => t.validHours.includes(currentHour));
    if (validTemplates.length === 0) validTemplates = SIMULATION_TEMPLATES; // fallback

    const config = pickRandom(validTemplates);
    const amount = getRealisticAmount(config);
    
    const raw = config.template.replace("{amount}", amount.toLocaleString("en-IN"));
    const transaction = parseTransaction(raw, amount);
    store.push(transaction);

    if (burstMode && burstCount > 0) {
      burstCount--;
      if (burstCount <= 0) burstMode = false;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[STREAM] tick error:", err.message);
    }
  }
}

function startStream() {
  function scheduleNext() {
    let nextInterval;
    
    if (burstMode) {
      // Very fast interval for bursts
      nextInterval = Math.random() * 400 + 100; 
    } else {
      // Random jitter around the base interval
      const jitter = (Math.random() * 8000) - 2000;
      nextInterval = Math.max(2000, STREAM_INTERVAL_MS + jitter);
      
      // 5% chance to trigger a sudden burst of transactions
      if (Math.random() < 0.05) {
        burstMode = true;
        burstCount = Math.floor(Math.random() * 4) + 2; // 2 to 5 rapid transactions
      }
    }
    
    setTimeout(() => {
      streamTick();
      scheduleNext();
    }, nextInterval);
  }
  scheduleNext();
}

// ─── Start ──────────────────────────────────────────────────────────────────

runMigrations();
runSeed();
startStream();

app.listen(PORT, () => {
  console.log(`📡 Live transaction stream active — base interval: ${STREAM_INTERVAL_MS}ms (jitterized)`);
  console.log(`🚀 UPI Money Manager running on port ${PORT}`);
});
