-- Users and Sessions for simple authentication
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

-- Recreate tables with user_id included
DROP TABLE IF EXISTS earnings;
CREATE TABLE earnings (
  user_id TEXT PRIMARY KEY,
  amount REAL NOT NULL
);

DROP TABLE IF EXISTS monthly_expenses;
CREATE TABLE monthly_expenses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  item TEXT NOT NULL,
  price REAL NOT NULL,
  payableTo TEXT NOT NULL,
  period TEXT NOT NULL,
  dateModified TEXT NOT NULL
);

DROP TABLE IF EXISTS extra_spends;
CREATE TABLE extra_spends (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  item TEXT NOT NULL,
  price REAL NOT NULL,
  date TEXT NOT NULL
);
