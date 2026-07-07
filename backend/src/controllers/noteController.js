import { pool } from "../config/db.js";
import { notifyAllUsers } from "../utils/notifyAllUsers.js";
import { sendSMS } from "../utils/smsService.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {

    const {
      client_id,
      note_content,
      note_type,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO notes
      (
        client_id,
        user_id,
        note_content,
        note_type
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        client_id,
        req.user.id,
        note_content,
        note_type,
      ]
    );

    const note = result.rows[0];

    console.log("REQ.USER =", req.user);

    // GET CLIENT DETAILS
    const clientResult = await pool.query(
      `
      SELECT
        full_name,
        phone_number
      FROM clients
      WHERE client_id = $1
      `,
      [client_id]
    );

    if (clientResult.rows.length > 0) {

      const client =
        clientResult.rows[0];

      const smsMessage =
`Dear ${client.full_name},

Your inquiry has been received successfully.

Reference ID: NID#${note.note_id}

Thank you !`;

      // SEND SMS
      // Even if SMS fails,
      // note creation should continue.
      await sendSMS(
        client.phone_number,
        smsMessage
      );

    }

    // SEND DASHBOARD NOTIFICATIONS
    await notifyAllUsers(
      `User ${req.user.username} added Note NID#${note.note_id}`,
      `/notes/${note.note_id}`
    );

    res.status(201).json(note);

  } catch (err) {

    console.error(
      "Create note error:",
      err
    );

    res.status(500).json({
      message:
        "Error creating note",
    });

  }
};

// GET NOTES BY CLIENT
export const getNotesByClient = async (
  req,
  res
) => {

  try {

    const { client_id } =
      req.params;

    const result =
      await pool.query(
        `
        SELECT
          n.*,
          u.username
        FROM notes n
        JOIN users u
          ON n.user_id = u.user_id
        WHERE n.client_id = $1
        ORDER BY n.created_at DESC
        `,
        [client_id]
      );

    res.json(
      result.rows
    );

  } catch (err) {

    console.error(
      "Get notes error:",
      err
    );

    res.status(500).json({
      message:
        "Error fetching notes",
    });

  }
};

// DIRECT NOTE SEARCH
export const searchNotes = async (
  req,
  res
) => {

  try {

    const { query } =
      req.query;

    const result =
      await pool.query(
        `
        SELECT
          n.*,
          u.username,
          c.full_name

        FROM notes n

        JOIN users u
          ON n.user_id = u.user_id

        JOIN clients c
          ON n.client_id = c.client_id

        WHERE
          n.note_content ILIKE $1
          OR c.full_name ILIKE $1
          OR CAST(n.note_id AS TEXT) ILIKE $1

        ORDER BY n.created_at DESC
        `,
        [`%${query}%`]
      );

    res.json(
      result.rows
    );

  } catch (err) {

    console.error(
      "Search notes error:",
      err
    );

    res.status(500).json({
      message:
        "Search failed",
    });

  }
};

// GET LATEST NOTES WITH PAGINATION
export const getLatestNotes = async (
  req,
  res
) => {

  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const notesResult =
      await pool.query(
        `
        SELECT
          n.*,
          u.username,
          c.client_id,
          c.full_name,
          c.email

        FROM notes n

        JOIN users u
          ON n.user_id = u.user_id

        JOIN clients c
          ON n.client_id = c.client_id

        ORDER BY n.created_at DESC

        LIMIT $1
        OFFSET $2
        `,
        [
          limit,
          offset,
        ]
      );

    const countResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM notes
        `
      );

    res.json({
      notes:
        notesResult.rows,

      total:
        parseInt(
          countResult.rows[0].count
        ),

      page,
      limit,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Failed to fetch notes",
    });

  }
};

// GET SINGLE NOTE
export const getNoteById = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const result =
      await pool.query(
        `
        SELECT
          n.*,
          c.client_id,
          c.full_name,
          c.email

        FROM notes n

        JOIN clients c
          ON n.client_id = c.client_id

        WHERE n.note_id = $1
        `,
        [id]
      );

    if (
      result.rows.length === 0
    ) {

      return res
        .status(404)
        .json({
          message:
            "Note not found",
        });

    }

    res.json(
      result.rows[0]
    );

  } catch (err) {

    console.error(
      "Get note error:",
      err
    );

    res.status(500).json({
      message:
        "Error fetching note",
    });

  }
};