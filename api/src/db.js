import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "Falta DATABASE_URL. Copiá api/.env.example como api/.env y completalo."
  );
  process.exit(1);
}

const esLocal = /localhost|127\.0\.0\.1/.test(connectionString);

// Neon y Supabase requieren SSL; en local no.
export const pool = new Pool({
  connectionString,
  ssl: esLocal ? false : { rejectUnauthorized: false },
});
