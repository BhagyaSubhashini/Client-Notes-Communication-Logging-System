import { pool } from "../config/db.js";

// CREATE CLIENT
export const createClient = async (req, res) => {
  try {
    const { full_name, phone_number, email, domain_name, whmcs_username } = req.body;

    const result = await pool.query(
      `INSERT INTO clients (full_name, phone_number, email, domain_name, whmcs_username)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [full_name, phone_number, email, domain_name, whmcs_username]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create client error:", err); // 👈 IMPORTANT
    res.status(500).json({ message: "Error creating client" });
  }
};

// GET ALL CLIENTS
export const getClients = async (req, res) => {
  const result = await pool.query("SELECT * FROM clients ORDER BY client_id DESC");
  res.json(result.rows);
};

// SEARCH CLIENTS
export const searchClients = async (req, res) => {
  const { query } = req.query;

  const result = await pool.query(
    `SELECT * FROM clients 
     WHERE phone_number ILIKE $1 
     OR email ILIKE $1 
     OR domain_name ILIKE $1`,
    [`%${query}%`]
  );

  res.json(result.rows);
};