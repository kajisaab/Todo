const { createPool } = require('mysql');

const pool = createPool({
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.DATABASE_CONNECTION_LIMITS,
});

module.exports = pool;
