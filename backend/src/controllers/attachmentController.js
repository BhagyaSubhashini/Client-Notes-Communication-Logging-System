import { pool } from "../config/db.js";

// UPLOAD FILE
export const uploadAttachment = async (req, res) => {
  try {
    const { note_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const result = await pool.query(
  `INSERT INTO attachments (note_id, file_path, file_name)
   VALUES ($1,$2,$3) RETURNING *`,
  [note_id, fileUrl, req.file.originalname]
);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error uploading file" });
  }
};

// GET ATTACHMENTS BY NOTE
export const getAttachments = async (req, res) => {
  try {
    const { note_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM attachments WHERE note_id = $1`,
      [note_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attachments" });
  }
};