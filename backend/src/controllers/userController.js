import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

// GET ALL USERS
export const getUsers = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        user_id,
        username,
        email,
        role,
        phone_number,
        profile_image,
        is_active,
        created_at
      FROM users
      ORDER BY created_at DESC
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching users",
    });

  }
};

// GET MY PROFILE
export const getMyProfile = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        user_id,
        username,
        email,
        role,
        phone_number,
        profile_image,
        is_active,
        created_at
      FROM users
      WHERE user_id = $1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Profile fetch failed",
    });

  }
};

// CHANGE OWN PASSWORD
export const changePassword =
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE user_id = $1
          `,
          [req.user.id]
        );

      if (
        user.rows.length === 0
      ) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const valid =
        await bcrypt.compare(
          currentPassword,
          user.rows[0]
            .password_hash
        );

      if (!valid) {
        return res.status(400).json({
          message:
            "Current password incorrect",
        });
      }

      const hashed =
        await bcrypt.hash(
          newPassword,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET password_hash = $1
        WHERE user_id = $2
        `,
        [
          hashed,
          req.user.id,
        ]
      );

      res.json({
        message:
          "Password updated successfully",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Password update failed",
      });
    }
  };

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("BEGIN");

    const userInfo = await pool.query(
      `
      SELECT username
      FROM users
      WHERE user_id = $1
      `,
      [id]
    );

    if (userInfo.rows.length === 0) {
      await pool.query("ROLLBACK");

      return res.status(404).json({
        message: "User not found",
      });
    }

    await pool.query(
      `
      DELETE FROM notifications
      WHERE user_id = $1
      `,
      [id]
    );

    await pool.query(
      `
      DELETE FROM replies
      WHERE user_id = $1
      `,
      [id]
    );

    await pool.query(
      `
      DELETE FROM notes
      WHERE user_id = $1
      `,
      [id]
    );

    await pool.query(
      `
      DELETE FROM users
      WHERE user_id = $1
      `,
      [id]
    );

    await pool.query("COMMIT");

    res.json({
      message: "User deleted successfully",
    });

  } catch (err) {

    await pool.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      message: "Error deleting user",
    });
  }
};

// RESET PASSWORD (SUPER USER)
export const resetPassword =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { password } =
        req.body;

      const userInfo =
        await pool.query(
          `
          SELECT username
          FROM users
          WHERE user_id = $1
          `,
          [id]
        );

      if (
        userInfo.rows.length === 0
      ) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      const hashed =
        await bcrypt.hash(
          password,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET password_hash = $1
        WHERE user_id = $2
        `,
        [
          hashed,
          id,
        ]
      );

      res.json({
        message:
          "Password updated",
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Error resetting password",
      });

    }
  };

// UPLOAD PROFILE IMAGE
  export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imagePath = req.file.path.replace(/\\/g, "/");

    const result = await pool.query(
      `
      UPDATE users
      SET profile_image = $1
      WHERE user_id = $2
      RETURNING
        user_id,
        username,
        email,
        role,
        phone_number,
        profile_image
      `,
      [imagePath, req.user.id]
    );

    res.json({
      message: "Profile image uploaded",
      user: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Image upload failed",
    });

  }
};

// UPDATE MY PROFILE
export const updateMyProfile = async (req, res) => {

  try {

    const {
      username,
      email,
      phone_number,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET
        username = $1,
        email = $2,
        phone_number = $3
      WHERE user_id = $4
      RETURNING
        user_id,
        username,
        email,
        role,
        phone_number,
        profile_image,
        is_active,
        created_at
      `,
      [
        username,
        email,
        phone_number,
        req.user.id,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Profile update failed",
    });

  }
};

// UPDATE USER BY ADMIN
export const updateUserByAdmin = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      username,
      email,
      phone_number,
      role,
      is_active,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET
        username = $1,
        email = $2,
        phone_number = $3,
        role = $4,
        is_active = $5
      WHERE user_id = $6
      RETURNING
        user_id,
        username,
        email,
        role,
        phone_number,
        profile_image,
        is_active
      `,
      [
        username,
        email,
        phone_number,
        role,
        is_active,
        id,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "User update failed",
    });

  }
};
