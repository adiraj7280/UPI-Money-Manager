const db = require('./database')

function runMigrations() {
  // Check if we need to upgrade from v1 to v2 (missing vpa column)
  const columns = db.pragma('table_info(transactions)');
  const hasVpa = columns.some(col => col.name === 'vpa');

  if (!hasVpa && columns.length > 0) {
    console.log('🔄 Upgrading database schema (v1 -> v2)...');
    
    // Create new table with expanded category CHECK and new columns
    db.exec(`
      CREATE TABLE transactions_new (
        id                TEXT    PRIMARY KEY,
        raw               TEXT    NOT NULL,
        description       TEXT    NOT NULL CHECK(length(description) <= 120),
        amount            REAL    NOT NULL CHECK(amount > 0),
        type              TEXT    NOT NULL CHECK(type IN ('credit','debit')),
        category          TEXT    NOT NULL CHECK(category IN (
                            'Food & Dining','Travel','Salary','Miscellaneous',
                            'Groceries','Utilities','Shopping','Entertainment','Healthcare')),
        auto_tagged       INTEGER NOT NULL CHECK(auto_tagged IN (0,1)) DEFAULT 0,
        cashback_row      INTEGER NOT NULL CHECK(cashback_row IN (0,1)) DEFAULT 0,
        expected_savings  REAL    CHECK(expected_savings IS NULL OR expected_savings > 0),
        timestamp         TEXT    NOT NULL,
        vpa               TEXT,
        rrn               TEXT,
        bank_account      TEXT
      );

      INSERT INTO transactions_new (
        id, raw, description, amount, type, category, auto_tagged, cashback_row, expected_savings, timestamp
      )
      SELECT id, raw, description, amount, type, category, auto_tagged, cashback_row, expected_savings, timestamp
      FROM transactions;

      DROP TABLE transactions;
      ALTER TABLE transactions_new RENAME TO transactions;
    `);
  } else if (!hasVpa) {
    // Fresh install
    db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id                TEXT    PRIMARY KEY,
        raw               TEXT    NOT NULL,
        description       TEXT    NOT NULL CHECK(length(description) <= 120),
        amount            REAL    NOT NULL CHECK(amount > 0),
        type              TEXT    NOT NULL CHECK(type IN ('credit','debit')),
        category          TEXT    NOT NULL CHECK(category IN (
                            'Food & Dining','Travel','Salary','Miscellaneous',
                            'Groceries','Utilities','Shopping','Entertainment','Healthcare')),
        auto_tagged       INTEGER NOT NULL CHECK(auto_tagged IN (0,1)) DEFAULT 0,
        cashback_row      INTEGER NOT NULL CHECK(cashback_row IN (0,1)) DEFAULT 0,
        expected_savings  REAL    CHECK(expected_savings IS NULL OR expected_savings > 0),
        timestamp         TEXT    NOT NULL,
        vpa               TEXT,
        rrn               TEXT,
        bank_account      TEXT
      );
    `);
  }

  // Re-create indexes just in case they were dropped during rename
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
    CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
    CREATE INDEX IF NOT EXISTS idx_transactions_type_category ON transactions(type, category);
  `);
  
  console.log('✅ Database migrations complete')
}

module.exports = { runMigrations }
