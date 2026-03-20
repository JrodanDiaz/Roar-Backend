import { hashPassword } from "../utils/passwordUtils";
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const setupDB = async () => {
  await testDatabaseConnection();
  await createUsersTable();
  await seedUsers();
};

export const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL successfully");
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection error", err);
  }
};

const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table is ready.");
  } catch (err) {
    console.error("Error creating users table:", err);
  } finally {
    client.release();
  }
};

const seedUsers = async () => {
  const client = await pool.connect();
  try {
    // const hashedPassword = await bcrypt.hash("password123", 10);
    const hashedPassword = hashPassword("roarpassword");
    await client.query(
      `INSERT INTO users (username, email, password)
       VALUES
       ('jordan', 'jordan@fiu.edu', $1),
       ('lebon', 'lebon@fiu.edu', $1)
       ON CONFLICT (username) DO NOTHING;`,
      [hashedPassword],
    );
    console.log("Seeded users successfully.");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    client.release();
  }
};
