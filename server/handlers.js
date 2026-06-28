// ─── handlers.js ─────────────────────────────────────────────────────────────
// Request/response logic only. Delegates to parser, store, and reducer.
// Every handler is wrapped in try/catch for uniform error handling.
// ─────────────────────────────────────────────────────────────────────────────

const store = require("./store");
const { computeSummary } = require("./reducer");
const { CATEGORIES } = require("./constants");

const isDev = process.env.NODE_ENV !== "production";

/**
 * Structured error logger — only logs in non-production environments.
 */
function logError(context, err) {
  if (isDev) {
    console.error(`[ERROR] ${context}:`, err.message || err);
  }
}

// ─── GET /api/transactions ───────────────────────────────────────────────────
// Returns all transactions sorted newest-first by timestamp.
function getTransactions(_req, res) {
  try {
    const transactions = store.getAll();
    return res.json({ transactions });
  } catch (err) {
    logError("getTransactions", err);
    return res.status(500).json({ error: "Failed to retrieve transactions", code: 500 });
  }
}

// ─── GET /api/summary ────────────────────────────────────────────────────────
// Delegates entirely to computeSummary — no inline reduction logic.
function getSummary(_req, res) {
  try {
    const transactions = store.getAll();
    const summary = computeSummary(transactions);
    return res.json(summary);
  } catch (err) {
    logError("getSummary", err);
    return res.status(500).json({ error: "Failed to compute summary", code: 500 });
  }
}

// ─── PATCH /api/transactions/:id/category ────────────────────────────────────
// Validates category enum, finds transaction, updates, returns tx + summary.
function patchCategory(req, res) {
  try {
    const { id } = req.params;
    const { category } = req.body || {};

    // ── Validate category enum ───────────────────────────────────────────────
    if (!category || !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Invalid category value", code: 400 });
    }

    // ── Update ───────────────────────────────────────────────────────────────
    const tx = store.updateCategory(id, category);

    // Return updated transaction + fresh summary in one call
    const transactions = store.getAll();
    const summary = computeSummary(transactions);
    return res.json({ transaction: tx, summary });
  } catch (err) {
    logError("patchCategory", err);
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message, code: 404 });
    }
    if (err.message.includes('Invalid category') || err.message.includes('SQLITE_CONSTRAINT')) {
      return res.status(400).json({ error: err.message, code: 400 });
    }
    return res.status(500).json({ error: "Failed to update category", code: 500 });
  }
}

module.exports = {
  getTransactions,
  getSummary,
  patchCategory,
};
