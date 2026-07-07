import { pool } from "../config/db.js";
import { createNotification } from "../controllers/notificationController.js";

export const notifyAllUsers = async (
  message,
  link
) => {

  const users =
    await pool.query(
      `
      SELECT user_id
      FROM users
      WHERE is_active = true
      `
    );

  for (const user of users.rows) {

    await createNotification(
      user.user_id,
      message,
      link
    );

  }

};