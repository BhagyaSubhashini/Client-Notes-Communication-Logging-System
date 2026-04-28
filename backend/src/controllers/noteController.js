import { pool } from "../config/db.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { client_id, note_content, note_type } = req.body;

    const result = await pool.query(
      `INSERT INTO notes (client_id, user_id, note_content, note_type)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [client_id, req.user.id, note_content, note_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create note error:", err);
    res.status(500).json({ message: "Error creating note" });
  }
};

// GET NOTES BY CLIENT
export const getNotesByClient = async (req, res) => {
  try {
    const { client_id } = req.params;

    const result = await pool.query(
      `SELECT n.*, u.username 
       FROM notes n
       JOIN users u ON n.user_id = u.user_id
       WHERE n.client_id = $1
       ORDER BY n.created_at DESC`,
      [client_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
};