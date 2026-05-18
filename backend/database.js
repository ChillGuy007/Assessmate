import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

// Accept a DATABASE_URL or individual PG_* env vars
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || process.env.PGPORT || 5432,
  user: process.env.PGUSER || process.env.PGUSER,
  password: process.env.PGPASSWORD || process.env.PGPASSWORD,
  database: process.env.PGDATABASE || process.env.PGDATABASE,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
});

function normalizeSql(text, params = []) {
  let index = 0;
  const sql = text.replace(/\?/g, () => `$${++index}`);
  return { sql, params };
}

export async function initializeDatabase() {
  // Create tables if they don't exist (Postgres dialect)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student','faculty')),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      institution TEXT,
      phone TEXT,
      avatar_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      faculty_id INTEGER NOT NULL REFERENCES users(id),
      semester TEXT,
      year INTEGER,
      max_students INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES users(id),
      course_id INTEGER NOT NULL REFERENCES courses(id),
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      grade TEXT,
      UNIQUE(student_id, course_id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES users(id),
      course_id INTEGER NOT NULL REFERENCES courses(id),
      faculty_id INTEGER REFERENCES users(id),
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      sentiment TEXT CHECK (sentiment IN ('positive','neutral','negative')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      faculty_id INTEGER REFERENCES users(id),
      course_id INTEGER REFERENCES courses(id),
      total_feedback INTEGER DEFAULT 0,
      avg_rating REAL DEFAULT 0,
      positive_sentiment INTEGER DEFAULT 0,
      negative_sentiment INTEGER DEFAULT 0,
      neutral_sentiment INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized successfully (Postgres)');
}

export function getDatabase() {
  // Provide an interface similar to the sqlite wrapper used earlier
  return {
    query: (text, params) => {
      const normalized = normalizeSql(text, params);
      return pool.query(normalized.sql, normalized.params);
    },
    get: async (text, params) => {
      const normalized = normalizeSql(text, params);
      const res = await pool.query(normalized.sql, normalized.params);
      return res.rows[0];
    },
    all: async (text, params) => {
      const normalized = normalizeSql(text, params);
      const res = await pool.query(normalized.sql, normalized.params);
      return res.rows;
    },
    run: async (text, params) => {
      const normalized = normalizeSql(text, params);
      // If INSERT without RETURNING, add RETURNING id to get lastID
      let sql = normalized.sql;
      if (/^\s*INSERT/i.test(sql) && !/RETURNING\s+/i.test(sql)) {
        sql = sql.replace(/;?\s*$/, '') + ' RETURNING id';
      }
      const res = await pool.query(sql, normalized.params);
      return { lastID: res.rows && res.rows[0] ? res.rows[0].id : undefined, changes: res.rowCount };
    },
    exec: async (text) => {
      // Split multiple statements and run sequentially
      const statements = text.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
      for (const stmt of statements) {
        await pool.query(stmt);
      }
      return true;
    },
    close: async () => true
  };
}

export default pool;
