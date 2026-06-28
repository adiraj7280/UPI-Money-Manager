const db = require('./db/database');
const { CATEGORIES } = require('./constants');

// Serialization contract (CRITICAL)
function serialize(jsObject) {
  return {
    ...jsObject,
    auto_tagged: jsObject.autoTagged ? 1 : 0,
    cashback_row: jsObject.cashbackRow ? 1 : 0
  };
}

function deserialize(dbRow) {
  return {
    id: dbRow.id,
    raw: dbRow.raw,
    description: dbRow.description,
    amount: dbRow.amount,
    type: dbRow.type,
    category: dbRow.category,
    autoTagged: dbRow.auto_tagged === 1,
    cashbackRow: dbRow.cashback_row === 1,
    expectedSavings: dbRow.expected_savings,
    timestamp: dbRow.timestamp,
    vpa: dbRow.vpa || null,
    rrn: dbRow.rrn || null,
    bankAccount: dbRow.bank_account || null
  };
}

function getAll() {
  const stmt = db.prepare('SELECT * FROM transactions ORDER BY timestamp DESC');
  return stmt.all().map(deserialize);
}

function getById(id) {
  const stmt = db.prepare('SELECT * FROM transactions WHERE id = ?');
  const row = stmt.get(id);
  return row ? deserialize(row) : null;
}

function push(transaction) {
  const dbRecord = serialize(transaction);
  const stmt = db.prepare(`
    INSERT INTO transactions (id, raw, description, amount, type, category, auto_tagged, cashback_row, expected_savings, timestamp, vpa, rrn, bank_account)
    VALUES (@id, @raw, @description, @amount, @type, @category, @auto_tagged, @cashback_row, @expected_savings, @timestamp, @vpa, @rrn, @bank_account)
  `);
  stmt.run({
    ...dbRecord,
    expected_savings: dbRecord.expectedSavings,
    vpa: dbRecord.vpa || null,
    rrn: dbRecord.rrn || null,
    bank_account: dbRecord.bankAccount || null
  });
  return transaction;
}

function updateCategory(id, category) {
  if (!CATEGORIES.includes(category)) {
    throw new Error('Invalid category value');
  }

  const stmt = db.prepare(`
    UPDATE transactions 
    SET category = ?, auto_tagged = 0 
    WHERE id = ?
  `);
  
  const result = stmt.run(category, id);
  if (result.changes === 0) {
    throw new Error('Transaction not found');
  }

  return getById(id);
}

module.exports = {
  getAll,
  getById,
  push,
  updateCategory
};
