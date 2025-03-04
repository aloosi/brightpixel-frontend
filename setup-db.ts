import Database from 'better-sqlite3';

// Create database and connect
const db = new Database('project.db');

// Create all tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tel_no TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city_code TEXT NOT NULL,
    login_id TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    balance REAL DEFAULT 0.0
  );

  CREATE TABLE IF NOT EXISTS trucks (
    truck_id INTEGER PRIMARY KEY AUTOINCREMENT,
    truck_code TEXT NOT NULL UNIQUE,
    availability_code TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS trips (
    trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_code TEXT NOT NULL,
    destination_code TEXT NOT NULL,
    distance REAL NOT NULL,
    truck_id INTEGER REFERENCES trucks(truck_id),
    price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shopping (
    receipt_id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_code TEXT NOT NULL,
    total_price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    price REAL NOT NULL,
    made_in TEXT NOT NULL,
    department_code TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_issued TEXT NOT NULL,
    date_received TEXT,
    total_price REAL NOT NULL,
    payment_code TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    trip_id INTEGER REFERENCES trips(trip_id),
    receipt_id INTEGER REFERENCES shopping(receipt_id)
  );
`);

console.log('Database created with all tables!');
process.exit(0);