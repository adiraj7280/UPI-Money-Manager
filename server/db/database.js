const Database = require('better-sqlite3')
const path     = require('path')

const DB_PATH = path.join(__dirname, 'upi_manager.db')

const db = new Database(DB_PATH, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : null
})

// Performance pragmas — applied once on connection open
db.pragma('journal_mode = WAL')    // better write concurrency
db.pragma('foreign_keys = ON')     // enforce FK if added later
db.pragma('synchronous = NORMAL')  // safe + faster than FULL

module.exports = db
