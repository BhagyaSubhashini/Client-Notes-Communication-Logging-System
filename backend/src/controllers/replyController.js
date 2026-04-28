import { pool } from "../config/db.js";

// ADD REPLY
export const addReply = async (req, res) => {
  try {
    const { note_id, reply_content } = req.body;

    const result = await pool.query(
      `INSERT INTO replies (note_id, user_id, reply_content)
       VALUES ($1,$2,$3) RETURNING *`,
      [note_id, req.user.id, reply_content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add reply error:", err);
    res.status(500).json({ message: "Error adding reply" });
  }
};

// GET REPLIES
export const getReplies = async (req, res) => {
  try {
    const { note_id } = req.params;

    const result = await pool.query(
      `SELECT r.*, u.username
       FROM replies r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.note_id = $1
       ORDER BY r.created_at ASC`,
      [note_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get replies error:", err);
    res.status(500).json({ message: "Error fetching replies" });
  }
};