// ─── routes.js ───────────────────────────────────────────────────────────────
// Thin routing layer. Route definitions only — all logic lives in handlers.js.
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const { getTransactions, getSummary, patchCategory } = require("./handlers");

const router = express.Router();

router.get("/transactions", getTransactions);
router.get("/summary", getSummary);
router.patch("/transactions/:id/category", patchCategory);

module.exports = router;
