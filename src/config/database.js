// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/streaming.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT UNIQUE,
    country TEXT,
    subscription_type TEXT,
    subscription_expiry TEXT
);`);
db.run(`CREATE TABLE IF NOT EXISTS otps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  otp TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);`);
//db.run(`insert into otps (phone, otp) values ('+919999000001', '123456') on conflict do nothing;`);



  console.log('Database schema initialized');
});



module.exports = db;
