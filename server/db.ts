import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Connect to SQLite database (this represents your hosting database)
// To switch to MySQL/PostgreSQL, you would use 'mysql2' or 'pg' packages here instead.
const db = new Database(path.join(dataDir, 'hosting.db'));

db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS system_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    state TEXT NOT NULL DEFAULT 'NORMAL'
  );

  CREATE TABLE IF NOT EXISTS target_info (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    domain TEXT,
    ip TEXT,
    location TEXT,
    status TEXT,
    isp TEXT,
    latency INTEGER,
    ssl TEXT,
    securityScore INTEGER
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blocked_ips (
    ip TEXT PRIMARY KEY,
    reason TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    duration TEXT NOT NULL
  );
`);

// Insert default data if empty
const stateCount = db.prepare('SELECT COUNT(*) as count FROM system_state').get() as { count: number };
if (stateCount.count === 0) {
  db.prepare("INSERT INTO system_state (id, state) VALUES (1, 'NORMAL')").run();
}

const targetCount = db.prepare('SELECT COUNT(*) as count FROM target_info').get() as { count: number };
if (targetCount.count === 0) {
  db.prepare("INSERT INTO target_info (id, status) VALUES (1, 'Idle')").run();
}

export default db;
