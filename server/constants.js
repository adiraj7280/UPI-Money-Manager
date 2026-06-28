// ─── constants.js ────────────────────────────────────────────────────────────
// Single source of truth for all keyword maps, categories, and the live-stream
// alert pool. No other server file should hardcode these values.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Food & Dining", "Travel", "Salary", "Miscellaneous"];

// ─── Keyword → Category Maps ────────────────────────────────────────────────

const FOOD_KEYWORDS = [
  "zomato", "swiggy", "blinkit", "dunzo", "eatsure",
  "dominos", "mcdonald", "starbucks", "pizza hut",
];

const TRAVEL_KEYWORDS = [
  "uber", "ola", "rapido", "redbus", "irctc",
  "makemytrip", "indigo", "air india", "goibibo",
];

const SALARY_KEYWORDS = [
  "salary", "payroll", "neft from", "company ltd",
  "private limited", "employer", "stipend",
];

const KEYWORD_MAP = [
  { keywords: FOOD_KEYWORDS, category: "Food & Dining" },
  { keywords: TRAVEL_KEYWORDS, category: "Travel" },
  { keywords: SALARY_KEYWORDS, category: "Salary" },
];

// ─── Cashback Detection ─────────────────────────────────────────────────────

const CASHBACK_KEYWORDS = [
  "cashback", "cred", "phonepe rewards", "paytm cashback",
  "amazon pay rewards", "gpay cashback", "reward partner",
];

// ─── Direction Indicators ───────────────────────────────────────────────────

const DEBIT_INDICATORS = [
  "debited", "paid", "sent", "transferred to", "deducted",
];

const CREDIT_INDICATORS = [
  "credited", "received", "from", "deposited",
];

// ─── Live Stream Alert Pool (20 varied raw strings) ─────────────────────────
// Mix: food debits, travel debits, salary credits, misc debits,
// and at least 4 cashback-eligible strings.

const ALERT_POOL = [
  // ── Food & Dining debits ──────────────────────────────────────────────────
  "Rs. {amount} debited from your A/c for Zomato order #ZMT8321.",
  "Rs. {amount} paid to Swiggy for late night delivery via UPI.",
  "Rs. {amount} sent to Dominos Pizza — order confirmed.",
  "Rs. {amount} debited for Starbucks coffee. Enjoy your brew!",

  // ── Travel debits ─────────────────────────────────────────────────────────
  "Rs. {amount} debited for Uber ride from HSR Layout to Whitefield.",
  "Rs. {amount} paid to Ola for auto booking #OLA29381.",
  "Rs. {amount} deducted for IRCTC train ticket PNR 8827361940.",
  "Rs. {amount} paid to Rapido bike taxi — ride completed.",

  // ── Salary / credits ──────────────────────────────────────────────────────
  "Rs. {amount} credited to your A/c. NEFT from TCS Private Limited — Salary.",
  "Rs. {amount} credited to your A/c. Received from employer — Stipend for June.",
  "Rs. {amount} credited. Received from Priya Patel via UPI.",

  // ── Miscellaneous debits ──────────────────────────────────────────────────
  "Rs. {amount} deducted from A/c for Flipkart order #FK99201.",
  "Rs. {amount} paid to BigBasket for groceries via UPI.",
  "Rs. {amount} sent to Meesho seller for order #MSH4421.",
  "Rs. {amount} debited for Myntra fashion purchase.",
  "Rs. {amount} transferred to Ajay Kumar via UPI.",

  // ── Cashback-eligible debits (≥4) ─────────────────────────────────────────
  "Rs. {amount} debited for Swiggy Instamart order. PhonePe Rewards earned!",
  "Rs. {amount} paid to Zomato. Cashback of Rs. 10 will be credited to wallet.",
  "Rs. {amount} debited for Amazon Pay order. Amazon Pay Rewards applied.",
  "Rs. {amount} paid for Uber trip via CRED. Reward points earned!",
];

// ─── Live Stream Config ─────────────────────────────────────────────────────

const STREAM_INTERVAL_MS = 4500;

module.exports = {
  CATEGORIES,
  FOOD_KEYWORDS,
  TRAVEL_KEYWORDS,
  SALARY_KEYWORDS,
  KEYWORD_MAP,
  CASHBACK_KEYWORDS,
  DEBIT_INDICATORS,
  CREDIT_INDICATORS,
  ALERT_POOL,
  STREAM_INTERVAL_MS,
};
