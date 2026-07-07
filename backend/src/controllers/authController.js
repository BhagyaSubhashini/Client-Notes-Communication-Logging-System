import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Request body:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    console.log("User from DB:", user);

    if (!user.password_hash) {
      return res.status(500).json({
        message: "Password missing in DB",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile_image: user.profile_image,
        phone_number: user.phone_number,
      },
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });

  }
};

// REGISTER USER
export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      username,
      email,
      password,
      role,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const result =
      await pool.query(
        `
        INSERT INTO users
        (
          username,
          email,
          password_hash,
          role,
          phone_number
        )
        VALUES
        ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
          username,
          email,
          hashedPassword,
          role || "normal_user",
          null,
        ]
      );

    res.status(201).json({
      message:
        "User registered",
      user:
        result.rows[0],
    });

  } catch (error) {

    console.error(error);

    if (
      error.code === "23505"
    ) {

      return res.status(400).json({
        message:
          "Email already exists",
      });

    }

    res.status(500).json({
      message:
        "Error registering user",
    });

  }
};

// CREATE USER (SUPER USER ONLY)
export const createUser = async (
  req,
  res
) => {

  try {

    const {
      username,
      email,
      password,
      role,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "All fields are required",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const result =
      await pool.query(
        `
        INSERT INTO users
        (
          username,
          email,
          password_hash,
          role,
          phone_number
        )
        VALUES
        ($1,$2,$3,$4,$5)
        RETURNING
        user_id,
        username,
        email,
        role,
        phone_number
        `,
        [
          username,
          email,
          hashedPassword,
          role || "normal_user",
          null,
        ]
      );

    res.status(201).json({
      message:
        "User created successfully",
      user:
        result.rows[0],
    });

  } catch (error) {

    console.error(
      "Create user error:",
      error
    );

    if (
      error.code === "23505"
    ) {

      return res.status(400).json({
        message:
          "Email already exists",
      });

    }

    res.status(500).json({
      message:
        "Error creating user",
    });

  }
};