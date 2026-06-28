// ─── constants.js ────────────────────────────────────────────────────────────
// Single source of truth for all keyword maps, categories, and the live-stream
// alert pool. No other server file should hardcode these values.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Food & Dining", 
  "Travel", 
  "Salary", 
  "Miscellaneous",
  "Groceries",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Healthcare"
];

// ─── Keyword → Category Maps ────────────────────────────────────────────────

const FOOD_KEYWORDS = ["zomato", "swiggy", "blinkit", "eatsure", "dominos", "starbucks", "pizza hut"];
const TRAVEL_KEYWORDS = ["uber", "ola", "rapido", "redbus", "irctc", "makemytrip", "indigo", "air india"];
const SALARY_KEYWORDS = ["salary", "payroll", "stipend", "employer"];
const GROCERIES_KEYWORDS = ["bigbasket", "zepto", "blinkit", "dmart", "reliance smart", "nature's basket"];
const UTILITIES_KEYWORDS = ["bescom", "jio", "airtel", "vi", "bsnl", "electricity", "water bill", "broadband", "recharge"];
const SHOPPING_KEYWORDS = ["amazon", "flipkart", "meesho", "myntra", "ajio", "nykaa"];
const ENTERTAINMENT_KEYWORDS = ["bookmyshow", "netflix", "prime video", "hotstar", "spotify", "pvr", "inox"];
const HEALTHCARE_KEYWORDS = ["apollo", "practo", "netmeds", "pharmeasy", "hospital", "clinic"];

const KEYWORD_MAP = [
  { keywords: FOOD_KEYWORDS, category: "Food & Dining" },
  { keywords: TRAVEL_KEYWORDS, category: "Travel" },
  { keywords: SALARY_KEYWORDS, category: "Salary" },
  { keywords: GROCERIES_KEYWORDS, category: "Groceries" },
  { keywords: UTILITIES_KEYWORDS, category: "Utilities" },
  { keywords: SHOPPING_KEYWORDS, category: "Shopping" },
  { keywords: ENTERTAINMENT_KEYWORDS, category: "Entertainment" },
  { keywords: HEALTHCARE_KEYWORDS, category: "Healthcare" }
];

// ─── Cashback Detection ─────────────────────────────────────────────────────

const CASHBACK_KEYWORDS = [
  "cashback", "cred", "phonepe rewards", "paytm cashback",
  "amazon pay rewards", "gpay cashback", "reward partner",
];

// ─── Direction Indicators ───────────────────────────────────────────────────

const DEBIT_INDICATORS = [
  "debited", "paid", "sent", "transferred to", "deducted", "spent on"
];

const CREDIT_INDICATORS = [
  "credited", "received", "from", "deposited", "added to"
];

// ─── Live Stream Alert Pool (Realistic SMS formats) ─────────────────────────
// Rich strings containing VPA, RRN, and Bank account patterns.

const ALERT_POOL = [
  // Food
  "Sent Rs. {amount} from HDFC Bank A/c XX9921 to Zomato UPI ID zomato@hdfcbank on 28-06-26. Ref: 317928371928.",
  "Rs. {amount} paid to Swiggy via SBI A/c XX8211. VPA swiggy@icici. UPI Ref: 102938475612.",
  // Groceries
  "Rs. {amount} spent on BigBasket via ICICI Bank A/c XX9213. VPA bigbasket@axisbank. Ref: 981293812938.",
  "Dear Customer, Rs. {amount} debited from A/C *3910 on 20-04-26 to Zepto vpa zepto@ybl. UPI Ref: 319203912039.",
  // Utilities
  "Paid Rs. {amount} to BESCOM UPI ID bescom@sbi via HDFC Bank A/c XX9921. Ref: 489201938219.",
  "Rs. {amount} deducted for Jio Prepaid Recharge. VPA jio@kotak. Ref: 582910384721.",
  // Shopping
  "Sent Rs. {amount} to Amazon Pay UPI ID amazonpay@ybl via SBI A/c XX8211. Ref: 489201938219. Amazon Pay Rewards applied.",
  "Rs. {amount} paid to Flipkart vpa flipkart@axis. UPI Ref: 938471628390. Cashback of Rs. 10 will be credited to wallet.",
  // Travel
  "Rs. {amount} debited for Uber ride. VPA uber@hdfcbank. Ref: 182736450912. Reward points earned!",
  "Paid Rs. {amount} to Ola via HDFC Bank A/c XX9921. VPA ola@icici. Ref: 738491028374.",
  // Entertainment
  "Sent Rs. {amount} to BookMyShow UPI ID bms@ybl. Ref: 849302194837.",
  "Rs. {amount} debited for Netflix Subscription via SBI A/c XX8211. VPA netflix@icici. Ref: 293847561029.",
  // Healthcare
  "Paid Rs. {amount} to Apollo Pharmacy via ICICI Bank A/c XX9213. VPA apollo@sbi. Ref: 384756192038.",
  // Salary / Credits
  "Rs. {amount} credited to your A/c XX4021 on 01-07-26 by Employer Salary Ref 239019283941.",
  "Received Rs. {amount} from friend@okhdfcbank in HDFC Bank A/c XX9921. Ref: 102938471029.",
  // Misc
  "Rs. {amount} sent to John Doe UPI ID john@ybl via SBI A/c XX8211. Ref: 593847162839."
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
