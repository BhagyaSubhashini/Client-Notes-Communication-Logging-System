import { pool } from "../config/db.js";

// CREATE CLIENT
export const createClient = async (req, res) => {
  try {

    const {
      full_name,
      phone_number,
      email,
      domain_name,
      whmcs_username,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO clients
      (
        full_name,
        phone_number,
        email,
        domain_name,
        whmcs_username
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        full_name,
        phone_number,
        email,
        domain_name,
        whmcs_username,
      ]
    );

    res.status(201).json(
      result.rows[0]
    );

  } catch (err) {

    console.error(
      "Create client error:",
      err
    );

    res.status(500).json({
      message:
        "Error creating client",
    });

  }
};

// UPDATE CLIENT
export const updateClient = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      full_name,
      phone_number,
      email,
      domain_name,
      whmcs_username,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE clients
      SET
        full_name = $1,
        phone_number = $2,
        email = $3,
        domain_name = $4,
        whmcs_username = $5
      WHERE client_id = $6
      RETURNING *
      `,
      [
        full_name,
        phone_number,
        email,
        domain_name,
        whmcs_username,
        id,
      ]
    );

    if (
      result.rows.length === 0
    ) {

      return res.status(404).json({
        message:
          "Client not found",
      });

    }

    res.json(
      result.rows[0]
    );

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Failed to update client",
    });

  }
};

// DELETE CLIENT
export const deleteClient = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const clientInfo =
      await pool.query(
        `
        SELECT full_name
        FROM clients
        WHERE client_id = $1
        `,
        [id]
      );

    if (
      clientInfo.rows.length === 0
    ) {

      return res.status(404).json({
        message:
          "Client not found",
      });

    }

    const notes =
      await pool.query(
        `
        SELECT note_id
        FROM notes
        WHERE client_id = $1
        LIMIT 1
        `,
        [id]
      );

    if (
      notes.rows.length > 0
    ) {

      return res
        .status(400)
        .json({
          message:
            "Cannot delete client because notes exist.",
        });

    }

    const result =
      await pool.query(
        `
        DELETE FROM clients
        WHERE client_id = $1
        RETURNING *
        `,
        [id]
      );

    res.json({
      message:
        "Client deleted successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Delete failed",
    });

  }

};

// GET ALL CLIENTS
export const getClients = async (
  req,
  res
) => {

  try {

    const result =
      await pool.query(
        `
        SELECT *
        FROM clients
        ORDER BY client_id DESC
        `
      );

    res.json(
      result.rows
    );

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Failed to fetch clients",
    });

  }

};

// SEARCH CLIENTS
export const searchClients = async (
  req,
  res
) => {

  try {

    const { query } =
      req.query;

    const result =
      await pool.query(
        `
        SELECT DISTINCT c.*
        FROM clients c

        LEFT JOIN notes n
        ON c.client_id = n.client_id

        WHERE
          c.full_name ILIKE $1 OR
          c.phone_number ILIKE $1 OR
          c.email ILIKE $1 OR
          c.domain_name ILIKE $1 OR
          c.whmcs_username ILIKE $1 OR
          CAST(n.note_id AS TEXT) ILIKE $1
        `,
        [`%${query}%`]
      );

    res.json(
      result.rows
    );

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Search failed",
    });

  }

};

// DASHBOARD STATS
export const getClientStats = async (
  req,
  res
) => {

  try {

    const clients =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM clients
        `
      );

    const notes =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM notes
        `
      );

    const users =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM users
        `
      );

    res.json({

      clients:
        clients.rows[0].count,

      notes:
        notes.rows[0].count,

      users:
        users.rows[0].count,

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:
        "Stats error",
    });

  }

};