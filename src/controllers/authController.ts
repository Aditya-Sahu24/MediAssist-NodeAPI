import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../config/db";

// Load secret key from environment
const JWT_SECRET: string = process.env.JWT_SECRET || "your_jwt_secret";

// Signup Controller
export const signup = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { username, email, password, role = "user" } = req.body;

  try {
    const pool = await getDbConnection();

    const checkUser = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (checkUser.recordset.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("Username", username)
      .input("Email", email)
      .input("PasswordHash", hashedPassword)
      .input("Role", role)
      .query(`
        INSERT INTO Users (Username, Email, PasswordHash, Role)
        VALUES (@Username, @Email, @PasswordHash, @Role)
      `);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// Login Controller
export const login = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { email, password } = req.body;

  try {
    const pool = await getDbConnection();

    const result = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.UserID,
        username: user.Username,
        email: user.Email,
        role: user.Role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
