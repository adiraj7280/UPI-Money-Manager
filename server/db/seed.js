const db = require('./database');
const { v4: uuidv4 } = require('uuid');

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function runSeed() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM transactions').get();
  
  if (countRow.count > 0) {
    console.log(`⏭️  Seed skipped — ${countRow.count} transactions already exist`);
    return;
  }

  const seedData = [
    {
      id: uuidv4(),
      raw: 'Paid Rs. 450 to Zomato',
      description: 'Zomato',
      amount: 450,
      type: 'debit',
      category: 'Food & Dining',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(0)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 850 to CRED',
      description: 'CRED',
      amount: 850,
      type: 'debit',
      category: 'Miscellaneous',
      auto_tagged: 1,
      cashback_row: 1,
      expected_savings: Math.round(850 * 0.02),
      timestamp: daysAgo(1)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 350 to Uber',
      description: 'Uber',
      amount: 350,
      type: 'debit',
      category: 'Travel',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(1)
    },
    {
      id: uuidv4(),
      raw: 'Received Rs. 45000 from Infosys Private Limited',
      description: 'Infosys Private Limited',
      amount: 45000,
      type: 'credit',
      category: 'Salary',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(2)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 199 to Netflix',
      description: 'Netflix',
      amount: 199,
      type: 'debit',
      category: 'Miscellaneous',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(3)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 1200 to IRCTC',
      description: 'IRCTC',
      amount: 1200,
      type: 'debit',
      category: 'Travel',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(4)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 320 to Swiggy',
      description: 'Swiggy',
      amount: 320,
      type: 'debit',
      category: 'Food & Dining',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(4)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 500 to PhonePe Rewards',
      description: 'PhonePe Rewards',
      amount: 500,
      type: 'debit',
      category: 'Miscellaneous',
      auto_tagged: 1,
      cashback_row: 1,
      expected_savings: Math.round(500 * 0.02),
      timestamp: daysAgo(5)
    },
    {
      id: uuidv4(),
      raw: 'Received Rs. 15000 from Freelance',
      description: 'Freelance',
      amount: 15000,
      type: 'credit',
      category: 'Miscellaneous',
      auto_tagged: 0,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(6)
    },
    {
      id: uuidv4(),
      raw: 'Paid Rs. 350 to Starbucks',
      description: 'Starbucks',
      amount: 350,
      type: 'debit',
      category: 'Food & Dining',
      auto_tagged: 1,
      cashback_row: 0,
      expected_savings: null,
      timestamp: daysAgo(7)
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO transactions (id, raw, description, amount, type, category, auto_tagged, cashback_row, expected_savings, timestamp)
    VALUES (@id, @raw, @description, @amount, @type, @category, @auto_tagged, @cashback_row, @expected_savings, @timestamp)
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insertStmt.run(item);
    }
  });

  insertMany(seedData);
  console.log('✅ Seeded 10 transactions');
}

module.exports = { runSeed };
