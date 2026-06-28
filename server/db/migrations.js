const db = require('./database')

function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id                TEXT    PRIMARY KEY,
      raw               TEXT    NOT NULL,
      description       TEXT    NOT NULL CHECK(length(description) <= 120),
      amount            REAL    NOT NULL CHECK(amount > 0),
      type              TEXT    NOT NULL CHECK(type IN ('credit','debit')),
      category          TEXT    NOT NULL CHECK(category IN (
                          'Food & Dining','Travel',
                          'Salary','Miscellaneous')),
      auto_tagged       INTEGER NOT NULL CHECK(auto_tagged IN (0,1)) DEFAULT 0,
      cashback_row      INTEGER NOT NULL CHECK(cashback_row IN (0,1)) DEFAULT 0,
      expected_savings  REAL    CHECK(
                          expected_savings IS NULL OR expected_savings > 0),
      timestamp         TEXT    NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_timestamp
      ON transactions(timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_transactions_type
      ON transactions(type);
    CREATE INDEX IF NOT EXISTS idx_transactions_category
      ON transactions(category);
    CREATE INDEX IF NOT EXISTS idx_transactions_type_category
      ON transactions(type, category);
  `)
  console.log('✅ Database migrations complete')
}

module.exports = { runMigrations }
