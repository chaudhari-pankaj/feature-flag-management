import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PWD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});