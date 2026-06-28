const { v4: uuidv4 } = require("uuid");
const {
  KEYWORD_MAP,
  CASHBACK_KEYWORDS,
  DEBIT_INDICATORS,
  CREDIT_INDICATORS,
} = require("./constants");

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract a proper-noun merchant/sender name from the raw alert string.
 *
 * Heuristic:
 *   1. Look for "to <Name>", "from <Name>", "for <Name>" where Name starts
 *      with an uppercase letter followed by more capitalised words.
 *   2. Fallback: same prepositions but case-insensitive, take up to 4 tokens.
 *   3. Final fallback: raw string trimmed to 40 characters.
 *
 * @param  {string} raw
 * @returns {string}
 */
function extractName(raw) {
  if (!raw) return "Unknown";

  const patterns = [
    /(?:to|from|for)\s+([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*)/,
    /(?:to|from|for)\s+(\S+(?:\s+\S+){0,3})/i,
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/[.,;:!?]+$/, "").trim();
    }
  }
  return raw.substring(0, 40).trim() || "Unknown";
}

// ─── Main Parser ─────────────────────────────────────────────────────────────

/**
 * parseTransaction(raw, amount) → Transaction
 *
 * Pure-ish function (only side effects are uuid + timestamp generation).
 * Does NOT import or mutate the store.
 *
 * Pipeline:
 *   1. Direction detection  (debit / credit)
 *   2. Description formatting
 *   3. Keyword category tagging
 *   4. Cashback detection  (independent, runs AFTER category)
 *
 * Edge-case handling:
 *   - Empty raw string → defaults to "debit", description uses "Unknown"
 *   - Zero / negative amount → coerced to Math.abs, floor 0
 *   - Unrecognised keywords → category "Miscellaneous", autoTagged false
 *
 * @param  {string} raw    Original alert text as received.
 * @param  {number} amount Positive magnitude (will be abs'd if negative).
 * @returns {object}       Complete transaction object ready for storage.
 */
function parseTransaction(raw, amount) {
  // ── Normalise inputs ───────────────────────────────────────────────────────
  const safeRaw = typeof raw === "string" ? raw : "";
  const safeAmount = Math.abs(Number(amount)) || 0;
  const lower = safeRaw.toLowerCase();

  // ── 1. Direction detection ─────────────────────────────────────────────────
  const isDebit = DEBIT_INDICATORS.some((kw) => lower.includes(kw));
  const isCredit = CREDIT_INDICATORS.some((kw) => lower.includes(kw));

  let type;
  if (isDebit && !isCredit) {
    type = "debit";
  } else if (isCredit && !isDebit) {
    type = "credit";
  } else if (isDebit && isCredit) {
    // Ambiguous — "debited" takes precedence (more explicit UPI phrasing)
    type = "debit";
  } else {
    // No direction keywords at all — assume debit (most UPI alerts are debits)
    type = "debit";
  }

  // ── 2. Description ────────────────────────────────────────────────────────
  const name = extractName(safeRaw);
  const formattedAmt = safeAmount.toLocaleString("en-IN");
  const description =
    type === "debit"
      ? `Paid Rs. ${formattedAmt} to ${name}`
      : `Received Rs. ${formattedAmt} from ${name}`;

  // ── 3. Category tagging (runs BEFORE cashback) ─────────────────────────────
  let category = "Miscellaneous";
  let autoTagged = false;

  for (const mapping of KEYWORD_MAP) {
    if (mapping.keywords.some((kw) => lower.includes(kw))) {
      category = mapping.category;
      autoTagged = true;
      break;
    }
  }

  // ── 4. Cashback detection (independent, runs AFTER category) ───────────────
  let cashbackRow = false;
  let expectedSavings = null;

  if (type === "debit") {
    const hasCashbackKeyword = CASHBACK_KEYWORDS.some((kw) =>
      lower.includes(kw)
    );
    if (hasCashbackKeyword) {
      cashbackRow = true;
      expectedSavings = Math.round(safeAmount * 0.02);
    }
  }

  // ── 5. Real-World Metadata Extraction ──────────────────────────────────────
  let vpa = null;
  let rrn = null;
  let bankAccount = null;

  // VPA match: basic email-like structure with @
  const vpaMatch = safeRaw.match(/[\w.-]+@[a-zA-Z]+/);
  if (vpaMatch) vpa = vpaMatch[0];

  // RRN match: 12 digit number often preceded by Ref, UPI Ref, etc.
  const rrnMatch = safeRaw.match(/(?:ref|upi ref)[\s:]*(\d{12})/i) || safeRaw.match(/\b(\d{12})\b/);
  if (rrnMatch) rrn = rrnMatch[1] || rrnMatch[0];

  // Bank Account match: A/c XX1234 or A/C *1234
  const bankMatch = safeRaw.match(/A\/[cC]\s*(?:XX|\*)\d{4}/);
  if (bankMatch) bankAccount = bankMatch[0];

  return {
    id: uuidv4(),
    raw: safeRaw,
    description,
    amount: safeAmount,
    type,
    category,
    autoTagged,
    cashbackRow,
    expectedSavings,
    timestamp: new Date().toISOString(),
    vpa,
    rrn,
    bankAccount
  };
}

module.exports = { parseTransaction };
