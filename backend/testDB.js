import { pool } from "./config/db.js";

const testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB Connected:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB Error:", err);
  } finally {
    pool.end();
  }
};

testDB();