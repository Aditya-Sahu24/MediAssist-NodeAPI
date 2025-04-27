import sql, { ConnectionPool } from "mssql";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

const config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const testConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to the database!");
    pool.close();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

let pool: ConnectionPool | null = null;

export const getDbConnection = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};
