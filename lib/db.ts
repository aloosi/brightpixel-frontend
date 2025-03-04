// lib/db.ts
import Database from 'better-sqlite3';

const db = new Database('project.db');
db.pragma('foreign_keys = ON');

// Add explicit export statement
export default db;