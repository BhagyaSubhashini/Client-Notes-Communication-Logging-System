import { pool } from "../config/db.js";

// CREATE NOTIFICATION
export const createNotification = async (
  user_id,
  message,
  link = "/"
) => {
  try {
    await pool.query(
      `
      INSERT INTO notifications
      (
        user_id,
        message,
        link
      )
      VALUES ($1,$2,$3)
      `,
      [
        user_id,
        message,
        link,
      ]
    );
  } catch (err) {
    console.error(
      "Notification error:",
      err
    );
  }
};

// GET USER NOTIFICATIONS
export const getNotifications =
  async (req, res) => {

    try {

      const result =
        await pool.query(
          `
          SELECT *
          FROM notifications
          WHERE user_id = $1
          ORDER BY created_at DESC
          `,
          [req.user.id]
        );

      res.json(result.rows);

    } catch (err) {

      res.status(500).json({
        message:
          "Error fetching notifications",
      });

    }
  };

// MARK AS READ
export const markAsRead =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await pool.query(
        `
        UPDATE notifications
        SET is_read = true
        WHERE notification_id = $1
        `,
        [id]
      );

      res.json({
        message:
          "Notification marked as read",
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Error updating notification",
      });

    }
  };