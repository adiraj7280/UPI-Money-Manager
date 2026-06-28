// ─── reducer.js ──────────────────────────────────────────────────────────────
// Pure function. Never mutates input. Handles empty arrays gracefully.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * computeSummary(transactions) → Summary
 *
 * Cumulative metric reducer.
 *   - Credits → "Salary" category sum.
 *   - Debits  → their tagged category sum.
 *   - maxCategoryValue floors at 1 to prevent division-by-zero on frontend.
 *
 * Guarantees:
 *   - Never mutates the input array.
 *   - Returns zeroes (not NaN) on empty input.
 *   - Credits and debits are isolated BEFORE any category summation.
 *
 * @param  {Array}  transactions  Array of transaction objects.
 * @returns {object} { totalCredit, totalDebit, byCategory, maxCategoryValue }
 */
function computeSummary(transactions) {
  const byCategory = {
    "Food & Dining": 0,
    Travel: 0,
    Salary: 0,
    Miscellaneous: 0,
  };

  let totalCredit = 0;
  let totalDebit = 0;

  // Guard: handle null / undefined / non-array input
  if (!Array.isArray(transactions)) {
    return { totalCredit: 0, totalDebit: 0, byCategory, maxCategoryValue: 1 };
  }

  // ── Isolate credits from debits, then sum per-category ─────────────────────
  for (const tx of transactions) {
    if (!tx || typeof tx.amount !== "number") continue;

    if (tx.type === "credit") {
      totalCredit += tx.amount;
      byCategory["Salary"] += tx.amount;
    } else {
      totalDebit += tx.amount;
      // Guard: unknown category falls into Miscellaneous
      if (byCategory.hasOwnProperty(tx.category)) {
        byCategory[tx.category] += tx.amount;
      } else {
        byCategory["Miscellaneous"] += tx.amount;
      }
    }
  }

  // Floor at 1 — prevents division-by-zero when frontend calculates percentages
  const maxCategoryValue = Math.max(...Object.values(byCategory), 1);

  return {
    totalCredit,
    totalDebit,
    byCategory,
    maxCategoryValue,
  };
}

module.exports = { computeSummary };
